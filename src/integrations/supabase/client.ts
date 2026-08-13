import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Guard: if env vars are missing, don't call createClient (it throws and would
// white-screen the whole app). Fall back to a stub whose calls fail gracefully.
function createStub(): SupabaseClient<Database> {
  const notConfigured = {
    message:
      'Supabase ist nicht konfiguriert. Bitte VITE_SUPABASE_URL und VITE_SUPABASE_PUBLISHABLE_KEY in .env.local setzen.',
    code: 'NO_CONFIG',
  };
  const handler = {
    from() {
      return {
        insert: async () => ({ data: null, error: notConfigured }),
        select: async () => ({ data: null, error: notConfigured }),
      };
    },
  };
  return handler as unknown as SupabaseClient<Database>;
}

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createStub();
