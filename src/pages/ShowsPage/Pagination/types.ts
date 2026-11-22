import type { usePresenter } from './usePresenter';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export type PaginationViewModel = ReturnType<typeof usePresenter>;
