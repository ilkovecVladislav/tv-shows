import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { after, test } from 'node:test';
import type { ShowSearchResult } from './types.ts';

/**
 * API проверяется без выхода в сеть: вместо TVmaze поднят локальный сервер,
 * который считает запросы и отвечает фикстурой. Его адрес приложение берёт
 * из TVMAZE_BASE_URL, поэтому импортируем приложение уже после запуска.
 */

const upstreamQueries: string[] = [];
const failing = new Set<string>();

const upstream = createServer((request, response) => {
  const query = new URL(request.url ?? '/', 'http://tvmaze.test').searchParams.get('q') ?? '';
  upstreamQueries.push(query);
  if (!failing.has(query)) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(makeSearchResponse()));
    return;
  }
  response.writeHead(500).end();
}).listen(0, '127.0.0.1');

const appPromise = once(upstream, 'listening').then(async () => {
  const address = upstream.address();
  if (address === null || typeof address === 'string') throw new Error('Сервер не получил порт');
  process.env.TVMAZE_BASE_URL = `http://127.0.0.1:${address.port}`;
  return (await import('./app.ts')).default;
});

after(() => {
  upstream.close();
  upstream.closeAllConnections();
});

test('первая страница: три сериала, метаданные и нормализация данных TVmaze', async () => {
  const { status, body } = await getShows('/api/shows?q=alpha');

  assert.equal(status, 200);
  assert.equal(ids(body).join(), '1,2,3');
  assert.equal(body.totalFound, 7); // элемент без id отброшен
  assert.equal(body.shownCount, 7);
  assert.equal(body.totalPages, 3);
  assert.equal(body.genre, null);
  assert.deepEqual(body.genres, ['Drama', 'Comedy']);
  assert.deepEqual(body.shows[0], {
    id: 1, name: 'Show 1', genres: ['Drama', 'Comedy'], year: '2010', rating: 1,
    image: 'https://example.test/1.jpg', summary: 'Summary 1',
  });
});

test('пагинация: страницы режутся по три, выход за границы прижимается к последней', async () => {
  assert.equal(ids((await getShows('/api/shows?q=alpha&page=2')).body).join(), '4,5,6');

  const last = await getShows('/api/shows?q=alpha&page=99');
  assert.equal(last.body.page, 3);
  assert.equal(ids(last.body).join(), '7');
});

test('фильтр по жанру: сужает выдачу и пересчитывает страницы', async () => {
  const drama = await getShows('/api/shows?q=alpha&genre=Drama');
  assert.equal(drama.body.genre, 'Drama');
  assert.equal(drama.body.shownCount, 4);
  assert.equal(drama.body.totalPages, 2);
  assert.equal(ids(drama.body).join(), '1,3,5');
  assert.equal(ids((await getShows('/api/shows?q=alpha&genre=Drama&page=2')).body).join(), '7');

  // жанра нет в выдаче — фильтр сбрасывается
  const unknown = await getShows('/api/shows?q=alpha&genre=Western');
  assert.equal(unknown.body.genre, null);
  assert.equal(ids(unknown.body).join(), '1,2,3');
});

test('валидация: пустой запрос и неверная страница дают 400', async () => {
  for (const path of ['/api/shows', '/api/shows?q=%20%20']) {
    assert.equal(await getStatus(path), 400, path);
  }
  for (const page of ['0', '-1', 'abc', '1.5']) {
    assert.equal(await getStatus(`/api/shows?q=alpha&page=${page}`), 400, page);
  }
});

test('кеш: за 5 минут повторный запрос не ходит в TVmaze, после 5 минут — обновляется', async (t) => {
  t.mock.timers.enable({ apis: ['Date'] });
  const hits = () => upstreamQueries.filter((query) => query === 'cacheprobe').length;

  assert.equal((await getShows('/api/shows?q=CacheProbe')).status, 200);
  assert.equal(hits(), 1);

  // другой регистр, пробелы по краям и другая страница — тот же ключ кеша
  assert.equal((await getShows('/api/shows?q=%20CACHEPROBE%20&page=3')).status, 200);
  assert.equal(hits(), 1);

  t.mock.timers.setTime(Date.now() + 5 * 60_000);
  assert.equal((await getShows('/api/shows?q=cacheprobe')).status, 200);
  assert.equal(hits(), 2);
});

test('ошибка TVmaze не кешируется: следующий запрос снова доходит до него', async (t) => {
  t.mock.method(console, 'error', () => {}); // ожидаемая ошибка не должна шуметь в выводе тестов
  failing.add('broken');

  assert.equal(await getStatus('/api/shows?q=broken'), 500);

  failing.delete('broken');
  const recovered = await getShows('/api/shows?q=broken');
  assert.equal(recovered.status, 200);
  assert.equal(recovered.body.totalFound, 7);
});

async function getShows(path: string) {
  const response = await (await appPromise).request(path);
  const raw: unknown = await response.json();
  if (!isResult(raw)) throw new Error(`Неожиданный ответ: ${JSON.stringify(raw)}`);
  return { status: response.status, body: raw };
}

/** Только статус: у ответов с ошибкой нет поля shows, а 500 — вообще не JSON. */
async function getStatus(path: string): Promise<number> {
  return (await (await appPromise).request(path)).status;
}

function isResult(raw: unknown): raw is ShowSearchResult {
  return typeof raw === 'object' && raw !== null && 'shows' in raw && Array.isArray(raw.shows);
}

function ids(body: ShowSearchResult): number[] {
  return body.shows.map((show) => show.id);
}

/** Семь валидных сериалов и один без id — как настоящая выдача TVmaze. */
function makeSearchResponse() {
  const found = Array.from({ length: 7 }, (_, index) => ({
    score: 1,
    show: {
      id: index + 1,
      name: `Show ${index + 1}`,
      genres: index % 2 === 0 ? ['Drama', 'Comedy'] : ['Comedy'],
      premiered: '2010-01-01',
      rating: { average: index + 1 },
      image: { medium: `https://example.test/${index + 1}.jpg` },
      summary: `<p>Summary <b>${index + 1}</b></p>`,
    },
  }));
  return [...found, { score: 0.5, show: { name: 'No id' } }];
}
