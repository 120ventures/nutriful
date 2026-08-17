-- Nutriful runs on its own Supabase project from 2026-08-17 on. Two things the
-- inherited Gutiful schema was missing for a B2B partner list:
--
-- 1. The practitioner's name lived inside the onboarding jsonb, which makes it
--    awkward to use for outreach. It gets its own column.
-- 2. There was no unique constraint on email, so submitting the form twice
--    silently created a second row. The form already treats a unique violation
--    (23505) as success, so the constraint is all that was missing.

alter table public.signups
  add column if not exists name text;

-- Case-insensitive uniqueness: Anna@Praxis.at and anna@praxis.at are one person.
create unique index if not exists signups_email_unique_idx
  on public.signups (lower(email));

comment on column public.signups.name is 'Name of the practitioner who requested a first call';
comment on column public.signups.source is 'Which page the signup came from, e.g. partner-page';
comment on column public.signups.attribution is 'First-touch marketing attribution (utm_source, gclid, referrer, ...)';
