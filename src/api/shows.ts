import type { ShowSearchParams } from '../types/show';
import { apiClient } from './client';

/**
 * Низкоуровневая абстракция эндпоинта поиска нашего API: только транспорт,
 * без валидации. Ответ — внешние данные, читаем его как unknown и валидируем
 * на границе в задаче.
 */
export async function fetchShowSearch(params: ShowSearchParams, signal?: AbortSignal): Promise<unknown> {
  return apiClient
    .get('shows', {
      searchParams: { q: params.query, genre: params.genre ?? undefined, page: params.page },
      signal,
    })
    .json();
}
