import ky from 'ky';

/**
 * Единый HTTP-клиент приложения. Поиск TVmaze — идемпотентный GET без auth,
 * поэтому разрешён аккуратный retry; отмену запросов делаем через AbortSignal.
 */
export const apiClient = ky.create({
  prefix: 'https://api.tvmaze.com',
  timeout: 10_000,
  retry: { limit: 1, methods: ['get'] },
});
