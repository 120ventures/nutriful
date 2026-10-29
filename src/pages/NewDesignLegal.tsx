import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { localePath, useLang } from "@/i18n"
import { newDesignCopy } from "@/i18n/newDesignCopy"
import { legalDocs, type LegalDocId } from "@/content/legalDocs"
import { COOKIEBOT_ID, cookiebotEnabled } from "@/lib/cookiebot"
import { DesignFooter, SiteHeader } from "@/pages/NewDesign"
import "@/styles/new-design.css"

function CookieTable() {
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
      <h2>Eingesetzte Cookies im Detail</h2>
      <p>
        Diese Übersicht wird von Cookiebot automatisch erzeugt und bei jedem Scan der Website
        aktualisiert.
      </p>
      <div ref={host} />
    </section>
  )
}

export default function NewDesignLegal({ doc }: { doc: Exclude<LegalDocId, "agb"> }) {
  const lang = useLang()
  const t = newDesignCopy(lang)
  const page = legalDocs[doc]
  const home = localePath("/design", lang)

  return (
    <div className="new-design">
      <SiteHeader lang={lang} page="legal" path={`/design/${doc}`} />
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
            {section.p?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {doc === "datenschutz" && <CookieTable />}
      </main>
      <DesignFooter />
    </div>
  )
}
