---
name: add-tests
description: Adds or extends automated tests for this React/Vite app using Vitest (unit) and Playwright (e2e) with Supabase-backed fixtures. Use when writing tests, extending test coverage, debugging failing e2e/unit tests, or when the user mentions Playwright, Vitest, e2e, or test setup in this repository.
---

# add-tests

Use this skill when adding or changing tests in this repo.

## Choose the right layer

| Layer | Use for | Location | Run |
|-------|---------|----------|-----|
| **Unit** | Pure logic, hooks with mocks, utilities, formatters, Zod schemas, React components in isolation | `tests/unit/**/*.spec.ts(x)` or `src/**/*.spec.ts(x)` | `pnpm test:unit` |
| **E2E** | Full flows, navigation, auth/RLS, edge functions, downloads | `tests/e2e/**/*.spec.ts` | `pnpm test:e2e` |

Avoid duplicating the same behavior in both unless the risk warrants it (e.g. service logic in unit + one smoke path in e2e).

## Vitest (unit)

- Config lives in **`vite.config.ts`**: `defineConfig` is imported from **`vitest/config`** (with a `/// <reference types="vitest" />` at the top) so the `test` block type-checks.
- **`test.include`** is scoped to `tests/unit/**/*.spec.ts` and `src/**/*.spec.ts`; **`test.exclude`** includes `tests/e2e/**` and `node_modules/**` so Playwright specs are never collected as Vitest suites. If adding `.tsx` tests, extend `include` to `*.spec.{ts,tsx}` in the same config.
- **`globals: true`** is enabled, so `describe` / `it` / `expect` / `vi` are available without imports.
- **`environment: 'jsdom'`** is the default. The `jsdom` package is required at runtime — if `pnpm test:unit` fails with "Cannot find package 'jsdom'", it needs to be added as a dev dep (get approval first per `.cursorrules`).
- Use the **`@/`** alias for imports from `src/` (same as the app — defined in `vite.config.ts`).
- Use **`vi.stubGlobal`** for `window.open`, `window.matchMedia`, `localStorage`, etc. when testing code that touches browser APIs.
- For React component/hook tests, prefer **`@testing-library/react`** with **`@testing-library/user-event`** and **`@testing-library/jest-dom`**. These are not yet installed — ask before adding these dev deps (see `.cursorrules` § Adding Dependencies).
- Keep tests deterministic: freeze time with `vi.setSystemTime` if `Date`/`date-fns` affects output.

## Playwright (e2e)

- **Config**: `playwright.config.ts` — `testDir: ./tests/e2e`, `baseURL: http://localhost:5173`, `webServer` runs `pnpm run dev --mode test --port 5173`. Note the dev server default in `vite.config.ts` is `8080`; Playwright overrides the port via `--port 5173`, so tests must use `http://localhost:5173`.
- **Env**: Tests require `.env.test` and a running local Supabase. `tests/e2e/setup/global-setup.ts` auto-runs `supabase start` if not already running and extracts `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` from `supabase status -o json`.
- **Fixtures**: Import `test` / `expect` from **`tests/e2e/fixtures/test-base.ts`**, not directly from `@playwright/test`, so `supabase`, `supabaseAdmin`, and `authedPage` are available.
- **Auth**: Use the **`authedPage`** fixture for flows that require a signed-in user. It calls `injectSession` from `tests/e2e/helpers/auth.ts` with the minted JWT for `TEST_USER` (id `00000000-0000-0000-0000-000000000001`, email `test@example.com`) at AAL1 (no MFA). For MFA-verified / AAL2 flows, call `injectSession(page, { aal: 'aal2' })` manually in the spec (or add a dedicated `authedPageAAL2` fixture if the pattern becomes common).
- **Seeded auth user**: The `TEST_USER` row is inserted by **`supabase/seed.sql`** on `supabase db reset` (and on a fresh `supabase start`). Minted JWTs will **fail** (`Invalid or expired token`) until the seed has run — if auth tests suddenly break, try `supabase db reset`. If you change `TEST_USER.id` / `.email` in the helper, also update `supabase/seed.sql` to match; GoTrue's `auth.getUser()` validates that the JWT `sub` exists in `auth.users`.
- **Supabase seeding**: Use the **`supabaseAdmin`** fixture (service role, auto-refresh/persist disabled) in `beforeAll` / `afterAll` to insert/delete rows that RLS would otherwise block. Use `TEST_USER.id` where `user_id` is required. Tear down in reverse dependency order — delete child rows before the parents they reference. The default **`supabase`** fixture uses the anon key and should be used when the behavior under test depends on RLS.
- **Backend access rule**: Production code must go through Edge Functions (see `.cursorrules`). In **tests**, direct DB writes via `supabaseAdmin` are acceptable for fixtures/teardown only — never as a shortcut for exercising app behavior.
- **Serial suites**: Use `test.describe.configure({ mode: 'serial' })` when tests share one seeded record or depend on ordering. `fullyParallel: true` is the default.
- **Selectors (shadcn/ui + Radix)**: Components are built on **Radix UI** primitives wrapped by **shadcn/ui**. Prefer accessibility-first selectors: `page.getByRole('button', { name: /save/i })`, `getByLabel`, `getByText`. For inputs use `getByLabel` or `getByPlaceholder`. Fall back to `data-testid` only when roles/labels aren't stable. Toasts rendered by `sonner` are siblings of the document root — query with `getByRole('status')` or `getByText`.
- **React Router**: Routes are declared in **`src/App.tsx`** using `react-router-dom`. Navigate with `page.goto` using the real route path (e.g. `/`, `/login`). There is no hash routing.
- **Locator assertions**: Playwright's `expect(locator).toMatch(regex)` expects a **string** as `received`, not a Locator — using it on a locator causes a matcher error. For text on an element (including a **popup** page), use `expect(locator).toContainText(stringOrRegExp)` instead.
- **Imports from `src/` in e2e**: Prefer **relative** paths (e.g. `../../src/types/foo`) so Playwright's TypeScript pipeline doesn't depend on extra path mapping. Only import stable types/factories, **not `.tsx` React components**.

## Assertions that vary by locale / mode

The app may render different copy under `--mode test` or depending on user storage. For copy-sensitive assertions (toast text, headings), either:

- Match **both** patterns via regex alternation (e.g. `/Saved|Gespeichert/`), or
- Assert on stable structural data (seeded field values, test IDs, URLs, download filename patterns, CSV BOM/headers).

## Commands (verify locally)

```bash
pnpm test:unit
pnpm test:e2e
pnpm test:e2e tests/e2e/<file>.spec.ts   # args pass through to playwright test
```

## Checklist for new e2e specs

1. Import `test` / `expect` from `./fixtures/test-base` (or relative equivalent).
2. Seed minimal data in `beforeAll` via the **`supabaseAdmin`** fixture; use `TEST_USER.id` where `user_id` is required.
3. Restore state in `afterAll` (delete child rows before parents; reset profile flags if toggled).
4. Use `authedPage` when the flow is authenticated; plain `page` for public routes.
5. Navigate with `page.goto` using the real route path (see `src/App.tsx`).
6. Wait for UI readiness (`page.waitForLoadState('networkidle')` and/or an explicit locator `await expect(locator).toBeVisible()`) before interactions.
7. For downloads, set up `page.waitForEvent('download')` **before** clicking the trigger.
8. For forms built on React Hook Form + Zod, submit with the form's submit button and assert both the resulting UI state **and** the persisted DB row via the service-role client when relevant.

## Checklist for new unit specs

1. Place files under `tests/unit/` with `*.spec.ts(x)` (or co-locate in `src/**` for component-adjacent tests).
2. Mock network, `window`, `localStorage`, Supabase client, and analytics when testing hooks/utilities.
3. For `@tanstack/react-query` hooks, wrap with a fresh `QueryClient` and `QueryClientProvider` per test; disable retries (`defaultOptions: { queries: { retry: false } }`) to fail fast.
4. Keep tests deterministic (fixed dates via `vi.setSystemTime`; stable UUIDs).

## Testing Edge Functions directly

For pure API contract tests (no UI) against a function like `hello-world`, call it via `fetch` against `${process.env.VITE_SUPABASE_URL}/functions/v1/<name>`:

- `supabase start` auto-serves everything registered in `supabase/config.toml` at `/functions/v1/*` — no separate `supabase functions serve` needed.
- Use `mintAccessToken({ aal: 'aal1' })` from `tests/e2e/helpers/auth.ts` to produce a bearer token accepted by `getAuthenticatedUser` (requires the seeded `TEST_USER`, see above).

## Common pitfalls

- Importing `test` from `@playwright/test` instead of `./fixtures/test-base` — fixtures won't be available.
- Hitting `http://localhost:8080` in e2e: dev default is 8080, but **Playwright uses 5173**. Always rely on `baseURL` (relative paths in `page.goto`).
- Forgetting `.env.test` — global setup will throw. The file must exist even if Supabase env vars are later overwritten from `supabase status`.
- Writing to tables protected by RLS with the anon `supabase` fixture: use the `supabaseAdmin` fixture for seeding.
- Asserting on shadcn `Select`/`Dialog` internals: they're Radix portals — query from `page` (not from a parent locator that doesn't contain the portal).
- **Unit specs outside `src/`**: `tsconfig.app.json` only `include`s `src`, so files under `tests/unit/` don't pick up the `@/*` alias or vitest globals via the TS language server. Import explicitly (`import { describe, it, expect } from 'vitest'`) and use relative paths (`../../src/lib/utils`) — or add a dedicated tsconfig if you need the alias.

## After using this skill

When you finish adding or changing tests (or debugging failures while following this skill), **update this file** (`.cursor/skills/add-tests/SKILL.md`) with any **new critical learnings**: pitfalls, wrong assumptions, tooling quirks, or repo-specific patterns that would save the next person or the next run from repeating the same mistake. Keep additions short and actionable; avoid noise or one-off ticket trivia.
