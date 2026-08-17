import { reopenConsent } from "@/lib/consent";
import { cookiebotEnabled, renewCookiebotConsent } from "@/lib/cookiebot";
import { POSTHOG_KEY } from "@/lib/posthog";

/**
 * Footer entry that brings the consent dialog back - Cookiebot's when it is
 * configured, the built-in banner otherwise. Hidden when there is nothing to
 * consent to.
 */
const ConsentSettingsLink = ({ className = "hover:text-foreground" }: { className?: string }) => {
  if (!cookiebotEnabled && !POSTHOG_KEY) return null;

  return (
    <button
      type="button"
      onClick={cookiebotEnabled ? renewCookiebotConsent : reopenConsent}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
};

export default ConsentSettingsLink;
