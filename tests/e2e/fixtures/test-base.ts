import { test as base, type Page } from '@playwright/test';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { injectSession } from '../helpers/auth';

type TestFixtures = {
  supabase: SupabaseClient;
  supabaseAdmin: SupabaseClient;
  /** A page pre-authenticated with AAL1 (no MFA). Suitable for pending users. */
  authedPage: Page;
};

export const test = base.extend<TestFixtures>({
  supabase: async ({}, use) => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL!;
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase environment variables not set. Run tests with proper setup.'
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    await use(supabase);
  },

  supabaseAdmin: async ({}, use) => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Supabase service role key not set. Add SUPABASE_SERVICE_ROLE_KEY to .env.test'
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    await use(supabaseAdmin);
  },

  authedPage: async ({ page }, use) => {
    await injectSession(page, { aal: 'aal1' });
    await use(page);
  },
});

export { expect } from '@playwright/test';
