# Security Rules for Vibe Coding

> These rules apply to all AI tools (Cursor, Claude Code, Lovable, etc.).
> For every prompt, every feature, every fix — these rules take priority.

---

## 1. Secrets & API Keys

### Rules
- **NEVER** hardcode API keys, tokens, passwords, or secrets in code
- **NEVER** commit `.env` files — `.gitignore` must include `.env*`
- **NEVER** use secrets in frontend/client code — not even "just for testing"
- Supabase `anon` key is OK in the frontend (public by design), but **NEVER the service_role key**
- GitHub tokens, Stripe keys, SMTP credentials, etc. belong only in Edge Functions / backend

### Common Secret Patterns to Watch For
- `ghp_` (GitHub tokens), `sbp_` (Supabase), `sk_` / `pk_` (Stripe), `eyJ` (JWTs)
- `sk_live`, `sk_test` (Stripe live/test keys)

### Check
```
# Before every commit — check for secrets:
git diff --staged | grep -iE "(api_key|secret|password|token|private_key|service_role)"
```

### What to do if a secret is leaked?
1. Rotate the token/key immediately (create a new one, delete the old one)
2. Removing it from Git history is NOT enough — the key is compromised
3. Check if the key was misused (logs, usage)

---

## 2. Frontend ↔ Backend Separation

### Rules
- **No direct database access from the frontend** — always go through an API (Supabase Edge Functions)
- All business logic belongs in the backend, not the frontend

### Architecture Principle
```
Frontend (React) → Supabase Edge Function → Supabase DB
                    ↑ here: auth check, validation, business logic
```

### Don't do this
```typescript
// WRONG — direct DB mutation from the frontend
const { data } = await supabase.from('orders').insert({ ... })

// CORRECT — via Edge Function
const res = await fetch('/functions/create-order', { method: 'POST', body: JSON.stringify({ ... }) })
```

---

## 3. Authentication & Authorization

### Rules
- **NEVER build your own auth** — use Supabase Auth, Auth0, Clerk, etc.
- Every Edge Function must authenticate the user (verify JWT)
- Authorization ≠ Authentication: just because someone is logged in doesn't mean they can do everything
- Admin routes require explicit role checks

### Edge Function Template
All edge functions use the shared handler and auth modules. The handler provides CORS and error handling; auth verifies the user's token server-side.

```typescript
import { createHandler } from '../../_shared/handler.ts';
import { getAuthenticatedUser } from '../../_shared/auth.ts';

Deno.serve(createHandler(async (req) => {
  const user = await getAuthenticatedUser(req);

  // ... business logic using user.id, user.email, etc.

  return new Response(
    JSON.stringify({ data: { /* result */ }, error: null }),
    { headers: { 'Content-Type': 'application/json' } },
  );
}));
```

Gateway JWT verification is disabled (`verify_jwt = false` in `config.toml`); auth is enforced inside the function via `getAuthenticatedUser`, which calls `supabase.auth.getUser()` with the caller's token. This avoids relying on the legacy anon-key gateway check and gives each function explicit control over its auth requirements.

---

## 4. Row Level Security (RLS)

### Rules
- **RLS always enabled** on all tables — no exceptions
- Keep RLS policies as simple as possible
- Principle of Least Privilege: users can only see/modify their own data
- New table = enable RLS immediately, before any data is inserted

### Example
```sql
-- User can only see their own orders
CREATE POLICY "Users see own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can insert
CREATE POLICY "Auth users can insert" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Don't do this
```sql
-- NEVER — grants access to everything
CREATE POLICY "Allow all" ON orders FOR ALL USING (true);
```

---

## 5. Input Validation & Injection Prevention

### Rules
- **Validate all user inputs** — at least on the backend
- Use Zod schemas for all forms and API inputs
- No dynamic SQL queries with string concatenation
- Use parameterized queries / prepared statements
- File uploads: validate file type, size, and content
- **Validate against expected format and constraints** — define what is allowed (type, length, allowed characters, patterns) per field or API contract; reject or normalize only where the contract requires it, so legitimate data (e.g. rich text, code snippets, names with punctuation) is not corrupted by blanket stripping or escaping before storage.
- Sanitization is separate from validation: validate the format, then sanitize the content
- **Encoding and escaping are context-specific** — apply at output/render time (or at the boundary for that sink), not as universal preprocessing. Examples: HTML-encode when inserting into HTML; use parameterized queries or your data client for database access; escape for shell, URL, or other contexts as appropriate. See OWASP’s [Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html), [Cross-Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), and [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) cheat sheets.

### XSS Prevention
```typescript
// WRONG — enables XSS
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// CORRECT — React escapes automatically
<div>{userInput}</div>
```

### SQL Injection Prevention
```typescript
// WRONG
const { data } = await supabase.rpc('search', { query: `%${userInput}%` })

// CORRECT — Supabase Client escapes automatically for normal queries
const { data } = await supabase.from('products').select().ilike('name', `%${userInput}%`)
```

---

## 6. API Security

### Rules
- All API endpoints must be authenticated (unless explicitly public)
- CORS allowed origins must be read from a `.env` variable (comma-separated allowlist per environment, e.g. local + staging + prod) — never `*` for production, never hardcode origins in code
- Error responses must not leak internal details (stack traces, DB errors)
- Each Edge Function = one atomic operation (not multiple actions in one)

### CORS
CORS is handled by the shared module `_shared/cors.ts` via `getCorsHeaders(req)`. It reads `CORS_ALLOWED_ORIGINS` (comma-separated) from the environment and echoes only a matching origin. When the env var is empty (local dev), it falls back to `*`.

Set per environment, e.g. `CORS_ALLOWED_ORIGINS=https://app.example.com,http://localhost:5173`.

The `createHandler` wrapper calls `getCorsHeaders` automatically — individual edge functions do not need to handle CORS.

### Error Handling
```typescript
// WRONG — leaks internal details
return new Response(JSON.stringify({ error: error.message, stack: error.stack }), { status: 500 });

// CORRECT — generic error message
console.error('Order creation failed:', error);  // only in server log
return new Response(JSON.stringify({ error: 'Order could not be created' }), { status: 500 });
```

---

## 7. Dependencies & Supply Chain

### Rules
- **Always commit the lockfile (`package-lock.json`)** — protects against manipulated packages
- Don't install unknown/small npm packages without review
- Run `npm audit` regularly
- Only install packages from official sources (npmjs.com)
- Before installing: check downloads, maintainers, last updates
- Watch for suspicious `postinstall` / `preinstall` lifecycle scripts in dependencies — these can execute arbitrary code on install

### Check
```bash
npm audit                    # Check for known vulnerabilities
npm outdated                 # Show outdated packages
```

---

## 8. Environment & Deployment

### Rules
- **Separate environments**: Development, Staging, Production
- Never use production secrets in development
- `.env.local` for local development, `.env.production` for prod
- Only `VITE_` prefixed variables are visible in the frontend — use deliberately
- Supabase Service Role Key → only in Edge Functions, NEVER in the frontend
- Provide a `.env.example` with placeholder values (no real secrets) so new devs know what's needed

### Vite Environment Variables
```
# Visible in the frontend (public):
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Backend only (Edge Functions):
SUPABASE_SERVICE_ROLE_KEY=...    # NO VITE_ prefix!
STRIPE_SECRET_KEY=...            # NO VITE_ prefix!
```

---

## 9. Git & Code Hygiene

### Rules
- `.gitignore` must include: `.env*`, `node_modules/`, `.DS_Store`, `*.log`
- Before every push: check `git diff --staged` — no secrets, no debug logs
- No `console.log` with sensitive data (user data, tokens) in production
- Use feature branches, don't push directly to `main`
- Code reviews before merge (even if you're working alone — AI can review)

### .gitignore Minimum
```
node_modules/
.env
.env.*
.DS_Store
*.log
dist/
```

---

## Quick Check Before Every Deploy

- [ ] No secrets in code or Git history?
- [ ] `.env` in `.gitignore`?
- [ ] RLS enabled on all tables?
- [ ] All API endpoints authenticated?
- [ ] User input is validated (at least backend)?
- [ ] No `console.log` with sensitive data?
- [ ] `npm audit` without critical issues?
- [ ] CORS allowlist from `.env` (comma-separated), no `*` in production?
- [ ] No `dangerouslySetInnerHTML` with user input?
- [ ] Edge Functions don't leak internal error details?
- [ ] All user inputs sanitized (not just validated)?
- [ ] Admin endpoints check user roles (not just auth)?
- [ ] Every edge function listed in `supabase/config.toml` with `verify_jwt = false`?
