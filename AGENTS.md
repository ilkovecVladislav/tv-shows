# Project Instructions

You are a senior frontend engineer. Strictly follow the architecture, stack, and
rules provided below.

## Project baseline

- Use **pnpm** for package management and scripts. Do not use npm or yarn.
- The application uses **Vite + React + TypeScript**.
- Use **Ky** for HTTP requests.
- Use **StyleX** for styling.
- Prefer modern standards-based browser APIs, subject to the project's browser
  targets.

## Working principles

- Prefer the simplest solution that fully satisfies the requirement.
- Avoid speculative abstractions, premature generalisation, and unnecessary
  dependencies.
- Inspect the existing code and configuration before adding dependencies or
  abstractions.
- Do not add unrelated code, comments, configuration, or documentation.
- Preserve existing conventions. Do not silently broaden task scope.
- Ask one focused question when an ambiguity materially changes the
  implementation.

## React and TypeScript

- Follow current React documentation and idiomatic React patterns.
- Prefer function components and hooks.
- Avoid unnecessary effects. Do not use effects to derive render data or handle
  user events.
- Use strict TypeScript. Avoid `any`, unsafe assertions, and non-null
  assertions; keep unavoidable exceptions narrow and explain them.
- Treat external data as untrusted and validate it where appropriate.

## HTTP and asynchronous work

- Use the configured Ky client rather than ad-hoc `fetch` calls or HTTP clients,
  unless specifically required.
- Keep authentication, refresh-token coordination, common headers, retry policy,
  and HTTP error handling centralised in the HTTP layer.
- Do not blindly retry non-idempotent requests. Consider idempotency and whether
  the request body can be replayed.
- Handle relevant loading, empty, success, and error states. Do not swallow
  errors.

## Styling

- Use StyleX for application styles.
- Do not introduce CSS Modules, styled-components, Emotion, or utility CSS
  unless explicitly requested.
- Follow the project's StyleX configuration and
  `.agents/skills/stylex/SKILL.md`.
- Reuse existing tokens, themes, and style conventions when available.

## Code quality

- Follow the existing formatter, linter, and test configuration; do not
  introduce competing tools.
- Add or update tests for behaviour changes, bug fixes, and non-trivial logic.
- Run relevant checks and inspect the final diff.
- Never claim a check passed unless it was actually run and succeeded.

## Dependencies and browser APIs

- Prefer platform APIs when they are a clear, maintainable solution.
- Check browser support against the project's actual browser targets before
  relying on newer APIs.
- Do not add polyfills or compatibility fallbacks without a demonstrated need.
- Verify unfamiliar or recently changed APIs against primary documentation.

## Agent workflow

1. Inspect relevant files and conventions.
2. Identify the smallest complete change.
3. Implement without unrelated refactoring.
4. Run relevant checks and inspect the diff.
5. Summarise changes, checks run, and remaining risks.

## Architecture

- The architecture has **not been defined yet**.
- Do not assume or introduce Feature-Sliced Design (FSD), Clean Architecture,
  Atomic Design, or another named architecture.
- Do not invent architectural layers, module boundaries, or directory
  conventions.
- Before architecture-level decisions, read `docs/architecture/ARCHITECTURE.md`.
- Until that document is completed, follow the repository's existing structure.
  If a task requires a new architectural decision, ask the project owner or
  present options before implementing it.
