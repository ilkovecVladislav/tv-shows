import ky from 'ky';

/**
 * Единый HTTP-клиент приложения: ходит в наш API по `/api`. В dev запросы
 * проксирует Vite на сервер, в прод фронтенд и API живут на одном origin.
 * Поиск — идемпотентный GET без auth, поэтому разрешён аккуратный retry;
 * отмену запросов делаем через AbortSignal.
 */
export const apiClient = ky.create({
  prefix: '/api',
  timeout: 10_000,
  retry: { limit: 1, methods: ['get'] },
});
