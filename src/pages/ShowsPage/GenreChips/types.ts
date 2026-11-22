import type { usePresenter } from './usePresenter';

export interface GenreChipsProps {
  genres: readonly string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

export interface GenreChipItem {
  key: string;
  label: string;
  genre: string | null;
  isActive: boolean;
  /** индекс пастельной вариации; null — нейтральная кнопка «Все» */
  variant: number | null;
}

export type GenreChipsViewModel = ReturnType<typeof usePresenter>;
