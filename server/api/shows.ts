import { apiClient } from './client.ts';

/**
 * Низкоуровневая абстракция эндпоинта поиска TVmaze: только транспорт,
 * без валидации. Ответ — внешние данные, читаем его как unknown и валидируем
 * на границе в задаче.
 */
export async function fetchShowSearch(query: string): Promise<unknown> {
  return apiClient
    .get('search/shows', { searchParams: { q: query } })
    .json();
}
