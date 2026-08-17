import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/landing/Logo";
import ConsentSettingsLink from "@/components/landing/ConsentSettingsLink";
import DemoDashboard from "@/components/landing/DemoDashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { insertSignup } from "@/lib/signups";
import { phCapture } from "@/lib/posthog";
import { useSectionView } from "@/hooks/use-section-view";
import {
  MessageCircle,
  ClipboardList,
  LineChart,
  CalendarCheck,
  ShieldCheck,
  Sprout,
  ArrowRight,
  PlayCircle,
  Check,
} from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    title: "Verstreute Daten",
    text: "Essens-Fotos per WhatsApp, Fragen per E-Mail, Ernährungstagebuch auf Papier - die Woche Ihrer Klient:innen liegt in fünf verschiedenen Kanälen.",
  },
  {
    icon: ClipboardList,
    title: "Zusammensuchen vor jedem Termin",
    text: "Bevor die Beratung beginnt, geht Zeit dafür drauf, Nachrichten, Fotos und Notizen zu einem Bild zusammenzupuzzeln.",
  },
  {
    icon: CalendarCheck,
    title: "Abbrüche zwischen den Terminen",
    text: "Ernährungsumstellungen scheitern selten am Plan - sondern an den drei Wochen Alltag zwischen zwei Terminen, in denen niemand hinschaut.",
  },
];

const heroProof = [
  "Spart die Vorbereitung vor jedem Termin",
  "Keine Zettelwirtschaft",
  "Alles einheitlich dokumentiert",
];

const pillars = [
  {
    icon: MessageCircle,
    title: "Kommunikation",
    text: "Rückfragen zwischen den Terminen laufen über Nutriful statt über Ihre private Nummer - mit dem Verlauf der Klient:in direkt daneben, statt aus dem Gedächtnis.",
  },
  {
    icon: ClipboardList,
    title: "Ernährungspläne",
    text: "Pläne aus Bausteinen zusammenstellen - nach Mahlzeit, Zutat und Ernährungsform. Einmal gebaut, bei der nächsten Klient:in wiederverwendbar.",
  },
  {
    icon: LineChart,
    title: "Fortschritt",
    text: "Mahlzeiten, Fotos und Notizen laufen automatisch in einen Verlauf. Vor dem Termin sehen Sie Auffälligkeiten und offene Fragen auf einen Blick.",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Schluss mit Zettelwirtschaft",
    text: "Ernährungstagebuch auf Papier, Fotos per WhatsApp, Notizen im Kalender - in Nutriful läuft alles in einem Verlauf zusammen. Einheitlich erfasst, ohne Abtippen und ohne dass unterwegs etwas verloren geht.",
  },
  {
    icon: CalendarCheck,
    title: "Vorbereitung, die schon erledigt ist",
    text: "Was Ihre Klient:innen im Alltag erfassen, ist beim nächsten Termin bereits aufbereitet. Sie starten mit Verlauf und Auffälligkeiten vor sich, statt vorher Nachrichten zu durchsuchen.",
  },
  {
    icon: LineChart,
    title: "Jede Klient:in gleich dokumentiert",
    text: "Alle Programme folgen derselben Struktur - Sie vergleichen Verläufe, ohne sich in jede Klient:in neu hineinzudenken, und die Dokumentation ist ohne Nacharbeit vollständig.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere Daten",
    text: "Verschlüsselte Übertragung, sichere Speicherung, Löschung jederzeit - Vertrauen ist die Basis Ihrer Klientenbeziehung, auch digital.",
  },
];

const demoHighlights = [
  "Termin-Briefing",
  "Verlauf pro Tag",
  "Chat mit Klient:innen",
  "Plan-Baukasten",
];

const steps = [
  {
    step: "1",
    title: "Klient:in einladen",
    text: "Sie laden Ihre Klient:in mit einem Link in Nutriful ein - keine Installation auf Ihrer Seite nötig.",
  },
  {
    step: "2",
    title: "Klient:in trackt im Alltag",
    text: "Mahlzeiten, Fotos und Notizen werden im Programm erfasst - motivierend aufbereitet, damit drangeblieben wird.",
  },
  {
    step: "3",
    title: "Sie sehen alles gebündelt",
    text: "Verlauf, Auffälligkeiten und offene Fragen an einem Ort - Ihre Beratung startet vorbereitet statt mit Detektivarbeit.",
  },
];

const faqs = [
  {
    q: "Ersetzt Nutriful meine Beratung?",
    a: "Nein - Nutriful ist Ihr Werkzeug, kein Ersatz. Die fachliche Führung, die Interpretation und die Beziehung zur Klient:in bleiben bei Ihnen. Nutriful übernimmt die Strecke zwischen den Terminen.",
  },
  {
    q: "Wie läuft die Pilot-Partnerschaft ab?",
    a: "Im Pilot testen Sie Nutriful mit echten Klient:innen und wir bauen das Tool nach Ihrem Feedback. Was danach kommt, besprechen wir persönlich - im Erstgespräch klären wir Umfang und Konditionen gemeinsam.",
  },
  {
    q: "Was müssen meine Klient:innen tun?",
    a: "Einladungslink öffnen, loslegen. Das Programm ist so gebaut, dass Tracken in unter zwei Minuten pro Tag machbar ist - je einfacher, desto höher die Durchhaltequote.",
  },
  {
    q: "Wie sicher sind die Daten?",
    a: "Alle Daten werden verschlüsselt übertragen und sicher gespeichert. Löschung ist jederzeit möglich. Details regeln wir transparent in der Pilot-Vereinbarung.",
  },
];

const chaosChips = [
  { label: "WhatsApp, 22:41", rotate: "-rotate-2" },
  { label: "Foto per E-Mail", rotate: "rotate-1" },
  { label: "Papier-Tagebuch", rotate: "-rotate-1" },
  { label: "3 Tage Funkstille", rotate: "rotate-2" },
  { label: "„Zählt das als Snack?“", rotate: "-rotate-2" },
];

const GapVisual = () => (
  <div className="mt-10 rounded-3xl border border-border/70 bg-card p-8 sm:p-10">
    {/* Heute */}
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Heute</p>
    <div className="mt-5 flex flex-wrap justify-center gap-2">
      {chaosChips.map((c) => (
        <span
          key={c.label}
          className={`inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-light text-muted-foreground ${c.rotate}`}
        >
          {c.label}
        </span>
      ))}
    </div>
    <div className="mt-5 flex items-center">
      <span className="h-4 w-4 shrink-0 rounded-full bg-foreground/40" />
      <div className="flex-1 border-t-2 border-dashed border-border" />
      <span className="h-4 w-4 shrink-0 rounded-full bg-foreground/40" />
    </div>
    <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
      <span>Termin 1</span>
      <span>Termin 2</span>
    </div>
    <p className="mt-3 text-center text-sm font-light text-muted-foreground text-pretty">
      3 Wochen Alltag - Daten in fünf Kanälen und Lücken, die niemand sieht
    </p>

    <div className="my-8 border-t border-border/70" />

    {/* Mit Nutriful */}
    <div className="rounded-2xl bg-secondary/10 p-6 ring-1 ring-secondary/25 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">Mit Nutriful</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block rounded-full bg-secondary px-5 py-2 text-xs font-medium text-white shadow-sm">
          Ein Ort: Programm, Tracking & Chat
        </span>
      </div>
      <div className="mt-6 flex items-center">
        <span className="h-5 w-5 shrink-0 rounded-full bg-secondary ring-4 ring-secondary/20" />
        <div className="h-1 flex-1 rounded bg-secondary" />
        <span className="h-5 w-5 shrink-0 rounded-full bg-secondary ring-4 ring-secondary/20" />
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium">
        <span>Termin 1</span>
        <span>Termin 2</span>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-medium text-pretty">
        <Check className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2.4} />
        Durchgehender Verlauf - Sie sehen alles, bevor der Termin beginnt
      </p>
    </div>
  </div>
);

const PartnerForm = ({ compact = false }: { compact?: boolean }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  /** First keystroke in the form - the step between "saw it" and "sent it". */
  const markStart = () => {
    if (started.current) return;
    started.current = true;
    phCapture("form_start", { source: "partner-page" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setSubmitting(true);
    const { error } = await insertSignup({
      email: email.trim().toLowerCase(),
      name: name.trim() || null,
      source: "partner-page",
      consent: true,
      onboarding: { type: "partner" },
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
    setSubmitting(false);
    if (error && error.code !== "23505") {
      console.error("Partner signup failed:", error);
      toast.error("Da ist etwas schiefgelaufen. Bitte versuchen Sie es gleich nochmal.");
      return;
    }
    phCapture("partner_signup", { source: "partner-page" });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-5 py-4 text-left">
        <p className="font-medium text-foreground">Danke für Ihr Interesse! 🌱</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Wir melden uns innerhalb weniger Tage persönlich bei Ihnen, um ein kurzes Erstgespräch zu
          vereinbaren.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      <div className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : ""}`}>
        <Input
          type="text"
          placeholder="Ihr Name"
          value={name}
          onChange={(e) => {
            markStart();
            setName(e.target.value);
          }}
          aria-label="Name"
          className="h-12 rounded-xl border-border bg-card text-base"
        />
        <Input
          type="email"
          inputMode="email"
          placeholder="ihre@praxis.at"
          value={email}
          onChange={(e) => {
            markStart();
            setEmail(e.target.value);
          }}
          aria-label="Email"
          className="h-12 rounded-xl border-border bg-card text-base"
        />
        <Button
          type="submit"
          disabled={submitting}
          className="h-12 shrink-0 rounded-xl px-6 text-base font-medium"
        >
          {submitting ? "Moment ..." : "Erstgespräch anfragen"}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Mit dem Absenden stimmen Sie zu, dass wir Sie zum Pilotprogramm kontaktieren. Ihre Daten
        werden verschlüsselt übertragen und sicher gespeichert.
      </p>
    </form>
  );
};

const Partner = () => {
  const { hash } = useLocation();
  const demoRef = useSectionView<HTMLElement>("demo");
  const pilotRef = useSectionView<HTMLElement>("pilot");
  const faqRef = useSectionView<HTMLElement>("faq");

  useEffect(() => {
    // React renders after the browser would have handled the anchor, so arriving
    // at /#pilot from another route needs the scroll done by hand.
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* Nav */}
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-5">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/demo"
              onClick={() => phCapture("cta_click", { location: "header_demo" })}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
            >
              <PlayCircle className="h-4 w-4" /> Demo
              <span className="hidden sm:inline">ansehen</span>
            </Link>
            <a
              href="#pilot"
              onClick={() => phCapture("cta_click", { location: "header" })}
              className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:block"
            >
              Pilot-Partner:in werden
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
          Für Diätolog:innen & Ernährungsberater:innen
        </p>
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.1] tracking-tight text-balance sm:text-5xl">
          Ihre Klient:innen. Ein Ort. Alles im Blick.
        </h1>
        <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          Kommunikation, Ernährungspläne und der Fortschritt Ihrer Klient:innen - alles an einem
          Ort.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#pilot"
            onClick={() => phCapture("cta_click", { location: "hero" })}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pilot-Partner:in werden <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/demo"
            onClick={() => phCapture("cta_click", { location: "hero_demo" })}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            <PlayCircle className="h-4 w-4" /> Demo ausprobieren
          </Link>
        </div>
        <ul className="mt-8 space-y-2 text-sm font-light text-muted-foreground">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2.4} />
              {item}
            </li>
          ))}
        </ul>
        </div>

        <div className="overflow-hidden rounded-3xl">
          <img
            src="/hero-header.jpg"
            alt="Frau sitzt auf dem Sofa und isst eine Schale Porridge"
            width={1600}
            height={1067}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      {/* Value proposition */}
      <section className="border-y border-border/70 bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Drei Dinge, die Nutriful für Sie übernimmt
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-3xl bg-muted/40 p-8">
                <p.icon className="h-6 w-6 text-secondary" strokeWidth={1.8} />
                <p className="mt-4 font-display text-xl font-medium">{p.title}</p>
                <p className="mt-3 font-light leading-relaxed text-muted-foreground text-pretty">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Die Beratung ist stark. Die Strecke dazwischen nicht.
          </h2>
          <p className="mt-4 max-w-2xl font-light text-muted-foreground text-pretty">
            Zwischen zwei Terminen passiert das, was über Erfolg oder Abbruch entscheidet - und
            genau dort ist heute am wenigsten Struktur.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pains.map((p) => (
              <div key={p.title} className="rounded-3xl border border-border/70 bg-card p-8">
                <p.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
                <p className="mt-4 font-display text-xl font-medium">{p.title}</p>
                <p className="mt-3 font-light leading-relaxed text-muted-foreground text-pretty">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
          <GapVisual />
        </div>
      </section>

      {/* Full-bleed image */}
      <section className="relative h-[52svh] min-h-[340px] w-full overflow-hidden">
        <img
          src="/hero-alltag.jpg"
          alt="Junge Frau isst lachend eine Mandarinenspalte"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-6">
          <h2 className="max-w-xl font-display text-3xl font-normal leading-[1.1] tracking-tight text-white text-balance sm:text-4xl">
            Zwischen zwei Terminen lebt Ihre Klient:in weiter
          </h2>
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-white/90 text-pretty">
            Jede Mahlzeit, jede Frage, jeder Ausrutscher passiert im Alltag - nicht in Ihrer Praxis.
            Nutriful holt genau das zu Ihnen, ohne dass Sie hinterhertelefonieren müssen.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="so-funktionierts" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
          So funktioniert Nutriful in Ihrer Praxis
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="rounded-3xl border border-border/70 bg-card p-8">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 font-display text-lg font-medium text-secondary">
                {s.step}
              </span>
              <p className="mt-4 font-display text-xl font-medium">{s.title}</p>
              <p className="mt-3 font-light leading-relaxed text-muted-foreground text-pretty">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section ref={demoRef} className="border-y border-border/70 bg-secondary/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
            Interaktive Demo
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Klicken Sie sich durch, bevor Sie sich entscheiden
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
            Drei Beispiel-Klient:innen, echte Bedienung - ohne Login, ohne Anmeldung.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {demoHighlights.map((h) => (
              <span
                key={h}
                className="rounded-full bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border"
              >
                {h}
              </span>
            ))}
          </div>
          <DemoDashboard />
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Was das in Ihrem Alltag bedeutet
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border/70 bg-card p-8">
                <f.icon className="h-6 w-6 text-secondary" strokeWidth={1.8} />
                <p className="mt-4 font-display text-xl font-medium">{f.title}</p>
                <p className="mt-3 font-light leading-relaxed text-muted-foreground text-pretty">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section
        id="pilot"
        ref={pilotRef}
        className="mx-auto max-w-3xl scroll-mt-8 px-6 py-20 text-center sm:py-28"
      >
        <Sprout className="mx-auto h-8 w-8 text-secondary" strokeWidth={1.8} />
        <h2 className="mt-5 font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
          Wir bauen Nutriful gemeinsam mit Ihnen
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          Nutriful entsteht gerade in Österreich - gemeinsam mit einer kleinen Gruppe von
          Diätolog:innen und Ernährungsberater:innen, die das Tool mit echten Klient:innen testen
          und mitgestalten - ehrlich im Austausch, mit direktem Draht zu uns.
        </p>
        <div className="mx-auto mt-10 max-w-xl">
          <PartnerForm />
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Häufige Fragen
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border/70 bg-card p-6">
                <p className="font-medium">{f.q}</p>
                <p className="mt-2 font-light leading-relaxed text-muted-foreground text-pretty">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Logo />
          <p className="mt-3 max-w-md text-sm font-light text-muted-foreground">
            Nutriful ist ein Werkzeug zur Begleitung von Ernährungsberatung und ersetzt keine
            medizinische Diagnose oder Behandlung.
          </p>
          <div className="mt-4 flex gap-x-5 gap-y-1 text-sm [&_a]:inline-block [&_a]:py-1.5 [&_button]:py-1.5 font-light text-muted-foreground">
            <Link to="/impressum" className="hover:text-foreground">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-foreground">
              Datenschutz
            </Link>
            <ConsentSettingsLink />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Partner;
