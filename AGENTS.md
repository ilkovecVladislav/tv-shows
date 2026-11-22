# AGENTS.md

You are a senior frontend engineer. Follow the architecture, stack, and rules
below strictly.

## 1. Project baseline

- Package manager: **pnpm** only (no npm/yarn).
- Stack: **Vite + React 19+ + TypeScript**, **ky** (HTTP), **StyleX** (styling).
- Prefer modern standards-based browser APIs within the project's browser
  targets.

## 2. Commands (run after code changes)

- `pnpm tsc --noEmit` — type check. Required.
- `pnpm lint` (oxlint) — lint. Required after editing any `stylex.create()`.
- `pnpm build` — full build. Required before declaring a task done.
- `pnpm dev` — local dev server.

## 3. Linting

- Linter is **oxlint** (configured in `.oxlintrc.json`). Do not add ESLint,
  Prettier, Biome, or any competing tool.
- StyleX rules are enforced via `@stylexjs/eslint-plugin` loaded as a JS plugin:
  `@stylexjs/valid-styles`, `@stylexjs/no-unused`,
  `@stylexjs/no-legacy-contextual-styles`, `@stylexjs/sort-keys` (recess order).
- Do not disable or override these rules. Fix the code instead.

## 4. Styling (StyleX)

- Use **StyleX exclusively**. Do not introduce CSS Modules, styled-components,
  Emotion, Tailwind, utility CSS, inline `style={{}}`, or plain `.css` files for
  component styles.
- Authoring rules and pitfalls: see `.agents/llm-resources/stylex/` (StyleX LLM
  authoring guide). Read it before writing non-trivial styles.
- Reuse existing tokens/themes/style conventions when available.

## 5. HTTP (ky)

- Use the pre-configured ky client in `src/api/client.ts`. Do not call `fetch`
  directly or introduce another HTTP client.
- Keep auth, refresh-token coordination, common headers, retry policy, and HTTP
  error handling centralised in `src/api/client.ts`.
- Do not blindly retry non-idempotent requests. Consider idempotency and whether
  the body can be replayed.
- Handle loading, empty, success, and error states. Do not swallow errors.

## 6. React + TypeScript

- Follow current React docs and idiomatic patterns. Function components + hooks.
- Do not use effects to derive render data or to handle user events.
- Strict TypeScript. No `any`, unsafe assertions, or non-null assertions.
  Narrow, explained exceptions only.
- Treat external data as untrusted; validate at the boundary.

## 7. Working principles

- Prefer the simplest solution that fully satisfies the requirement.
- No speculative abstractions, premature generalisation, or unnecessary deps.
- Inspect existing code and configuration before adding deps or abstractions.
- Do not add unrelated code, comments, config, or docs. Do not broaden scope.
- Ask one focused question **only** when ambiguity materially changes the
  implementation. Otherwise, proceed with the smallest reasonable change.

## 8. Agent workflow

1. Inspect relevant files and conventions.
2. Identify the smallest complete change.
3. Implement without unrelated refactoring.
4. Run `pnpm tsc --noEmit`, `pnpm lint`, and `pnpm build`. Inspect the diff.
5. Summarise changes, checks run (with actual results), and remaining risks.

- Never claim a check passed unless it was actually run and succeeded.

## 9. Architecture — Simple Architecture

- The project uses **Simple Architecture** (= Clean Architecture + VIPER). Full
  specification: `docs/architecture/architecture.md`.
- **Read that document before any structural decision.** Follow it strictly.
- Key rules (details in the spec):
  - Every component is a folder (`ComponentName/`) with `index.ts`,
    `ComponentName.tsx`, `types.ts`, `stylex.ts`, and logic in
    `logic/` (`usePresenter.ts`, sub-hooks, local `tasks/`).
  - Views are JSX only; all logic lives in `logic/usePresenter.ts` (split into
    sub-hooks when it grows).
  - Tasks are verb-named plain functions with zero React dependency; they call
    `src/api/` abstractions, never `ky` directly.
  - Import **only** from a component's `index.ts`. Never reach into another
    component's internals.
  - Component and task placement is decided by reuse scope, not by size.
  - Logic files ≤ 120 lines. No barrel files beyond `index.ts`.
- Do not introduce FSD, Atomic Design, or another named architecture.
- If the spec does not cover a case, present options to the project owner before
  implementing.

## 10. Skills vs this file

- Skills under `.agents/skills/` (e.g. ponytail, modern-web-guidance) provide
  strategy. This file provides constraints.
- If a skill conflicts with this file, **this file wins**.
