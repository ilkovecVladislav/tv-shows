import type { GenreChipItem, GenreChipsProps } from './types';
import { genreVariant } from './utils';

export function usePresenter({ genres, selected, onSelect }: GenreChipsProps) {
  const items: GenreChipItem[] = [
    { key: 'all', label: 'Все', genre: null, isActive: selected === null, variant: null },
    ...genres.map((genre) => ({
      key: genre,
      label: genre,
      genre,
      isActive: selected === genre,
      variant: genreVariant(genre),
    })),
  ];

  const handleSelect = (item: GenreChipItem) => onSelect(item.genre);

  return { items, handleSelect };
}
