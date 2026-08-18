import { useLocation } from "react-router-dom";

export type Lang = "de" | "en";

/** English lives under /en; German keeps the bare paths. */
export const useLang = (): Lang => (useLocation().pathname.startsWith("/en") ? "en" : "de");

/** Prefix an internal path for the given language: ("/demo","en") -> "/en/demo". */
export const localePath = (path: string, lang: Lang) => {
  const clean = path === "/" ? "" : path;
  return lang === "en" ? `/en${clean}` : clean || "/";
};

/** Strip the /en prefix - used by the language switcher to stay on the same page. */
export const stripLocale = (pathname: string) => {
  const rest = pathname.replace(/^\/en/, "");
  return rest || "/";
};
