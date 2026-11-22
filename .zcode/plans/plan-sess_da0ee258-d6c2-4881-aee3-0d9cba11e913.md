# Обновление кодовой базы под новую версию architecture.md

## Context

В `docs/architecture/architecture.md` (коммит 11c89d7) изменилась структура:
слоя `src/services/` больше нет — появились **таски** (use cases, verb-named,
React-free), причём одиночные таски живут в `logic/tasks/` компонента; presenter
и саб-хуки группируются в `logic/`; таски обязаны вызывать абстракции из
`src/api/`, а не ky напрямую. Кодовая база пока на старой структуре.

## Решения по неоднозначностям (док допускает оба варианта)

1. **Простые дочерние компоненты** (GenreChips, Pagination, SearchBar,
   ShowList, ShowCard): `usePresenter.ts` **остаётся в корне** — минимальный
   диф, док прямо разрешает. `logic/` обязателен только когда появляются
   саб-хуки или локальные таски — из текущих компонентов это только ShowsPage.
2. **Типы `XxxPresenter` → `XxxViewModel`** (6 файлов types.ts): переименуем —
   док §4 требует `ViewModel`, типы снаружи не используются, правка механическая.

## Изменения

1. **`src/api/shows.ts` (новый)** — низкоуровневый транспорт:
   `fetchShowSearch(query, signal): Promise<unknown>` — обёртка над
   `apiClient.get('search/shows', …)` из `src/api/client.ts`. Вся связь с ky —
   только тут (док §6).
2. **`src/pages/ShowsPage/logic/tasks/searchShows.ts` (новый)** — use case,
   переехавший из `src/services/shows.ts`: вызывает `fetchShowSearch`,
   валидирует внешние данные на границе и мапит в `Show[]`. Чистые хелперы
   (`isRecord`, `getString`, `getNumber`, `toShow`, `stripHtml`) переезжают
   вместе с ним (~75 строк, лимит 120 соблюдён). Единственный потребитель —
   ShowsPage → таска локальная (док §3).
   **Удалить:** `src/services/shows.ts`.
3. **`src/pages/ShowsPage/logic/useShowSearch.ts`** — переехал из
   `hooks/useShowSearch.ts`; импорт таски → `./tasks/searchShows`. Саб-хук один
   → прямо в `logic/` (`logic/hooks/` только для 3+, док §4). Удалить пустой
   `hooks/`.
4. **`src/pages/ShowsPage/logic/usePresenter.ts`** — переехал из
   `usePresenter.ts`; импорты → `./useShowSearch`, `../utils`.
5. **`src/pages/ShowsPage/ShowsPage.tsx`** — импорт `./logic/usePresenter`.
6. **`src/pages/ShowsPage/types.ts`** — импорт типа из `./logic/usePresenter`;
   `ShowsPagePresenter` → `ShowsPageViewModel`.
7. **Переименование `XxxPresenter` → `XxxViewModel`** в types.ts: GenreChips,
   Pagination, SearchBar, ShowList, ShowCard (только внутренние ссылки).
8. **`AGENTS.md` §9** — ключевые правила ссылаются на старую анатомию
   (`usePresenter.ts` в корне, нет `logic/`/`tasks/`/`store/`). Синхронизировать
   буллет с новой схемой (1–2 строки).

## Не делаем (док §10 — никаких спекулятивных сущностей)

- `src/store/` — в проекте нет state management.
- `src/router.tsx` — одна страница, роутер не установлен.
- `src/tasks/` (глобальный) — нет таски со вторым потребителем.

## Верификация

- `pnpm tsc -b --force` (внимание: `pnpm tsc --noEmit` здесь ничего не
  проверяет — solution-style tsconfig).
- `pnpm lint` (oxlint; включая max-lines 120 на logic-файлах).
- `pnpm build`.
- Смоук через `pnpm dev`: поиск с debounce, фильтр по жанру, пагинация, retry
  при ошибке — поведение не меняется, только расположение файлов.