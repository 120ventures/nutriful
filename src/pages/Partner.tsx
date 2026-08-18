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
import { localePath, useLang } from "@/i18n";
import { copy } from "@/i18n/copy";
import { landingContent } from "@/i18n/landingContent";
import LangSwitch from "@/components/landing/LangSwitch";
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









const GapVisual = () => {
  const t = copy(useLang()).landing;
  const { chaosChips } = landingContent(useLang());
  return (
  <div className="mt-10 rounded-3xl border border-border/70 bg-card p-8 sm:p-10">
    {/* Heute */}
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{t.todayLabel}</p>
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
      <span>{t.appt1}</span>
      <span>{t.appt2}</span>
    </div>
    <p className="mt-3 text-center text-sm font-light text-muted-foreground text-pretty">
      {t.gapNow}
    </p>

    <div className="my-8 border-t border-border/70" />

    {/* Mit Nutriful */}
    <div className="rounded-2xl bg-secondary/10 p-6 ring-1 ring-secondary/25 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">{t.withLabel}</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block rounded-full bg-secondary px-5 py-2 text-xs font-medium text-white shadow-sm">
          {t.gapOnePlace}
        </span>
      </div>
      <div className="mt-6 flex items-center">
        <span className="h-5 w-5 shrink-0 rounded-full bg-secondary ring-4 ring-secondary/20" />
        <div className="h-1 flex-1 rounded bg-secondary" />
        <span className="h-5 w-5 shrink-0 rounded-full bg-secondary ring-4 ring-secondary/20" />
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium">
        <span>{t.appt1}</span>
        <span>{t.appt2}</span>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-medium text-pretty">
        <Check className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2.4} />
        {t.gapWith}
      </p>
    </div>
  </div>
  );
};

const PartnerForm = ({ compact = false }: { compact?: boolean }) => {
  const t = copy(useLang()).landing;
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
      toast.error(t.formInvalid);
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
      toast.error(t.formError);
      return;
    }
    phCapture("partner_signup", { source: "partner-page" });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-5 py-4 text-left">
        <p className="font-medium text-foreground">{t.formDoneTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.formDoneText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      <div className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : ""}`}>
        <Input
          type="text"
          placeholder={t.formName}
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
          placeholder={t.formEmail}
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
          {submitting ? t.formSubmitting : t.formSubmit}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t.formConsent}
      </p>
    </form>
  );
};

const Partner = () => {
  const lang = useLang();
  const t = copy(lang).landing;
  const { pains, heroProof, pillars, features, steps, faqs, demoHighlights } =
    landingContent(lang);
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
          <Link to={localePath("/", lang)} className="shrink-0">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch className="hidden sm:inline-flex" />
            <Link
              to={localePath("/demo", lang)}
              onClick={() => phCapture("cta_click", { location: "header_demo" })}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
            >
              <PlayCircle className="h-4 w-4" /> {t.navDemo}
              {t.navDemoLong && <span className="hidden sm:inline">{t.navDemoLong}</span>}
            </Link>
            <a
              href="#pilot"
              onClick={() => phCapture("cta_click", { location: "header" })}
              className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:block"
            >
              {t.ctaPilot}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
          {t.eyebrow}
        </p>
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.1] tracking-tight text-balance sm:text-5xl">
          {t.h1}
        </h1>
        <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          {t.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#pilot"
            onClick={() => phCapture("cta_click", { location: "hero" })}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.ctaPilot} <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to={localePath("/demo", lang)}
            onClick={() => phCapture("cta_click", { location: "hero_demo" })}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            <PlayCircle className="h-4 w-4" /> {t.ctaDemo}
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
            alt={t.heroImageAlt}
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
            {t.pillarsTitle}
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
            {t.painTitle}
          </h2>
          <p className="mt-4 max-w-2xl font-light text-muted-foreground text-pretty">
            {t.painLead}
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
          alt={t.bandImageAlt}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-6">
          <h2 className="max-w-xl font-display text-3xl font-normal leading-[1.1] tracking-tight text-white text-balance sm:text-4xl">
            {t.bandTitle}
          </h2>
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-white/90 text-pretty">
            {t.bandText}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="so-funktionierts" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
          {t.stepsTitle}
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
            {copy(lang).demoPage.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            {t.demoSectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
            {t.demoSectionLead}
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
            {t.featuresTitle}
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
          {t.pilotTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          {t.pilotText}
        </p>
        <div className="mx-auto mt-10 max-w-xl">
          <PartnerForm />
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl">
            {t.faqTitle}
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
            {t.footerDisclaimer}
          </p>
          {lang === "en" && (
            <p className="mt-2 max-w-md text-xs font-light text-muted-foreground">
              {t.legalNote}
            </p>
          )}
          <div className="mt-4 flex gap-x-5 gap-y-1 text-sm [&_a]:inline-block [&_a]:py-1.5 [&_button]:py-1.5 font-light text-muted-foreground">
            <Link to="/impressum" className="hover:text-foreground">
              {t.imprint}
            </Link>
            <Link to="/datenschutz" className="hover:text-foreground">
              {t.privacy}
            </Link>
            <ConsentSettingsLink />
            <LangSwitch />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Partner;
