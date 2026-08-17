# Changelog

Overview of user-facing changes.

---

## 2026-08-17

### Clickable demo on the landing page
- The dashboard illustration is now interactive: visitors switch between three example clients, tap any day of the programme and see that day's entries, warnings and chat
- New "Plan erstellen" tab: pick a counselling goal, click meal blocks into a day plan and assign it to the client - the core practitioner workflow, playable before signing up
- Days that are not tracked yet say so instead of showing empty boxes

### Funnel measurement
- Named events in addition to the existing signup event: cta_click (which button), section_view (demo, pricing, pilot, FAQ), demo_interaction (what visitors try in the demo) and form_start
- Analytics no longer fire on localhost, so development traffic stays out of the project

### Cookiebot ready as consent platform
- When a Cookiebot domain group is configured, Cookiebot runs the consent dialog and PostHog follows its "statistics" category; the built-in banner steps aside
- If Cookiebot loads but shows no dialog - which is what happens on a domain that is not registered in its domain group - the built-in banner takes over after a few seconds, so the page is never left without a consent dialog
- The Datenschutz page gets Cookiebot's auto-generated cookie table and lists Usercentrics as a processor

### Analytics live, consent can be withdrawn
- PostHog is now configured on nutriful.at, so the cookie banner is live and analytics run after consent
- New "Cookie-Einstellungen" entry in the footer of every page brings the banner back, so a given consent can be withdrawn as easily as it was granted
- Datenschutzerklärung points to that footer entry instead of asking visitors to clear their browser storage

## 2026-08-14

### PostHog analytics, consent-gated
- PostHog (EU Cloud) integrated for product analytics: pageviews, autocapture and a "partner_signup" event on form submission
- Loads only after explicit consent via a new cookie banner (Ablehnen/Akzeptieren); without a configured PostHog key neither analytics nor the banner appear
- Datenschutzerklärung updated: PostHog listed as processor, cookie section adjusted

## 2026-08-13

### Initial launch: Nutriful B2B landing page
- Nutriful is the communication platform for nutrition counseling (Diätolog:innen and Ernährungsberater:innen) - spun out of the Gutiful prototype as its own project
- Landing page at the root URL: pain section with gap visual (Termin 1 → Termin 2), example practitioner dashboard (30-day program with fictional data), features, two-tier pricing (Praxis 49 EUR/month up to 10 active clients, Praxis Plus individual), pilot partner form and FAQ
- Lead form stores name + email in Supabase (source "partner-page")
- No marketing or analytics tracking, therefore no cookie banner - only technically necessary storage
- Legal pages (Impressum, Datenschutz, AGB) adapted to the B2B pilot setup on nutriful.at
