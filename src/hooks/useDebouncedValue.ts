import { useEffect, useState } from 'react';

/**
 * Возвращает значение с задержкой: пока `value` меняется быстрее `delayMs`,
 * наружу отдаётся последнее устоявшееся значение. `flush` мгновенно принимает
 * текущее значение (например, при явном сабмите поиска).
 */
export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timerId);
  }, [value, delayMs]);

  return { debounced, flush: () => setDebounced(value) };
}
