import { useEffect, useRef } from "react";
import { COOKIEBOT_ID, cookiebotEnabled } from "@/lib/cookiebot";

/**
 * Cookiebot's auto-generated cookie table for the Datenschutz page. It lists
 * every cookie found on the last domain scan, so it stays correct without us
 * maintaining the list by hand. Renders nothing when Cookiebot is not set up.
 */
const CookieDeclaration = () => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!cookiebotEnabled || !el || el.querySelector("script")) return;
    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = `https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`;
    script.type = "text/javascript";
    script.async = true;
    el.appendChild(script);
  }, []);

  if (!cookiebotEnabled) return null;

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-medium">Eingesetzte Cookies im Detail</h2>
      <p className="mt-2 font-light leading-relaxed text-muted-foreground text-pretty">
        Diese Übersicht wird von Cookiebot automatisch erzeugt und bei jedem Scan der Website
        aktualisiert.
      </p>
      <div ref={host} className="mt-4 text-sm font-light [&_a]:underline" />
    </section>
  );
};

export default CookieDeclaration;
