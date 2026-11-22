import { fetchShowSearch } from '../../../../api/shows';
import type { Show } from '../../../../types/show';

/**
 * Use case поиска сериалов: вызывает API и валидирует внешние данные
 * на границе — невалидные элементы молча отбрасываются.
 */
export async function searchShows(query: string, signal?: AbortSignal): Promise<Show[]> {
  const raw = await fetchShowSearch(query, signal);

  if (!Array.isArray(raw)) {
    throw new Error('TVmaze вернул неожиданный формат ответа');
  }

  const shows: Show[] = [];
  for (const item of raw) {
    const show = toShow(isRecord(item) ? item.show : undefined);
    if (show !== null) shows.push(show);
  }
  return shows;
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
