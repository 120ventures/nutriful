import { Link } from "react-router-dom";
import Logo from "@/components/landing/Logo";
import ConsentSettingsLink from "@/components/landing/ConsentSettingsLink";
import CookieDeclaration from "@/components/landing/CookieDeclaration";
import { ArrowLeft } from "lucide-react";
import { legalDocs, type LegalDocId } from "@/content/legalDocs";

const Legal = ({ doc }: { doc: LegalDocId }) => {
  const d = legalDocs[doc];
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">{d.title}</h1>
        <p className="mt-3 text-sm font-light text-muted-foreground">{d.updated}</p>

        {d.intro && (
          <p className="mt-8 font-light leading-relaxed text-muted-foreground text-pretty">
            {d.intro}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-medium">{s.h}</h2>
              {s.p?.map((para, i) => (
                <p
                  key={i}
                  className="mt-2 font-light leading-relaxed text-muted-foreground text-pretty"
                >
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((li, i) => (
                    <li
                      key={i}
                      className="flex gap-3 font-light leading-relaxed text-muted-foreground text-pretty"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {doc === "datenschutz" && <CookieDeclaration />}

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/70 pt-8 text-sm [&_a]:inline-block [&_a]:py-1.5 [&_button]:py-1.5">
          <Link to="/impressum" className="font-medium hover:text-primary">
            Impressum
          </Link>
          <Link to="/datenschutz" className="font-medium hover:text-primary">
            Datenschutz
          </Link>
          <Link to="/agb" className="font-medium hover:text-primary">
            AGB
          </Link>
          <ConsentSettingsLink className="font-medium hover:text-primary" />
        </div>
      </main>
    </div>
  );
};

export default Legal;
