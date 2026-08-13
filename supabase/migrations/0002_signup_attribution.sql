-- Marketing attribution per signup: first-touch UTM params / click ids
-- captured on the landing page (utm_source, utm_medium, ttclid, gclid,
-- referrer, landing_page, first_seen) as one jsonb blob.
-- The existing insert-only RLS policy (with check true) covers the new column.

alter table public.signups
  add column if not exists attribution jsonb;
