import { FullConfig } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function globalSetup(_config: FullConfig) {
  console.log('🚀 Starting test setup...');

  // Check if Supabase is running, start if not
  console.log('🔍 Checking if Supabase is running...');
  let supabaseRunning = false;

  try {
    await execAsync('supabase status');
    supabaseRunning = true;
    console.log('✅ Supabase is already running');
  } catch (error) {
    console.log('❌ Supabase is not running, starting it...');
  }

  if (!supabaseRunning) {
    try {
      console.log('🐘 Starting Supabase instance...');
      await execAsync('supabase start');
      console.log('✅ Supabase started successfully');
    } catch (error) {
      console.error('❌ Failed to start Supabase:', error);
      throw error;
    }
  }

  // Check if .env.test file exists
  try {
    await fs.access('.env.test');
    console.log('✅ .env.test file exists');
  } catch (error) {
    console.error('❌ .env.test file not found');
    throw new Error(
      '.env.test file is required but not found. Please create a .env.test file with the necessary environment variables before running tests.'
    );
  }

  // Extract env vars from the running Supabase instance if not already set
  const needed = !process.env.SUPABASE_SERVICE_ROLE_KEY
    || !process.env.VITE_SUPABASE_URL
    || !process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (needed) {
    try {
      const { stdout } = await execAsync('supabase status -o json');
      const status = JSON.parse(stdout);

      const envMap: Record<string, string | undefined> = {
        VITE_SUPABASE_URL: status.API_URL ?? status.api_url,
        VITE_SUPABASE_PUBLISHABLE_KEY: status.ANON_KEY ?? status.anon_key,
        SUPABASE_SERVICE_ROLE_KEY: status.SERVICE_ROLE_KEY ?? status.service_role_key,
      };

      for (const [key, value] of Object.entries(envMap)) {
        if (!process.env[key] && value) {
          process.env[key] = value;
          console.log(`✅ ${key} extracted from supabase status`);
        }
      }
    } catch (error) {
      console.warn('⚠️  Failed to extract env vars from supabase status:', error);
    }
  }
}

export default globalSetup;
