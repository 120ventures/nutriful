import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HistoryView, PlanView } from "./DemoPanels";
import { track } from "@/lib/demoTracking";
import { demoClients, type DemoClient } from "./demoData";

/**
 * Teaser on the landing page: the same panels as /demo, but only Verlauf and
 * Plan, and with a link to the full demo underneath.
 */
const DemoDashboard = () => {
  const [clientId, setClientId] = useState(demoClients[0].id);
  const [tab, setTab] = useState<"verlauf" | "plan">("verlauf");

  const client = demoClients.find((c) => c.id === clientId) ?? demoClients[0];
  const [selectedDay, setSelectedDay] = useState(client.currentDay);

  const selectClient = (c: DemoClient) => {
    setClientId(c.id);
    setSelectedDay(c.currentDay);
    track("client", c.id);
  };

  const tabs = [
    { id: "verlauf" as const, label: "Verlauf" },
    { id: "plan" as const, label: "Plan erstellen" },
  ];

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <p className="mb-3 text-center text-sm font-light text-muted-foreground">
        Zum Ausprobieren: Klient:in wechseln, einen Tag antippen oder selbst einen Tagesplan
        zusammenstellen.
      </p>

      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 text-xs font-light text-muted-foreground">
            nutriful für Praxen - Beispielansicht
          </span>
        </div>

        {/* client picker on small screens */}
        <div className="flex gap-2 overflow-x-auto border-b border-border/70 px-4 py-3 sm:hidden">
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

        <div className="grid sm:grid-cols-[1fr_1.6fr]">
          <div className="hidden border-r border-border/70 p-5 sm:block">
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

          <div className="min-w-0">
            <div className="flex gap-1 border-b border-border/70 px-5 pt-4">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTab(t.id);
                    track("tab", t.id);
                  }}
                  aria-pressed={tab === t.id}
                  className={`-mb-px border-b-2 px-3 pb-3 pt-1 text-xs font-medium transition-colors ${
                    tab === t.id
                      ? "border-secondary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "verlauf" ? (
              <HistoryView
                client={client}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            ) : (
              <PlanView key={client.id} client={client} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/demo"
          onClick={() => track("open_full_demo", "landing")}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Vollständige Demo öffnen <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-xs font-light text-muted-foreground">
          Mit Termin-Briefing und Chat - Beispielansicht mit fiktiven Daten.
        </p>
      </div>
    </div>
  );
};

export default DemoDashboard;
