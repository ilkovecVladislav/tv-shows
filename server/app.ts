import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { listShows } from './tasks/listShows.ts';

const app = new Hono();

app.get(
  '/api/shows',
  validator('query', (value, c) => {
    const query = typeof value.q === 'string' ? value.q.trim() : '';
    const page = Number(value.page ?? 1);

    if (query === '') {
      return c.json({ message: 'Параметр "q" не должен быть пустым' }, 400);
    }
    if (!Number.isInteger(page) || page < 1) {
      return c.json({ message: 'Параметр "page" должен быть целым числом от 1' }, 400);
    }

    return { query, genre: getString(value.genre), page };
  }),
  async (c) => c.json(await listShows(c.req.valid('query'))),
);

function getString(value: string | string[] | undefined): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

export default app;
