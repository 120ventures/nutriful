import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { localePath, useLang } from "@/i18n"
import { newDesignCopy } from "@/i18n/newDesignCopy"
import { legalDocs, type LegalDocId } from "@/content/legalDocs"
import { legalDocsEn } from "@/content/legalDocs.en"
import { COOKIEBOT_ID, cookiebotEnabled } from "@/lib/cookiebot"
import { DesignFooter, SiteHeader } from "@/pages/NewDesign"
import "@/styles/new-design.css"

const photoCredits = [
  {
    href: "https://unsplash.com/photos/macro-photography-of-raspberry-fruits-t0A2NCMhXRQ",
    name: "Zach Inglis",
    site: "Unsplash",
  },
  {
    href: "https://unsplash.com/photos/sliced-orange-fruit-on-white-ceramic-plate-pCjw_ygKCv0",
    name: "Vino Li",
    site: "Unsplash",
  },
  {
    href: "https://www.istockphoto.com/photo/young-woman-with-curly-hair-eating-a-slice-of-tangerine-with-closed-eyes-gm2206546844-623854363",
    name: "Dimensions",
    site: "iStock",
  },
]

function PhotoCredit({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function CookieTable({ lang }: { lang: "de" | "en" }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!cookiebotEnabled || !el || el.querySelector("script")) return
    const script = document.createElement("script")
    script.id = "CookieDeclaration"
    script.src = `https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`
    script.async = true
    el.appendChild(script)
  }, [])

  if (!cookiebotEnabled) return null

  return (
    <section className="legal-cookies">
      <h2>{lang === "en" ? "Cookies in detail" : "Eingesetzte Cookies im Detail"}</h2>
      <p>
        {lang === "en"
          ? "This overview is generated automatically by Cookiebot and updated whenever the website is scanned."
          : "Diese Übersicht wird von Cookiebot automatisch erzeugt und bei jedem Scan der Website aktualisiert."}
      </p>
      <div ref={host} />
    </section>
  )
}

export default function NewDesignLegal({ doc }: { doc: Exclude<LegalDocId, "agb"> }) {
  const lang = useLang()
  const t = newDesignCopy(lang)
  const page = lang === "en" ? legalDocsEn[doc] : legalDocs[doc]
  const on = lang === "en" ? " on " : " auf "
  const home = localePath("/", lang)

  return (
    <div className="new-design">
      <SiteHeader lang={lang} page="legal" path={`/${doc}`} />
      <main className="legal-page">
        <Link className="legal-back" to={home}>
          ← {t.backHome}
        </Link>
        <p className="legal-updated">{page.updated}</p>
        <h1>{page.title}</h1>
        {page.intro && <p className="legal-intro">{page.intro}</p>}
        {page.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p
              ?.filter((paragraph) => !(doc === "impressum" && paragraph.startsWith("Fotografie:")))
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            {doc === "impressum" && (section.h === "Urheberrecht" || section.h === "Copyright") && (
              <p>
                {lang === "en" ? "Photography: " : "Fotografie: "}{photoCredits.map((photo, index) => {
                  const separator = index === 0 ? "" : index === photoCredits.length - 1 ? (lang === "en" ? " and " : " und ") : ", "
                  const note = index === photoCredits.length - 1
                    ? lang === "en"
                      ? " (stock photo ID 2206546844), licensed."
                      : " (Stock-Foto-ID 2206546844), lizenziert."
                    : ""
                  return (
                    <span key={photo.href}>{separator}<PhotoCredit href={photo.href}>{photo.name}</PhotoCredit>{on}<PhotoCredit href={photo.href}>{photo.site}</PhotoCredit>{note}</span>
                  )
                })}
              </p>
            )}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {doc === "datenschutz" && <CookieTable lang={lang} />}
      </main>
      <DesignFooter />
    </div>
  )
}
