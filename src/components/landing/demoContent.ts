import type { Lang } from "@/i18n";
import * as de from "./demoData";
import * as en from "./demoData.en";

/** The demo's fictional content in the active language. Same shapes both ways. */
export const demoContent = (lang: Lang) => (lang === "en" ? en : de);
