import type { Show, ShowSearchResult, ShowSearchParams } from '../types.ts';
import { searchShows } from './searchShows.ts';

const PAGE_SIZE = 3;

/** Выдача для клиента: берёт кешированный поиск и применяет жанр и страницу. */
export async function listShows(params: ShowSearchParams): Promise<ShowSearchResult> {
  return toShowPage(await searchShows(params.query), params.genre, params.page);
}

/**
 * Фильтрация по жанру и пагинация. Чипы жанров берутся из выдачи, поэтому
 * жанра может не быть в новой выдаче — фильтр тогда сбрасывается сам.
 */
export function toShowPage(
  shows: readonly Show[],
  genre: string | null,
  page: number,
): ShowSearchResult {
  const genres = collectGenres(shows);
  const activeGenre = genre !== null && genres.includes(genre) ? genre : null;
  const matches = activeGenre === null
    ? shows
    : shows.filter((show) => show.genres.includes(activeGenre));

  // страниц меньше, чем запрошено (сменился жанр или запрос) — берём последнюю
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  return {
    shows: matches.slice(offset, offset + PAGE_SIZE),
    genres,
    genre: activeGenre,
    totalFound: shows.length,
    shownCount: matches.length,
    page: currentPage,
    totalPages,
  };
}

function collectGenres(shows: readonly Show[]): string[] {
  const seen = new Set<string>();
  for (const show of shows) {
    for (const genre of show.genres) {
      seen.add(genre);
    }
  }
  return [...seen];
}
