import { useState } from 'react';
import { useShowSearch } from './useShowSearch';

export function usePresenter() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  // фильтр по жанру и пагинация живут на сервере: смена жанра или страницы — новый запрос
  const search = useShowSearch({ query, genre, page });
  const { result } = search;

  const handleGenreSelect = (next: string | null) => {
    setGenre(next !== null && next === genre ? null : next);
    setPage(1);
  };

  return {
    query,
    onQueryChange: setQuery,
    onSubmit: search.flush,
    status: search.status,
    isBusy: search.status === 'loading' || search.isRefreshing,
    isRefreshing: search.isRefreshing,
    searchedQuery: search.searchedQuery,
    totalFound: result.totalFound,
    shownCount: result.shownCount,
    genres: result.genres,
    activeGenre: result.genre,
    shows: result.shows,
    currentPage: result.page,
    totalPages: result.totalPages,
    onPageChange: setPage,
    onRetry: search.retry,
    onGenreSelect: handleGenreSelect,
  };
}
