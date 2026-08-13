import { createHmac } from 'node:crypto';
import type { Page } from '@playwright/test';

// Known JWT secret for Supabase local development
// https://catjam.fi/articles/supabase-gen-access-token
const LOCAL_JWT_SECRET =
  'super-secret-jwt-token-with-at-least-32-characters-long';

export const TEST_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'test@example.com',
  password: 'Secret123',
};

function signJWT(
  payload: Record<string, unknown>,
  secret: string
): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Mints a Supabase-compatible access token for the local test user.
 * Set `aal` to control the Authenticator Assurance Level in the JWT.
 */
export function mintAccessToken(
  options: { aal?: 'aal1' | 'aal2' } = {}
): string {
  const { aal = 'aal2' } = options;
  const now = Math.floor(Date.now() / 1000);
  const ONE_HOUR = 3600;

  const amr: Array<{ method: string; timestamp: number }> = [
    { method: 'password', timestamp: now },
  ];
  if (aal === 'aal2') {
    amr.push({ method: 'mfa/sms', timestamp: now });
  }

  return signJWT(
    {
      aud: 'authenticated',
      exp: now + ONE_HOUR,
      iat: now,
      sub: TEST_USER.id,
      email: TEST_USER.email,
      role: 'authenticated',
      aal,
      amr,
    },
    LOCAL_JWT_SECRET
  );
}

/**
 * Builds a minimal Supabase Session object that the JS client
 * accepts when read from localStorage on page load.
 */
function buildSession(accessToken: string) {
  const now = Math.floor(Date.now() / 1000);
  const ONE_HOUR = 3600;

  return {
    access_token: accessToken,
    refresh_token: 'e2e-test-refresh-token',
    expires_in: ONE_HOUR,
    expires_at: now + ONE_HOUR,
    token_type: 'bearer',
    user: {
      id: TEST_USER.id,
      aud: 'authenticated',
      role: 'authenticated',
      email: TEST_USER.email,
      email_confirmed_at: new Date().toISOString(),
      app_metadata: { provider: 'email', providers: ['email'] },
      user_metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  };
}

function getSupabaseStorageKey(): string {
  const supabaseUrl = process.env.VITE_SUPABASE_URL!;
  const hostname = new URL(`${supabaseUrl}/auth/v1`).hostname;
  return `sb-${hostname.split('.')[0]}-auth-token`;
}

/**
 * Injects a minted Supabase session into the page so the app
 * treats the user as authenticated on every navigation.
 *
 * Call BEFORE navigating to authenticated pages.
 */
export async function injectSession(
  page: Page,
  options: { aal?: 'aal1' | 'aal2' } = {}
): Promise<void> {
  const accessToken = mintAccessToken(options);
  const session = buildSession(accessToken);
  const storageKey = getSupabaseStorageKey();
  const sessionJson = JSON.stringify(session);

  await page.addInitScript(
    ({ key, data }: { key: string; data: string }) => {
      window.localStorage.setItem(key, data);
    },
    { key: storageKey, data: sessionJson }
  );
}
