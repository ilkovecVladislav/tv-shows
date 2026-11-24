import ky from 'ky';

/**
 * Единый HTTP-клиент сервера для внешних API. Поиск TVmaze — идемпотентный
 * GET без auth, поэтому разрешён аккуратный retry. Адрес TVmaze можно подменить
 * через TVMAZE_BASE_URL — так тесты ходят на локальную заглушку.
 */
export const apiClient = ky.create({
  prefix: process.env.TVMAZE_BASE_URL ?? 'https://api.tvmaze.com',
  timeout: 10_000,
  retry: { limit: 1, methods: ['get'] },
});
