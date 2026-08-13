import { createClient } from 'jsr:@supabase/supabase-js@2';
import { HttpError } from './errors.ts';

/**
 * Gets the authenticated user
 */
export async function getAuthenticatedUser(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new HttpError('Missing Authorization header', 401);
  }

  const supabase = createUserClient(req);
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new HttpError('Invalid or expired token', 401);
  }

  return user;
}

/**
 * Creates a Supabase client with user authentication for RLS enforcement.
 * This ensures all database operations respect Row Level Security policies.
 * 
 * @param req - The request object containing the Authorization header
 * @returns A Supabase client configured with the user's auth token
 */
export function createUserClient(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new HttpError('Missing Authorization header', 401);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: authHeader },
    },
  });
}

/**
 * Creates a Supabase admin client with service_role key.
 * This bypasses Row Level Security and has full database access.
 * Use with caution and only when necessary for administrative operations.
 * 
 * @returns A Supabase client configured with the service_role key
 */
export function createAdminClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

