import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_REOPEN_EVENT, getStoredConsent, storeConsent } from "@/lib/consent";
import { cookiebotEnabled, cookiebotIsWorking } from "@/lib/cookiebot";
import { phOptIn, phOptOut, POSTHOG_KEY } from "@/lib/posthog";

/**
 * How much of the bottom edge the banner covers, published as --consent-h.
 * Pages can anchor content above it with that value.
 */
const setConsentHeight = (px: number) =>
  document.documentElement.style.setProperty("--consent-h", `${px}px`);

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setConsentHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      setConsentHeight(0);
    };
  }, [visible]);

  useEffect(() => {
    // Without a PostHog key there is nothing to consent to - no banner.
    if (!POSTHOG_KEY) return;

    const ownBanner = () => {
      const choice = getStoredConsent();
      if (choice === "granted") {
        phOptIn();
      } else if (choice === null) {
        setVisible(true);
      }
    };

    if (!cookiebotEnabled) {
      ownBanner();
      return;
    }

    // Cookiebot normally runs the dialog and drives PostHog. On a domain that is
    // not registered in its domain group it loads but shows nothing at all, so
    // give it a moment and take over if no dialog materialised - better our own
    // banner than a page collecting consent through no dialog whatsoever.
    let settled = false;
    const settle = () => {
      settled = true;
    };
    window.addEventListener("CookiebotOnDialogDisplay", settle);
    window.addEventListener("CookiebotOnConsentReady", settle);

    const timer = window.setTimeout(() => {
      if (!settled && !cookiebotIsWorking()) ownBanner();
    }, 6000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("CookiebotOnDialogDisplay", settle);
      window.removeEventListener("CookiebotOnConsentReady", settle);
    };
  }, []);

  useEffect(() => {
    // "Cookie-Einstellungen" in the footer brings the banner back so a choice
    // can be revised - including withdrawing a consent that was given earlier.
    // Stays wired up even with Cookiebot configured, because the footer falls
    // back to this banner whenever Cookiebot is not actually running.
    if (!POSTHOG_KEY) return;
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    window.dispatchEvent(new Event("nutriful:consent-decided"));
  };

  const accept = () => {
    phOptIn();
    storeConsent("granted");
    dismiss();
  };

  const decline = () => {
    phOptOut();
    storeConsent("denied");
    dismiss();
  };

  return (
    <div ref={boxRef} className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-light leading-relaxed text-muted-foreground">
          Wir nutzen nur mit Ihrer Zustimmung Analyse-Cookies von PostHog (EU-Hosting), um zu
          verstehen, wie die Website genutzt wird. Ohne Zustimmung wird nichts gesetzt.{" "}
          <Link to="/datenschutz" className="font-medium text-foreground underline hover:text-primary">
            Mehr im Datenschutz
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
