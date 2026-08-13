import { test, expect } from './fixtures/test-base';
import { mintAccessToken, TEST_USER } from './helpers/auth';

const functionsUrl = () => `${process.env.VITE_SUPABASE_URL}/functions/v1`;

test.describe('hello-world edge function', () => {
  test('returns 401 without an Authorization header', async () => {
    const res = await fetch(`${functionsUrl()}/hello-world`);
    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body).toEqual({ data: null, error: 'Missing Authorization header' });
  });

  test('returns 401 when the bearer token is not a valid user JWT', async () => {
    const res = await fetch(`${functionsUrl()}/hello-world`, {
      headers: { Authorization: 'Bearer not-a-real-token' },
    });
    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body).toEqual({ data: null, error: 'Invalid or expired token' });
  });

  test('returns a greeting for an authenticated user', async () => {
    const token = mintAccessToken({ aal: 'aal1' });

    const res = await fetch(`${functionsUrl()}/hello-world`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toMatch(/application\/json/);

    const body = await res.json();
    expect(body).toEqual({
      data: { message: `Hello, ${TEST_USER.email}` },
      error: null,
    });
  });
});
