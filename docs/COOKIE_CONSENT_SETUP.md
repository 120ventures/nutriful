# Cookie Consent Banner — Setup Guide

> GDPR-compliant cookie consent setup. Required before Go-Live in the EU.

---

## Architecture

```
User visits site
  → Default: all non-essential cookies DENIED
  → Banner appears after 1s
  → User chooses: Accept All / Reject All / Customize
  → Consent stored in localStorage
  → GTM Consent Mode v2 updated via gtag()
  → Tags fire (or don't) based on consent
```

---

## Consent Categories

| Category | Tools | GTM Consent Type |
|----------|-------|------------------|
| Essential | Session, Auth | (No restriction) |
| Analytics | PostHog, GA4, Hotjar | `analytics_storage` |
| Marketing | Meta Pixel, Google Ads | `ad_storage`, `ad_user_data`, `ad_personalization` |

---

## Implementation Checklist

### 1. Component
- [ ] Create `src/components/CookieConsent.tsx`
- [ ] Three categories: Essential (always on), Analytics (toggle), Marketing (toggle)
- [ ] Language-appropriate UI
- [ ] Settings panel for granular control
- [ ] Link to Privacy Policy page

### 2. Utility Functions
- [ ] Create `src/utils/cookie-consent.ts`
- [ ] `getCookieConsent()` — read current consent state
- [ ] `hasUserConsented()` — check if user has made a choice
- [ ] `canTrackAnalytics()` — check analytics consent
- [ ] `canTrackMarketing()` — check marketing consent

### 3. index.html
- [ ] Add Google Consent Mode v2 default script BEFORE GTM
```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });
</script>
<!-- GTM script goes AFTER -->
```

### 4. GTM Configuration
- [ ] Configure consent requirements on all tags
- [ ] Analytics tags require `analytics_storage`
- [ ] Marketing tags require `ad_storage`
- [ ] Test in GTM Preview Mode
- [ ] Publish GTM container

---

## User Experience

### Banner
```
🍪 Cookies & Privacy

We use cookies to provide you with the best possible
experience on our website.

[Settings] [Reject All] [Accept All]
```

### Settings Panel
```
⚙️ Cookie Settings

✅ Essential Cookies (always active)
🔄 Analytics Cookies [Toggle]
🔄 Marketing Cookies [Toggle]

[Reject All] [Accept All] [Save Settings]
```

---

## Debugging

```javascript
// Check consent in browser console
localStorage.getItem('YOUR_APP-cookie-consent')

// Clear consent for testing
localStorage.removeItem('YOUR_APP-cookie-consent')
localStorage.removeItem('YOUR_APP-cookie-consent-date')
// Reload page
```

---

## Testing Checklist

- [ ] Banner appears after 1s on first visit
- [ ] "Accept All" grants all consents
- [ ] "Reject All" denies analytics & marketing
- [ ] Settings panel toggles work
- [ ] Consent persists after page reload
- [ ] Banner doesn't reappear after consent given
- [ ] GTM tags respect consent in Preview Mode
- [ ] Console shows consent update messages

---

## Legal Compliance

- GDPR (EU General Data Protection Regulation)
- ePrivacy Directive (Cookie Law)
- Google Consent Mode v2 (required for EU since March 2024)
- Opt-in by default (consent denied until user accepts)
