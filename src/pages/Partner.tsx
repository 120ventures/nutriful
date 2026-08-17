import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const features = [
  {
    icon: ClipboardList,
    title: "Ihre Programme, strukturiert",
    text: "Wochenpläne und Aufgaben für jedes Beratungsziel - Ernährungsumstellung, Gewichtsmanagement, Sport oder Intoleranzen. Sie definieren die Inhalte, Nutriful führt Ihre Klient:innen durch.",
  },
  {
    icon: LineChart,
    title: "Einheitliches Tracking",
    text: "Mahlzeiten, Fotos und Notizen landen an einem Ort statt in fünf Kanälen. Vor dem Termin sehen Sie den Verlauf auf einen Blick - ohne Zusammensuchen.",
  },
  {
    icon: MessageCircle,
    title: "Chat & Check-ins",
    text: "Kurze Fragen zwischen den Terminen laufen über Nutriful statt über Ihre private WhatsApp-Nummer - mit dem Verlauf der Klient:in direkt daneben.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere Daten",
    text: "Verschlüsselte Übertragung, sichere Speicherung, Löschung jederzeit - Vertrauen ist die Basis Ihrer Klientenbeziehung, auch digital.",
  },
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
    q: "Was kostet die Pilot-Partnerschaft?",
    a: "Der Pilot ist kostenlos. Sie testen Nutriful mit echten Klient:innen, wir bauen das Tool nach Ihrem Feedback. Danach kostet Nutriful 49 EUR pro Monat für bis zu 10 aktive Klient:innen - monatlich kündbar. Für größere Praxen und Teams erstellen wir ein individuelles Angebot.",
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
      source: "partner-page",
      consent: true,
      onboarding: { type: "partner", name: name.trim() },
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
  const demoRef = useSectionView<HTMLElement>("demo");
  const pricingRef = useSectionView<HTMLElement>("pricing");
  const pilotRef = useSectionView<HTMLElement>("pilot");
  const faqRef = useSectionView<HTMLElement>("faq");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* Nav */}
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/">
            <Logo />
          </Link>
          <a
            href="#pilot"
            onClick={() => phCapture("cta_click", { location: "header" })}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pilot-Partner:in werden
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
          Für Diätolog:innen & Ernährungsberater:innen
        </p>
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.1] tracking-tight text-balance sm:text-5xl">
          Ihre Klient:innen. Ein Ort. Alles im Blick.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          Die Kommunikationsplattform für Ihre Ernährungsberatung - Ihre Programme, einheitliches
          Tracking und Chat mit Ihren Klient:innen an einem Ort. Sie sehen den Verlauf, ohne ihm
          hinterherzulaufen.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#pilot"
            onClick={() => phCapture("cta_click", { location: "hero" })}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pilot-Partner:in werden <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#so-funktionierts"
            className="rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            So funktioniert's
          </a>
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

      {/* How it works */}
      <section
        id="so-funktionierts"
        ref={demoRef}
        className="mx-auto max-w-5xl scroll-mt-8 px-6 py-16 sm:py-20"
      >
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
        <DemoDashboard />
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            Was Nutriful für Sie übernimmt
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

      {/* Pricing */}
      <section ref={pricingRef} className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
          Faire Preise für jede Praxisgröße
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-light text-muted-foreground text-pretty">
          Starten Sie kostenlos im Pilot - danach wächst Nutriful mit Ihrer Praxis. Immer kostenlos
          für Ihre Klient:innen.
        </p>
        <div className="mx-auto mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-secondary/50 bg-card p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">
              Pilot-Partnerschaft
            </p>
            <p className="mt-4 font-display text-4xl font-normal">
              0 EUR
              <span className="ml-2 text-base font-light text-muted-foreground">
                während des Pilots
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm font-light text-muted-foreground">
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Voller Funktionsumfang mit echten Klient:innen
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Persönliches Onboarding und direkter Draht zu uns
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Sie gestalten mit, was gebaut wird
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Begrenzte Plätze
              </li>
            </ul>
            <a
              href="#pilot"
              onClick={() => phCapture("cta_click", { location: "pricing_pilot" })}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Pilot-Partner:in werden
            </a>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Praxis
            </p>
            <p className="mt-4 font-display text-4xl font-normal">
              49 EUR
              <span className="ml-2 text-base font-light text-muted-foreground">/ Monat</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm font-light text-muted-foreground">
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Bis zu 10 aktive Klient:innen
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Programm, Tracking und Chat in einem
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Monatlich kündbar, keine Setup-Kosten
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Kostenlos für Ihre Klient:innen
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Praxis Plus
            </p>
            <p className="mt-4 font-display text-4xl font-normal">
              Individuell
              <span className="ml-2 text-base font-light text-muted-foreground">
                nach Gespräch
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm font-light text-muted-foreground">
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Mehr als 10 aktive Klient:innen
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Für Teams und Gruppenpraxen
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Persönliche Betreuung
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.2} />
                Angebot in einem kurzen Gespräch
              </li>
            </ul>
            <a
              href="#pilot"
              onClick={() => phCapture("cta_click", { location: "pricing_plus" })}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
            >
              Gespräch vereinbaren
            </a>
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
          und mitgestalten. Kostenlos im Pilot, ehrlich im Austausch.
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
          <div className="mt-4 flex gap-5 text-sm font-light text-muted-foreground">
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
