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
