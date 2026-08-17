// Consent storage for the cookie banner. Nutriful only loads PostHog
// (EU-hosted product analytics) and only after explicit consent.

export const CONSENT_KEY = "nutriful-consent";

/** Read the stored consent choice: "granted" | "denied" | null (undecided). */
export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof localStorage === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function storeConsent(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* ignore */
  }
}

/** Event the banner listens to so a stored choice can be revised at any time. */
export const CONSENT_REOPEN_EVENT = "nutriful:consent-reopen";

/**
 * Drop the stored choice and show the banner again. Withdrawing consent has to
 * be as easy as granting it (Art. 7 Abs. 3 DSGVO), so this is linked from the
 * footer on every page.
 */
export function reopenConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}
