-- Gutiful signups / waitlist + onboarding responses
-- Safe public-insert pattern: anonymous visitors can INSERT their own signup,
-- but cannot read, update or delete any rows (no data leakage).

create table if not exists public.signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  source      text,                       -- where the signup came from: 'hero' | 'pricing' | 'onboarding'
  onboarding  jsonb,                       -- symptom answers etc. (nullable)
  consent     boolean not null default false,
  user_agent  text
);

-- Basic email sanity check
alter table public.signups
  add constraint signups_email_format
  check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Enable Row Level Security
alter table public.signups enable row level security;

-- Allow anonymous + authenticated visitors to INSERT only
create policy "anyone can sign up"
  on public.signups
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policies => those are denied for anon/authenticated by default.
-- Read the data via the Supabase dashboard or the service role key (server side) only.

create index if not exists signups_created_at_idx on public.signups (created_at desc);
