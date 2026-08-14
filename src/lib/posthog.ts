import type { PostHog } from "posthog-js";

// Nutriful PostHog project (EU Cloud). Consent-gated: posthog-js is only
// downloaded and initialised after the user accepts the cookie banner.
// The key comes from the environment; without it everything stays a no-op.
export const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
export const POSTHOG_HOST = "https://eu.i.posthog.com";

let instance: PostHog | null = null;

/** Lazy-load PostHog + start capturing. Called only when consent is granted. */
export async function phOptIn() {
  if (typeof window === "undefined" || !POSTHOG_KEY) return;
  if (instance) {
    instance.opt_in_capturing();
    return;
  }
  const { default: posthog } = await import("posthog-js");
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    // "history_change" also captures client-side route changes.
    capture_pageview: "history_change",
    capture_pageleave: true,
    autocapture: true,
  });
  instance = posthog;
}

/** Stop capturing (if PostHog was loaded). */
export function phOptOut() {
  instance?.opt_out_capturing();
}

/** Capture a custom event (no-op until PostHog is loaded/consented). */
export function phCapture(event: string, props?: Record<string, unknown>) {
  instance?.capture(event, props);
}
