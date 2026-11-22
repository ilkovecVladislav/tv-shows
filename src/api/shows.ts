import { apiClient } from './client';

/**
 * Низкоуровневая абстракция эндпоинта поиска TVmaze: только транспорт,
 * без валидации. Ответ — внешние данные, читаем их как unknown и валидируем
 * на границе в задаче.
 */
export async function fetchShowSearch(query: string, signal?: AbortSignal): Promise<unknown> {
  return apiClient
    .get('search/shows', { searchParams: { q: query }, signal })
    .json();
}
