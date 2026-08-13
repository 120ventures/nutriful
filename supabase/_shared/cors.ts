const ALLOWED_METHODS = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
const ALLOWED_HEADERS = 'authorization, x-client-info, apikey, content-type, x-locale';

/**
 * Returns CORS headers with origin validated against the CORS_ALLOWED_ORIGINS env var.
 * Falls back to '*' when no allowlist is configured (local dev).
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const allowed = (Deno.env.get('CORS_ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const requestOrigin = req.headers.get('origin') ?? '';
  const allowOrigin = allowed.length === 0
    ? '*'
    : (allowed.includes(requestOrigin) ? requestOrigin : '');

  return {
    ...(allowOrigin && { 'Access-Control-Allow-Origin': allowOrigin }),
    'Access-Control-Allow-Methods': ALLOWED_METHODS,
    'Access-Control-Allow-Headers': ALLOWED_HEADERS,
  };
}

