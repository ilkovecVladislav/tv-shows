import type { ShowCardProps } from './types';
import { initialsOf, trimSummary } from './utils';

export function usePresenter({ show }: ShowCardProps) {
  return {
    show,
    initials: initialsOf(show.name),
    variant: show.id % 5,
    year: show.year ?? '—',
    rating: show.rating !== null ? show.rating.toFixed(1) : null,
    genres: show.genres.join(' · '),
    summary: trimSummary(show.summary),
  };
}
