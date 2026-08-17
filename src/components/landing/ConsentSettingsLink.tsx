import { useEffect, useState } from "react";
import { cookiebotEnabled, cookiebotIsWorking, renewCookiebotConsent } from "@/lib/cookiebot";

/**
 * Footer entry that reopens the Cookiebot dialog, so a stored consent can be
 * changed or withdrawn as easily as it was given (Art. 7 Abs. 3 DSGVO).
 *
 * Only rendered once Cookiebot has actually shown up - a link that silently
 * does nothing would be worse than no link at all.
 */
const ConsentSettingsLink = ({ className = "hover:text-foreground" }: { className?: string }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!cookiebotEnabled) return;
    if (cookiebotIsWorking()) {
      setReady(true);
      return;
    }
    const check = () => setReady(cookiebotIsWorking());
    window.addEventListener("CookiebotOnConsentReady", check);
    window.addEventListener("CookiebotOnDialogDisplay", check);
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", check);
      window.removeEventListener("CookiebotOnDialogDisplay", check);
    };
  }, []);

  if (!ready) return null;

  return (
    <button type="button" onClick={renewCookiebotConsent} className={className}>
      Cookie-Einstellungen
    </button>
  );
};

export default ConsentSettingsLink;
