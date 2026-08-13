// Marketing attribution - captures where a visitor came from (Google Ads,
// TikTok Ads, organic, ...) on first visit and attaches it to the signup.
// First-touch: once stored, later visits don't overwrite it. No consent needed:
// this is first-party data the visitor carries in their own URL, stored only
// alongside the signup they actively submit.

const STORAGE_KEY = "nutriful-attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  ttclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
};

const PARAM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ttclid", "gclid"] as const;

/** Call once on app load: stores UTM/click-id params from the URL (first touch wins). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(STORAGE_KEY)) return; // first touch already stored

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {};
    for (const key of PARAM_KEYS) {
      const value = params.get(key);
      if (value) attribution[key] = value.slice(0, 200);
    }

    // Infer the channel from click ids even without explicit UTMs
    // (Google auto-tagging appends gclid, TikTok appends ttclid).
    if (!attribution.utm_source) {
      if (attribution.ttclid) attribution.utm_source = "tiktok";
      else if (attribution.gclid) attribution.utm_source = "google";
    }

    if (document.referrer) attribution.referrer = document.referrer.slice(0, 500);
    attribution.landing_page = window.location.pathname + window.location.search.slice(0, 300);
    attribution.first_seen = new Date().toISOString();

    // Nothing worth storing on a direct visit without referrer? Store anyway -
    // "direct" is a finding too, and it prevents a later paid visit from
    // overwriting the true first touch only when there was a real first touch.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* storage unavailable - attribution is best-effort */
  }
}

/** The stored first-touch attribution, or null. */
export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
