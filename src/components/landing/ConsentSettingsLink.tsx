import { reopenConsent } from "@/lib/consent";
import { POSTHOG_KEY } from "@/lib/posthog";

/**
 * Footer entry that brings the cookie banner back. Hidden when no analytics
 * key is configured - there is nothing to consent to in that case.
 */
const ConsentSettingsLink = ({ className = "hover:text-foreground" }: { className?: string }) => {
  if (!POSTHOG_KEY) return null;

  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Cookie-Einstellungen
    </button>
  );
};

export default ConsentSettingsLink;
