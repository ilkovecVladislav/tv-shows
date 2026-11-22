import { useMemo, useState } from 'react';
import { collectGenres, filterByGenre, PAGE_SIZE } from '../utils';
import { useShowSearch } from './useShowSearch';

export function usePresenter() {
  const [query, setQuery] = useState('');
  const search = useShowSearch(query);
  const [genre, setGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const genres = useMemo(() => collectGenres(search.shows), [search.shows]);
  // жанра может не быть в новой выдаче — фильтр тогда сбрасывается сам
  const activeGenre = genre !== null && genres.includes(genre) ? genre : null;
  const filtered = useMemo(
    () => filterByGenre(search.shows, activeGenre),
    [search.shows, activeGenre],
  );

  // страницу не сбрасываем эффектами, а клампим при рендере
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageShows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleGenreSelect = (next: string | null) => {
    setGenre(next !== null && next === activeGenre ? null : next);
    setPage(1);
  };

  return {
    query,
    onQueryChange: setQuery,
    onSubmit: search.flush,
    status: search.status,
    searchedQuery: search.searchedQuery,
    totalFound: search.shows.length,
    shownCount: filtered.length,
    genres,
    activeGenre,
    onGenreSelect: handleGenreSelect,
    shows: pageShows,
    currentPage,
    totalPages,
    onPageChange: setPage,
    onRetry: search.retry,
  };
}
