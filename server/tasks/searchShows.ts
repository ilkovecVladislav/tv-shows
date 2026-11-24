import { fetchShowSearch } from '../api/shows.ts';
import type { Show } from '../types.ts';

const CACHE_TTL_MS = 5 * 60_000;

interface CacheEntry {
  shows: Show[];
  expiresAt: number;
}

// shortcut: устаревшие записи не вытесняются, только перезаписываются; добавить вытеснение, если уникальных запросов станет много
/** Кеш выдачи TVmaze в памяти процесса; живёт до перезапуска сервера. */
const cache: Record<string, CacheEntry> = {};

/**
 * Поиск сериалов на TVmaze с кешем на 5 минут: пока запись свежая, внешний
 * API не вызывается. Неудачный запрос не кешируется.
 */
export async function searchShows(query: string): Promise<Show[]> {
  // TVmaze ищет без учёта регистра, поэтому «Banana» и « banana » — один ключ
  const key = query.trim().toLowerCase();
  const entry = cache[key];
  if (entry !== undefined && entry.expiresAt > Date.now()) return entry.shows;

  const raw = await fetchShowSearch(key);
  if (!Array.isArray(raw)) {
    throw new Error('TVmaze вернул неожиданный формат ответа');
  }

  const shows: Show[] = [];
  for (const item of raw) {
    const show = toShow(isRecord(item) ? item.show : undefined);
    if (show !== null) shows.push(show);
  }

  cache[key] = { shows, expiresAt: Date.now() + CACHE_TTL_MS };
  return shows;
}

/**
 * Валидирует внешние данные на границе: невалидные элементы
 * молча отбрасываются.
 */
function toShow(raw: unknown): Show | null {
  if (!isRecord(raw)) return null;
  const id = getNumber(raw.id);
  if (id === null) return null;

  const genres = Array.isArray(raw.genres)
    ? raw.genres.filter((genre): genre is string => typeof genre === 'string')
    : [];
  const image = isRecord(raw.image) ? getString(raw.image.medium) : null;
  const rating = isRecord(raw.rating) ? getNumber(raw.rating.average) : null;
  const premiered = getString(raw.premiered);
  const summaryHtml = getString(raw.summary);

  return {
    id,
    name: getString(raw.name) ?? 'Без названия',
    genres,
    year: premiered !== null ? premiered.slice(0, 4) : null,
    rating,
    image,
    summary: summaryHtml !== null ? stripHtml(summaryHtml) : null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** TVmaze присылает описание как HTML-фрагмент — для карточки нужен чистый текст. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
