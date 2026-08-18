import { useEffect } from "react";
import { useLang } from "./index";

/** Keeps <html lang> in step with the route - screen readers and search engines read it. */
const HtmlLang = () => {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
};

export default HtmlLang;
