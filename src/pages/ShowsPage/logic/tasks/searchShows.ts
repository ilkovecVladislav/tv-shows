import { fetchShowSearch } from '../../../../api/shows';
import type { Show, ShowSearchParams, ShowSearchResult } from '../../../../types/show';

/**
 * Use case поиска сериалов: вызывает наш API и валидирует ответ на границе —
 * неверная обёртка считается ошибкой, невалидные элементы отбрасываются.
 */
export async function searchShows(
  params: ShowSearchParams,
  signal?: AbortSignal,
): Promise<ShowSearchResult> {
  const raw = await fetchShowSearch(params, signal);
  const result = toSearchResult(raw);
  if (result === null) throw new Error('Сервер вернул неожиданный формат ответа');
  return result;
}

function toSearchResult(raw: unknown): ShowSearchResult | null {
  if (!isRecord(raw) || !Array.isArray(raw.shows) || !Array.isArray(raw.genres)) return null;

  const totalFound = getNumber(raw.totalFound);
  const shownCount = getNumber(raw.shownCount);
  const page = getNumber(raw.page);
  const totalPages = getNumber(raw.totalPages);
  if (totalFound === null || shownCount === null || page === null || totalPages === null) return null;

  return {
    shows: raw.shows.map(toShow).filter((show): show is Show => show !== null),
    genres: toStrings(raw.genres),
    genre: getString(raw.genre),
    totalFound,
    shownCount,
    page,
    totalPages,
  };
}

function toShow(raw: unknown): Show | null {
  if (!isRecord(raw)) return null;
  const id = getNumber(raw.id);
  if (id === null) return null;

  return {
    id,
    name: getString(raw.name) ?? 'Без названия',
    genres: toStrings(raw.genres),
    year: getString(raw.year),
    rating: getNumber(raw.rating),
    image: getString(raw.image),
    summary: getString(raw.summary),
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

function toStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}
