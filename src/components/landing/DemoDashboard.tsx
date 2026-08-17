import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { phCapture } from "@/lib/posthog";
import {
  demoClients,
  mealSlots,
  planGoals,
  type DemoClient,
  type MealSlot,
  type PlanBlock,
} from "./demoData";

const track = (element: string, value: string) =>
  phCapture("demo_interaction", { element, value });

/* ------------------------------------------------------------------ Verlauf */

const DayStrip = ({
  client,
  selectedDay,
  onSelect,
}: {
  client: DemoClient;
  selectedDay: number;
  onSelect: (day: number) => void;
}) => {
  let dayCursor = 0;

  return (
    <div className="mt-4 flex gap-2">
      {client.phases.map((phase) => {
        const offset = dayCursor;
        dayCursor += phase.days;

        return (
          <div key={phase.label} style={{ flexGrow: phase.days }} className="min-w-0">
            <div className="flex gap-[3px]">
              {Array.from({ length: phase.days }).map((_, i) => {
                const day = offset + i + 1;
                const tracked = day <= client.currentDay;
                const hasWarning = client.days[day]?.some((e) => e.tone === "warn");
                const selected = day === selectedDay;

                const tone = selected
                  ? "bg-secondary ring-2 ring-secondary ring-offset-1 ring-offset-card"
                  : hasWarning
                    ? "bg-primary/40 hover:bg-primary/60"
                    : tracked
                      ? "bg-secondary/30 hover:bg-secondary/50"
                      : "bg-muted hover:bg-muted-foreground/20";

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      onSelect(day);
                      track("day", `${client.id}:${day}`);
                    }}
                    aria-label={`Tag ${day}`}
                    aria-pressed={selected}
                    title={`Tag ${day}`}
                    className={`h-6 flex-1 rounded transition-colors ${tone}`}
                  />
                );
              })}
            </div>
            <p className="mt-1 truncate text-center text-[10px] font-light text-muted-foreground">
              {phase.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const HistoryView = ({
  client,
  selectedDay,
  onSelectDay,
}: {
  client: DemoClient;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}) => {
  const entries = client.days[selectedDay];
  const isFuture = selectedDay > client.currentDay;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{client.name}</p>
          <p className="text-xs font-light text-muted-foreground">
            {client.program} · Tag {selectedDay} von {client.totalDays}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
          {client.currentDay}/{client.currentDay} Tage getrackt
        </span>
      </div>

      <DayStrip client={client} selectedDay={selectedDay} onSelect={onSelectDay} />

      <div className="mt-4 space-y-2">
        {entries?.length ? (
          entries.map((e) => (
            <div
              key={e.time}
              className="flex items-center gap-3 rounded-xl border border-border/60 px-3 py-2"
            >
              <span className="text-base">{e.icon}</span>
              <span className="w-10 shrink-0 text-[10px] font-light text-muted-foreground">
                {e.time}
              </span>
              <p className="flex-1 text-xs font-light">{e.text}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                  e.tone === "warn"
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {e.tag}
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs font-light text-muted-foreground">
            {isFuture
              ? `Tag ${selectedDay} liegt noch vor Ihrer Klient:in - hier erscheinen die Einträge, sobald getrackt wird.`
              : "An diesem Tag wurde nichts erfasst."}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl bg-muted/60 p-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Chat
        </p>
        {client.chat.map((m) =>
          m.from === "client" ? (
            <p
              key={m.text}
              className="mt-1.5 rounded-lg rounded-bl-none bg-card px-3 py-2 text-xs font-light"
            >
              {m.text}
            </p>
          ) : (
            <p
              key={m.text}
              className="ml-8 mt-1.5 rounded-lg rounded-br-none bg-secondary/15 px-3 py-2 text-xs font-light"
            >
              {m.text}
            </p>
          ),
        )}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- Planbuilder */

const PlanView = ({ client }: { client: DemoClient }) => {
  const [goalId, setGoalId] = useState(planGoals[0].id);
  const [plan, setPlan] = useState<PlanBlock[]>([]);
  const [assigned, setAssigned] = useState(false);

  const goal = planGoals.find((g) => g.id === goalId) ?? planGoals[0];

  const addBlock = (block: PlanBlock) => {
    setAssigned(false);
    setPlan((prev) => (prev.some((b) => b.id === block.id) ? prev : [...prev, block]));
    track("plan_block", `${goal.id}:${block.id}`);
  };

  const removeBlock = (id: string) => {
    setAssigned(false);
    setPlan((prev) => prev.filter((b) => b.id !== id));
  };

  const inPlan = (slot: MealSlot) => plan.filter((b) => b.slot === slot);

  return (
    <div className="p-5">
      <div>
        <p className="font-medium">Tagesplan für {client.name}</p>
        <p className="text-xs font-light text-muted-foreground">
          Ziel wählen, Bausteine antippen - der Plan entsteht rechts.
        </p>
      </div>

      {/* goal */}
      <div className="mt-4 flex flex-wrap gap-2">
        {planGoals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              setGoalId(g.id);
              setPlan([]);
              setAssigned(false);
              track("plan_goal", g.id);
            }}
            aria-pressed={g.id === goalId}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              g.id === goalId
                ? "bg-secondary text-white"
                : "text-muted-foreground ring-1 ring-border hover:bg-muted"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs font-light text-muted-foreground">{goal.hint}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* library */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Bausteine
          </p>
          <div className="mt-2 space-y-1.5">
            {goal.blocks.map((b) => {
              const used = plan.some((p) => p.id === b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => addBlock(b)}
                  disabled={used}
                  className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors ${
                    used
                      ? "border-secondary/30 bg-secondary/10 text-muted-foreground"
                      : "border-border/60 hover:border-secondary/50 hover:bg-secondary/5"
                  }`}
                >
                  <span className="text-base">{b.icon}</span>
                  <span className="flex-1 text-xs font-light">{b.text}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{b.slot}</span>
                  {used ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-secondary" strokeWidth={2.4} />
                  ) : (
                    <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* plan */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Plan · Tag 1
          </p>
          <div className="mt-2 space-y-2">
            {mealSlots.map((slot) => (
              <div key={slot} className="rounded-xl bg-muted/50 p-2.5">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {slot}
                </p>
                {inPlan(slot).length ? (
                  <div className="mt-1.5 space-y-1.5">
                    {inPlan(slot).map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center gap-2 rounded-lg bg-card px-2.5 py-1.5"
                      >
                        <span className="text-sm">{b.icon}</span>
                        <span className="flex-1 text-xs font-light">{b.text}</span>
                        <button
                          type="button"
                          onClick={() => removeBlock(b.id)}
                          aria-label={`${b.text} entfernen`}
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs font-light text-muted-foreground">
                    noch nichts gewählt
                  </p>
                )}
              </div>
            ))}
          </div>

          {assigned ? (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.4} />
              <p className="text-xs font-light">
                Plan an {client.name} gesendet - sie sieht ihn ab morgen in ihrer App und hakt jede
                Mahlzeit direkt ab.
              </p>
            </div>
          ) : (
            <button
              type="button"
              disabled={plan.length === 0}
              onClick={() => {
                setAssigned(true);
                track("plan_assign", `${goal.id}:${plan.length}`);
              }}
              className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {plan.length === 0
                ? "Bausteine wählen, um fortzufahren"
                : `Plan an ${client.name} senden (${plan.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------- Wrapper */

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
        {/* window bar */}
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
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
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
          {/* client list */}
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
                  <p className="text-xs font-light text-muted-foreground">{c.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* detail */}
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
                  className={`-mb-px border-b-2 px-3 pb-2.5 text-xs font-medium transition-colors ${
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

      <p className="mt-3 text-center text-xs font-light text-muted-foreground">
        Beispielansicht mit fiktiven Daten - das Interface entsteht gemeinsam mit unseren
        Pilot-Partner:innen.
      </p>
    </div>
  );
};

export default DemoDashboard;
