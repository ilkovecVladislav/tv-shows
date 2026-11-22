import { useCallback, useEffect, useState } from 'react';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import type { Show } from '../../../types/show';
import { searchShows } from './tasks/searchShows';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

/** Завершённый результат запроса; shows === null означает ошибку. */
interface Outcome {
  attempt: number;
  searchedQuery: string;
  shows: Show[] | null;
}

const DEBOUNCE_MS = 400;

/**
 * Поиск без useQuery: стейт-машина idle → loading → success/error.
 * Эффект только запускает запрос и отменяет предыдущий через AbortController,
 * поэтому ответы всегда соответствуют последнему запросу. Статус «loading»
 * и пустой список выводятся при рендере, без синхронного setState в эффекте.
 */
export function useShowSearch(query: string) {
  const { debounced, flush } = useDebouncedValue(query, DEBOUNCE_MS);
  const searchQuery = debounced.trim();
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (searchQuery === '') return;

    const controller = new AbortController();
    searchShows(searchQuery, controller.signal)
      .then((shows) => {
        if (controller.signal.aborted) return;
        setOutcome({ attempt, searchedQuery: searchQuery, shows });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setOutcome({ attempt, searchedQuery: searchQuery, shows: null });
      });

    return () => {
      controller.abort();
    };
  }, [searchQuery, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  // статус выводим из сравнения текущего запроса с завершённым результатом
  let status: SearchStatus = 'loading';
  let shows: Show[] = [];
  if (searchQuery === '') {
    status = 'idle';
  } else if (
    outcome !== null &&
    outcome.attempt === attempt &&
    outcome.searchedQuery === searchQuery
  ) {
    status = outcome.shows === null ? 'error' : 'success';
    shows = outcome.shows ?? [];
  }

  return { status, shows, searchedQuery: searchQuery, flush, retry };
}
