import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/landing/Logo";
import ConsentSettingsLink from "@/components/landing/ConsentSettingsLink";
import {
  BriefingView,
  ChatView,
  HistoryView,
  PlanView,
  ProfileView,
} from "@/components/landing/DemoPanels";
import { track } from "@/lib/demoTracking";
import { demoClients, type DemoClient } from "@/components/landing/demoData";

type TabId = "briefing" | "profil" | "verlauf" | "chat" | "plan";

const tabs: { id: TabId; label: string; short?: string }[] = [
  { id: "briefing", label: "Termin-Briefing", short: "Briefing" },
  { id: "profil", label: "Profil" },
  { id: "verlauf", label: "Verlauf" },
  { id: "chat", label: "Chat" },
  { id: "plan", label: "Plan erstellen", short: "Plan" },
];

const Demo = () => {
  const [clientId, setClientId] = useState(demoClients[0].id);
  const [tab, setTab] = useState<TabId>("briefing");

  const client = demoClients.find((c) => c.id === clientId) ?? demoClients[0];
  const [selectedDay, setSelectedDay] = useState(client.currentDay);

  const selectClient = (c: DemoClient) => {
    setClientId(c.id);
    setSelectedDay(c.currentDay);
    track("client", c.id);
  };

  const openDay = (day: number) => {
    setSelectedDay(day);
    setTab("verlauf");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
          Interaktive Demo
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-tight text-balance sm:text-4xl">
          Alle Klient:innen im Überblick
        </h1>
        <p className="mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
          Das hier ist eine Demo mit fiktiven Daten: drei Beispiel-Klient:innen zum Ausprobieren,
          ohne Login und ohne Anmeldung. Sie sehen darin, wie Nutriful Sie bei der Kommunikation
          zwischen den Terminen, beim Erstellen der Ernährungspläne und beim Verfolgen des
          Fortschritts Ihrer Klient:innen unterstützt.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 text-xs font-light text-muted-foreground">
              nutriful für Praxen - Beispielansicht mit fiktiven Daten
            </span>
          </div>

          {/* client picker on small screens */}
          <div className="flex gap-2 overflow-x-auto border-b border-border/70 px-4 py-3 lg:hidden">
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
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Ihre Klient:innen
              </p>
              <div className="mt-3 space-y-2">
                {demoClients.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectClient(c)}
                    aria-pressed={c.id === client.id}
                    className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                      c.id === client.id
                        ? "bg-secondary/10 ring-1 ring-secondary/30"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs font-light text-muted-foreground">
                      {c.focus} · Tag {c.currentDay} von {c.totalDays}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-[34rem] min-w-0 flex-col">
              <div className="flex gap-1 overflow-x-auto border-b border-border/70 px-5 pt-4">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTab(t.id);
                      track("tab", t.id);
                    }}
                    aria-pressed={tab === t.id}
                    className={`-mb-px shrink-0 border-b-2 px-3 pb-3 pt-1 text-xs font-medium transition-colors ${
                      tab === t.id
                        ? "border-secondary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="sm:hidden">{t.short ?? t.label}</span>
                    <span className="hidden sm:inline">{t.label}</span>
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
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-border/70 bg-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-balance sm:text-3xl">
            Das hier ist ein Entwurf. Sie entscheiden, was daraus wird.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-light leading-relaxed text-muted-foreground text-pretty">
            Nutriful entsteht gerade mit einer kleinen Gruppe von Diätolog:innen und
            Ernährungsberater:innen in Österreich. Im Pilot arbeiten Sie mit echten Klient:innen -
            und was Ihnen dabei fehlt, bauen wir als Nächstes.
          </p>
          <Link
            to="/#pilot"
            onClick={() => track("cta_from_demo", "demo_page")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pilot-Partner:in werden <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm [&_a]:inline-block [&_a]:py-1.5 [&_button]:py-1.5 font-light text-muted-foreground">
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

export default Demo;
