-- Seed data for local development & e2e tests
-- Automatically executed on `supabase db reset` (and after `supabase start` on a fresh db).
--
-- Test User Credentials:
--   Email:    test@example.com
--   Password: Secret123
--   ID:       00000000-0000-0000-0000-000000000001
--
-- This id matches `TEST_USER.id` in tests/e2e/helpers/auth.ts so that JWTs
-- minted for e2e tests resolve to a real auth.users row on the local GoTrue.
--
-- To reset the password manually:
--   UPDATE auth.users
--      SET encrypted_password = extensions.crypt('newpassword', extensions.gen_salt('bf'))
--    WHERE email = 'test@example.com';

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
  test_password_hash TEXT;
BEGIN
  test_password_hash := extensions.crypt('Secret123', extensions.gen_salt('bf'));

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    aud,
    role,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    test_user_id,
    '00000000-0000-0000-0000-000000000000',
    'test@example.com',
    test_password_hash,
    NOW(),
    NOW(),
    NOW(),
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub":"00000000-0000-0000-0000-000000000001","email":"test@example.com","email_verified":true,"phone_verified":false}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) ON CONFLICT (id) DO NOTHING;
END $$;

INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  '{"sub":"00000000-0000-0000-0000-000000000001","email":"test@example.com"}',
  'email',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
