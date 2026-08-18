import { Link, useLocation } from "react-router-dom";
import { Languages } from "lucide-react";
import { localePath, stripLocale, useLang } from "@/i18n";
import { copy } from "@/i18n/copy";

/** Switches to the other language and stays on the same page. */
const LangSwitch = ({ className = "" }: { className?: string }) => {
  const lang = useLang();
  const { pathname } = useLocation();
  const other = lang === "en" ? "de" : "en";

  return (
    <Link
      to={localePath(stripLocale(pathname), other)}
      hrefLang={other}
      className={`inline-flex items-center gap-1.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      <Languages className="h-4 w-4" />
      {copy(lang).landing.langSwitch}
    </Link>
  );
};

export default LangSwitch;
