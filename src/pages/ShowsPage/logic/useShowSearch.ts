import { useCallback, useEffect, useState } from 'react';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import type { ShowSearchParams, ShowSearchResult } from '../../../types/show';
import { searchShows } from './tasks/searchShows';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

/** Завершённый запрос; result === null означает ошибку. */
interface Outcome {
  attempt: number;
  request: ShowSearchParams;
  result: ShowSearchResult | null;
}

const DEBOUNCE_MS = 400;
const NO_RESULT: ShowSearchResult = {
  shows: [],
  genres: [],
  genre: null,
  totalFound: 0,
  shownCount: 0,
  page: 1,
  totalPages: 1,
};

/**
 * Поиск без useQuery: стейт-машина idle → loading → success/error.
 * Эффект только запускает запрос и отменяет предыдущий через AbortController,
 * поэтому ответы всегда соответствуют последнему запросу. Статус «loading»
 * и пустой список выводятся при рендере, без синхронного setState в эффекте.
 */
export function useShowSearch(selection: ShowSearchParams) {
  const { debounced, flush } = useDebouncedValue(selection.query, DEBOUNCE_MS);
  const { genre, page } = selection;
  const query = debounced.trim();
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (query === '') return;

    const request: ShowSearchParams = { query, genre, page };
    const controller = new AbortController();
    searchShows(request, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setOutcome({ attempt, request, result });
      })
      .catch(() => {
        if (!controller.signal.aborted) setOutcome({ attempt, request, result: null });
      });

    return () => {
      controller.abort();
    };
  }, [query, genre, page, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  // статус выводим из сравнения текущего запроса с завершённым результатом
  const request: ShowSearchParams = { query, genre, page };
  let status: SearchStatus = 'loading';
  let result: ShowSearchResult = NO_RESULT;
  let isRefreshing = false;
  if (request.query === '') {
    status = 'idle';
  } else if (outcome !== null && outcome.attempt === attempt && isSameRequest(outcome.request, request)) {
    status = outcome.result === null ? 'error' : 'success';
    result = outcome.result ?? NO_RESULT;
  } else if (outcome !== null && outcome.result !== null && outcome.request.query === request.query) {
    // пока грузится новая страница или жанр, показываем предыдущий результат того же запроса
    status = 'success';
    result = outcome.result;
    isRefreshing = true;
  }

  return { status, result, isRefreshing, searchedQuery: request.query, flush, retry };
}

function isSameRequest(a: ShowSearchParams, b: ShowSearchParams): boolean {
  return a.query === b.query && a.genre === b.genre && a.page === b.page;
}
