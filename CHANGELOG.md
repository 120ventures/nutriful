# Changelog

Overview of user-facing changes.

---

## 2026-08-17

### Demo prominenter auf der Startseite
- Die Demo hat jetzt einen eigenen, farblich abgesetzten Abschnitt mit Überschrift statt als Anhängsel unter "So funktioniert's" zu stehen
- Der zweite Button im Hero führt direkt zur Demo ("Demo ausprobieren") statt nur weiter nach unten zu scrollen
- Chips über dem Dashboard zeigen vorab, was in der vollen Demo steckt: Termin-Briefing, Verlauf pro Tag, Chat, Plan-Baukasten

### Klient:innen-Liste zählt Tage
- In der Seitenleiste steht jetzt bei allen der Programmtag statt einer Mischung aus Wochen und Tagen: "Ernährungsumstellung · Tag 9 von 30"
- Der Tag wird aus dem Verlauf abgeleitet, kann also nicht mehr von der Detailansicht abweichen

### Plan-Baukasten nach Mahlzeit und Zutat
- Die Auswahl beginnt jetzt bei der Mahlzeit: Frühstück, Mittag, Abend und Snack als Umschalter, darunter nur die Rezepte dieser Mahlzeit
- Suchfeld über den Rezepten findet nach Zutat statt nach Rezeptnamen - "Linsen" führt zum Linsensalat, auch wenn das Wort im Titel nicht auffällt
- Jedes Rezept zeigt seine Zutaten direkt unter dem Namen
- Trifft die Suche eine andere Mahlzeit, steht das darunter ("Auch gefunden bei: Abend (1)") und ist anklickbar, statt eine leere Liste zu zeigen

### Ernährungsformen im Plan-Baukasten
- Neue Filterzeile über den Bausteinen: vegetarisch, vegan, laktosefrei und halal, beliebig kombinierbar
- Der Katalog wurde um pflanzliche Bausteine ergänzt, damit jede Kombination in jedem Beratungsziel noch Frühstück, Mittag, Abend und Snack anbietet
- Bei aktivem Halal-Filter steht dabei, dass Fleisch- und Geflügelbausteine halal-zertifizierte Ware voraussetzen

### Own demo page at /demo
- Full interactive demo on its own page: switch between three fictional clients and work through four tabs
- Termin-Briefing opens on arrival: tracked days, number of entries, flagged moments and the open question from the chat - everything computed from that client's actual tracked days, and each flag jumps straight into the day it came from
- Chat with the demo clients really works: type or use a quick reply, they answer
- The landing page keeps the interactive teaser and now links to the full demo; "Demo ansehen" was added to the header

### Clickable demo on the landing page
- The dashboard illustration is now interactive: visitors switch between three example clients, tap any day of the programme and see that day's entries, warnings and chat
- New "Plan erstellen" tab: pick a counselling goal, click meal blocks into a day plan and assign it to the client - the core practitioner workflow, playable before signing up
- Days that are not tracked yet say so instead of showing empty boxes

### Funnel measurement
- Named events in addition to the existing signup event: cta_click (which button), section_view (demo, pricing, pilot, FAQ), demo_interaction (what visitors try in the demo) and form_start
- Analytics no longer fire on localhost, so development traffic stays out of the project

### Cookiebot is now the only consent dialog
- The built-in cookie banner has been removed; Cookiebot alone asks for consent and PostHog follows its "statistics" category
- "Cookie-Einstellungen" in the footer reopens the Cookiebot dialog, and only appears once Cookiebot is actually there

### Cookiebot ready as consent platform
- When a Cookiebot domain group is configured, Cookiebot runs the consent dialog and PostHog follows its "statistics" category; the built-in banner steps aside
- The Datenschutz page gets Cookiebot's auto-generated cookie table and lists Usercentrics as a processor
- The Cookiebot dialog is pinned to German, so it does not greet Austrian visitors in English once a German text variant exists in the domain group

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
