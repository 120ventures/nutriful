import { createHandler } from '../../_shared/handler.ts';
import { getAuthenticatedUser } from '../../_shared/auth.ts';

Deno.serve(createHandler(async (req) => {
  const user = await getAuthenticatedUser(req);

  return new Response(
    JSON.stringify({ data: { message: `Hello, ${user.email}` }, error: null }),
    { headers: { 'Content-Type': 'application/json' } },
  );
}));
