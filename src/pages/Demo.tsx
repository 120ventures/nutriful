import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import Logo from "@/components/landing/Logo";
import ConsentSettingsLink from "@/components/landing/ConsentSettingsLink";
import {
  BriefingView,
  ChatView,
  HistoryView,
  PlanView,
  ProfileView,
  TodayView,
} from "@/components/landing/DemoPanels";
import { track } from "@/lib/demoTracking";
import { demoContent } from "@/components/landing/demoContent";
import type { DemoClient } from "@/components/landing/demoData";
import { localePath, useLang } from "@/i18n";
import { copy } from "@/i18n/copy";
import LangSwitch from "@/components/landing/LangSwitch";

type TabId = "briefing" | "profil" | "verlauf" | "chat" | "plan";

const Demo = () => {
  const lang = useLang();
  const t = copy(lang).demoPage;
  const { demoClients } = demoContent(lang);
  const tabs: { id: TabId; label: string; short?: string }[] = [
    { id: "briefing", label: t.tabs.briefing, short: t.tabs.briefingShort },
    { id: "profil", label: t.tabs.profil },
    { id: "verlauf", label: t.tabs.verlauf },
    { id: "chat", label: t.tabs.chat },
    { id: "plan", label: t.tabs.plan, short: t.tabs.planShort },
  ];
  const [clientId, setClientId] = useState(demoClients[0].id);
  const [tab, setTab] = useState<TabId>("briefing");
  // The demo opens on the practice-level view, not on a single client.
  const [view, setView] = useState<"heute" | "client">("heute");

  const client = demoClients.find((c) => c.id === clientId) ?? demoClients[0];
  const [selectedDay, setSelectedDay] = useState(client.currentDay);

  const selectClient = (c: DemoClient) => {
    setClientId(c.id);
    setSelectedDay(c.currentDay);
    setView("client");
    track("client", c.id);
  };

  const openClient = (id: string, target: "briefing" | "chat") => {
    const c = demoClients.find((x) => x.id === id);
    if (!c) return;
    setClientId(id);
    setSelectedDay(c.currentDay);
    setTab(target);
    setView("client");
  };

  const openDay = (day: number) => {
    setSelectedDay(day);
    setTab("verlauf");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to={localePath("/", lang)}>
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <LangSwitch />
            <Link
              to={localePath("/", lang)}
              className="inline-flex items-center gap-1.5 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {t.home}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-tight text-balance sm:text-4xl">
          {t.h1}
        </h1>
        <p className="mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
          {t.intro}
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 text-xs font-light text-muted-foreground">
              {copy(lang).demo.windowBar}
            </span>
          </div>

          {/* client picker on small screens */}
          <div className="flex gap-2 overflow-x-auto border-b border-border/70 px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => {
                setView("heute");
                track("tab", "heute");
              }}
              aria-pressed={view === "heute"}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition-colors ${
                view === "heute"
                  ? "bg-secondary/15 text-secondary ring-1 ring-secondary/30"
                  : "text-muted-foreground ring-1 ring-border"
              }`}
            >
              {copy(lang).demo.today.title}
            </button>
            {demoClients.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => selectClient(c)}
                aria-pressed={c.id === client.id}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition-colors ${
                  c.id === client.id
                    ? "bg-secondary/15 text-secondary ring-1 ring-secondary/30"
                    : "text-muted-foreground ring-1 ring-border"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[16rem_1fr]">
            <div className="hidden border-r border-border/70 p-5 lg:block">
              <button
                type="button"
                onClick={() => {
                  setView("heute");
                  track("tab", "heute");
                }}
                aria-pressed={view === "heute"}
                className={`mb-4 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  view === "heute"
                    ? "bg-secondary/10 ring-1 ring-secondary/30"
                    : "hover:bg-muted/60"
                }`}
              >
                <CalendarDays className="h-4 w-4 text-secondary" /> {copy(lang).demo.today.title}
              </button>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {copy(lang).demo.clients}
              </p>
              <div className="mt-3 space-y-2">
                {demoClients.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectClient(c)}
                    aria-pressed={view === "client" && c.id === client.id}
                    className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                      view === "client" && c.id === client.id
                        ? "bg-secondary/10 ring-1 ring-secondary/30"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs font-light text-muted-foreground">
                      {c.focus} · {copy(lang).demo.history.day} {c.currentDay}{" "}
                      {copy(lang).demo.history.of} {c.totalDays}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-[34rem] min-w-0 flex-col">
              {view === "heute" ? (
                <TodayView onOpenClient={openClient} />
              ) : (
                <>
              <div className="flex gap-1 overflow-x-auto border-b border-border/70 px-5 pt-4">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTab(item.id);
                      track("tab", item.id);
                    }}
                    aria-pressed={tab === item.id}
                    className={`-mb-px shrink-0 border-b-2 px-3 pb-3 pt-1 text-xs font-medium transition-colors ${
                      tab === item.id
                        ? "border-secondary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="sm:hidden">{item.short ?? item.label}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1">
                {tab === "briefing" && <BriefingView client={client} onOpenDay={openDay} />}
                {tab === "profil" && <ProfileView client={client} />}
                {tab === "verlauf" && (
                  <HistoryView
                    client={client}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                    showChat={false}
                  />
                )}
                {tab === "chat" && <ChatView key={client.id} client={client} />}
                {tab === "plan" && <PlanView key={client.id} client={client} />}
              </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-border/70 bg-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-balance sm:text-3xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
            {t.ctaText}
          </p>
          <Link
            to={`${localePath("/", lang)}#pilot`}
            onClick={() => track("cta_from_demo", "demo_page")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm [&_a]:inline-block [&_a]:py-1.5 [&_button]:py-1.5 font-light text-muted-foreground">
            <Link to="/impressum" className="hover:text-foreground">
              {copy(lang).landing.imprint}
            </Link>
            <Link to="/datenschutz" className="hover:text-foreground">
              {copy(lang).landing.privacy}
            </Link>
            <ConsentSettingsLink />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;
