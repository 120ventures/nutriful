# Nutriful

**Die Kommunikationsplattform für die Ernährungsberatung.** Nutriful bringt Kommunikation, Ernährungspläne, Verlauf und Nachbereitung zwischen Diätolog:innen bzw. Ernährungsberater:innen und ihren Klient:innen an einen Ort – statt WhatsApp, E-Mails und Zettel.

Live: [nutriful.at](https://nutriful.at) (Deutsch) · [nutriful.at/en](https://nutriful.at/en) (English)

Ein Projekt der 120 Ventures GmbH. Hervorgegangen aus dem Gutiful-Prototyp (August 2026), seit 13.08.2026 als eigenes Projekt.

## Status

- **Phase:** Pilot-Vorbereitung. Die Website sammelt Pilot-Partner:innen (Erstgespräch via Calendly oder E-Mail-Formular).
- **Live:** B2B-Landingpage und interaktive Demo mit fiktiven Klient:innen-Daten.
- **Noch nicht im Repo:** die eigentliche Pilot-App (Praxis- und Klient:innen-Seite). Produktentscheidungen und Flows liegen in Notion und Figma.

Was sich auf der Website geändert hat, steht im [CHANGELOG.md](CHANGELOG.md).

## Was die Website enthält

| Route | Inhalt |
|---|---|
| `/` und `/en` | Landingpage: Pain-Points, vier Säulen (Kommunikation, Pläne, Fortschritt, Abschluss), Demo-Teaser, Pilot-Partner:in werden, FAQ |
| `/demo` und `/en/demo` | Interaktive Demo: Tagesübersicht, drei fiktive Klient:innen, Termin-Briefing, Verlauf, Chat, Plan-Baukasten (64 Rezepte mit Nährwerten), Profil, Abschluss |
| `/impressum`, `/datenschutz`, `/agb` | Rechtstexte (nur auf Deutsch, rechtlich maßgeblich) |

Alle Daten in der Demo sind erfunden. Es werden keine echten Partner- oder Klient:innen-Daten verwendet.

## Technik

- **Frontend:** React + TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix), react-router, i18n für DE/EN
- **Backend:** Supabase (eigenes Nutriful-Projekt). Tabelle für Pilot-Anfragen (Name, E-Mail, Quelle), Migrationen unter `supabase/migrations`
- **Analytics:** PostHog EU Cloud, nur nach Einwilligung über Cookiebot (Kategorie „Statistik“). Auf localhost deaktiviert.
- **Hosting:** Netlify. Build `pnpm run build`, veröffentlicht `dist/`, SPA-Redirect auf `index.html` (siehe `netlify.toml`). Jeder Push auf `main` geht live.

## Lokal entwickeln

```bash
pnpm install
cp .env.example .env.local   # Supabase-URL und -Key, optional PostHog und Cookiebot
pnpm dev
```

Ohne PostHog-Key gibt es weder Analytics noch Cookie-Banner. Ohne Supabase-Werte funktioniert alles außer dem Anfrageformular.

## Prüfen

```bash
pnpm typecheck
pnpm lint
pnpm test:unit     # Vitest
pnpm test:e2e      # Playwright
pnpm smoke         # kurzer Playwright-Smoke-Test gegen den Build
```

## Ordner

- `src/pages` – Partner (Landingpage), Demo, Legal, NotFound
- `src/components`, `src/i18n`, `src/lib`, `src/integrations` – UI, Übersetzungen, Demo-Daten, Supabase-Client
- `supabase/` – Migrationen, Seed, Edge Functions
- `tests/` – unit, e2e, smoke
- `docs/` – Projektregeln (Formatierung, Sicherheit, Cookie-Consent) und Boilerplate-Hinweise
- `docs/archive/gutiful/` – Unterlagen des Gutiful-Prototyps, aus dem Nutriful entstanden ist (historisch, nicht mehr gültig)

## Links

- Produktentscheidungen und Pilot-Pitch: Notion (Nutriful Venture-Wiki)
- Screens und Flows: Figma
- Business-Plan: Google Sheets
