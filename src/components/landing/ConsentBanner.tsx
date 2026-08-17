import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_REOPEN_EVENT, getStoredConsent, storeConsent } from "@/lib/consent";
import { cookiebotEnabled } from "@/lib/cookiebot";
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
    // Cookiebot runs the dialog and drives PostHog when it is configured.
    if (cookiebotEnabled) return;
    const choice = getStoredConsent();
    if (choice === "granted") {
      phOptIn();
    } else if (choice === null) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    // "Cookie-Einstellungen" in the footer brings the banner back so a choice
    // can be revised - including withdrawing a consent that was given earlier.
    if (!POSTHOG_KEY || cookiebotEnabled) return;
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
