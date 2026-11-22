import type { PaginationProps } from './types';
import { buildPageItems } from './utils';

export function usePresenter({ currentPage, totalPages, onChange }: PaginationProps) {
  const goTo = (page: number) => onChange(Math.min(Math.max(page, 1), totalPages));

  return {
    items: buildPageItems(currentPage, totalPages),
    canPrev: currentPage > 1,
    canNext: currentPage < totalPages,
    goPrev: () => goTo(currentPage - 1),
    goNext: () => goTo(currentPage + 1),
    goTo,
  };
}
