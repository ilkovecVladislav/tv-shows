import type { Show } from '../../types/show';

export const PAGE_SIZE = 3;

export function collectGenres(shows: readonly Show[]): string[] {
  const seen = new Set<string>();
  for (const show of shows) {
    for (const genre of show.genres) {
      seen.add(genre);
    }
  }
  return [...seen];
}

export function filterByGenre(shows: readonly Show[], genre: string | null): Show[] {
  return genre === null ? [...shows] : shows.filter((show) => show.genres.includes(genre));
}
