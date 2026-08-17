// Cookiebot (Usercentrics) as consent management platform. When a domain group
// id is configured, Cookiebot owns the banner and the stored consent, and the
// built-in banner stays out of the way. PostHog follows Cookiebot's
// "statistics" category.

import { phOptIn, phOptOut, POSTHOG_KEY } from "./posthog";

type CookiebotApi = {
  consent?: { statistics?: boolean; marketing?: boolean; preferences?: boolean };
  /** True once the visitor has answered the dialog. */
  hasResponse?: boolean;
  renew?: () => void;
  show?: () => void;
};

/** Cookiebot's dialog element, present once it actually renders. */
const DIALOG_ID = "CybotCookiebotDialog";

/**
 * Whether Cookiebot is doing its job on this page. The script loads happily on
 * domains that are not registered in the domain group but then shows nothing at
 * all, so "the object exists" is not enough to go on.
 */
export const cookiebotIsWorking = () =>
  Boolean(window.Cookiebot?.hasResponse) || Boolean(document.getElementById(DIALOG_ID));

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

export const COOKIEBOT_ID = import.meta.env.VITE_COOKIEBOT_ID as string | undefined;

/** True when Cookiebot is configured and therefore owns consent. */
export const cookiebotEnabled = Boolean(COOKIEBOT_ID);

const SCRIPT_ID = "Cookiebot";

/** Mirror Cookiebot's statistics consent onto PostHog. */
const syncConsent = () => {
  if (!POSTHOG_KEY) return;
  if (window.Cookiebot?.consent?.statistics) {
    phOptIn();
  } else {
    phOptOut();
  }
};

/**
 * Inject the Cookiebot script and keep PostHog in sync with it. No-op without
 * a configured id - the built-in banner takes over in that case.
 */
export function loadCookiebot() {
  if (!COOKIEBOT_ID || typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;

  // Cookiebot fires these on the window once its dialog resolves.
  window.addEventListener("CookiebotOnConsentReady", syncConsent);
  window.addEventListener("CookiebotOnAccept", syncConsent);
  window.addEventListener("CookiebotOnDecline", syncConsent);

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "https://consent.cookiebot.com/uc.js";
  script.type = "text/javascript";
  script.async = true;
  script.setAttribute("data-cbid", COOKIEBOT_ID);
  // "auto" lets Cookiebot block third-party scripts we did not gate ourselves.
  script.setAttribute("data-blockingmode", "auto");
  // The domain group's default language is English; the site is German-only, so
  // pin the dialog to German instead of showing "Allow all" to Austrian visitors.
  script.setAttribute("data-culture", "DE");
  document.head.appendChild(script);
}

/** Reopen the Cookiebot dialog so a stored choice can be changed. */
export function renewCookiebotConsent() {
  window.Cookiebot?.renew?.();
}
