import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Check, MessageCircle, Plus, Send, X } from "lucide-react";
import { track } from "@/lib/demoTracking";
import {
  dietFilters,
  mealSlots,
  planGoals,
  quickReplies,
  type ChatMessage,
  type DemoClient,
  type Diet,
  type MealSlot,
  type PlanBlock,
} from "./demoData";

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

export const HistoryView = ({
  client,
  selectedDay,
  onSelectDay,
  showChat = true,
}: {
  client: DemoClient;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  showChat?: boolean;
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

      {showChat && (
        <div className="mt-4 rounded-xl bg-muted/60 p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Chat
          </p>
          {client.chat.map((m) => (
            <ChatBubble key={m.text} message={m} />
          ))}
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------- Planbuilder */

export const PlanView = ({ client }: { client: DemoClient }) => {
  const [goalId, setGoalId] = useState(planGoals[0].id);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [plan, setPlan] = useState<PlanBlock[]>([]);
  const [assigned, setAssigned] = useState(false);

  const goal = planGoals.find((g) => g.id === goalId) ?? planGoals[0];

  // A block has to satisfy every active filter, so combinations like
  // vegetarisch + laktosefrei narrow the list instead of widening it.
  const blocks = goal.blocks.filter((b) => diets.every((d) => b.diets.includes(d)));

  const toggleDiet = (diet: Diet) => {
    setDiets((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet],
    );
    track("plan_diet", diet);
  };

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

      <div className="mt-4 flex flex-wrap gap-2">
        {planGoals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              setGoalId(g.id);
              setDiets([]);
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Ernährungsform
        </span>
        {dietFilters.map((f) => {
          const active = diets.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleDiet(f.id)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground ring-1 ring-border hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          );
        })}
        {diets.length > 0 && (
          <button
            type="button"
            onClick={() => setDiets([])}
            className="text-[11px] font-medium text-muted-foreground underline hover:text-foreground"
          >
            zurücksetzen
          </button>
        )}
      </div>
      {diets.includes("halal") && (
        <p className="mt-2 text-[11px] font-light text-muted-foreground">
          Fleisch- und Geflügelbausteine setzen halal-zertifizierte Ware voraus.
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Bausteine
          </p>
          <div className="mt-2 space-y-1.5">
            {blocks.length === 0 && (
              <p className="rounded-xl border border-dashed border-border px-3 py-4 text-center text-xs font-light text-muted-foreground">
                Für diese Kombination haben wir hier noch keinen Baustein - im Pilot legen Sie
                eigene an.
              </p>
            )}
            {blocks.map((b) => {
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

/* -------------------------------------------------------------- Chat */

const ChatBubble = ({ message }: { message: ChatMessage }) =>
  message.from === "client" ? (
    <p className="mt-1.5 max-w-[85%] rounded-lg rounded-bl-none bg-card px-3 py-2 text-xs font-light">
      {message.text}
    </p>
  ) : (
    <p className="ml-auto mt-1.5 max-w-[85%] rounded-lg rounded-br-none bg-secondary/15 px-3 py-2 text-xs font-light">
      {message.text}
    </p>
  );

export const ChatView = ({ client }: { client: DemoClient }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(client.chat);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const replyIndex = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, typing]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { from: "you", text: clean }]);
    setDraft("");
    setTyping(true);
    track("chat_send", client.id);

    // The demo client "answers" from a small script - enough to make the loop
    // feel real without pretending there is a person on the other end.
    const reply = client.chatReplies[replyIndex.current % client.chatReplies.length];
    replyIndex.current += 1;
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { from: "client", text: reply }]);
      }, 1200),
    );
  };

  return (
    <div className="flex h-full flex-col p-5">
      <div>
        <p className="font-medium">Chat mit {client.name}</p>
        <p className="text-xs font-light text-muted-foreground">
          Kurze Fragen zwischen den Terminen - mit dem Verlauf direkt daneben statt auf Ihrer
          privaten Nummer.
        </p>
      </div>

      <div className="mt-4 flex-1 space-y-1 overflow-y-auto rounded-xl bg-muted/50 p-3">
        {messages.map((m, i) => (
          <ChatBubble key={`${i}-${m.text}`} message={m} />
        ))}
        {typing && (
          <p className="mt-1.5 inline-block rounded-lg rounded-bl-none bg-card px-3 py-2 text-xs font-light text-muted-foreground">
            {client.name} tippt ...
          </p>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickReplies.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Nachricht an Ihre Klient:in ..."
          aria-label="Nachricht"
          className="h-10 flex-1 rounded-xl border border-border bg-card px-3 text-xs font-light outline-none focus:border-secondary/60"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Senden"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

/* ---------------------------------------------------------- Termin-Briefing */

/** Everything the briefing shows is derived from the client's tracked days. */
const useBriefing = (client: DemoClient) =>
  useMemo(() => {
    const days = Object.entries(client.days)
      .map(([day, entries]) => ({ day: Number(day), entries }))
      .filter((d) => d.day <= client.currentDay)
      .sort((a, b) => a.day - b.day);

    const entryCount = days.reduce((sum, d) => sum + d.entries.length, 0);
    const flags = days.flatMap((d) =>
      d.entries.filter((e) => e.tone === "warn").map((e) => ({ day: d.day, entry: e })),
    );

    let cursor = 0;
    const phase =
      client.phases.find((p) => {
        cursor += p.days;
        return client.currentDay <= cursor;
      }) ?? client.phases[client.phases.length - 1];

    const openQuestion = [...client.chat].reverse().find((m) => m.from === "client");

    return { trackedDays: days.length, entryCount, flags, phase, openQuestion };
  }, [client]);

export const BriefingView = ({
  client,
  onOpenDay,
}: {
  client: DemoClient;
  onOpenDay?: (day: number) => void;
}) => {
  const { trackedDays, entryCount, flags, phase, openQuestion } = useBriefing(client);

  const stats = [
    { label: "Tage getrackt", value: `${trackedDays}/${client.currentDay}` },
    { label: "Einträge", value: String(entryCount) },
    { label: "Auffälligkeiten", value: String(flags.length) },
  ];

  return (
    <div className="p-5">
      <div>
        <p className="font-medium">Termin-Briefing · {client.name}</p>
        <p className="text-xs font-light text-muted-foreground">
          {client.program} · Tag {client.currentDay} von {client.totalDays} · Phase {phase.label}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-muted/60 px-3 py-3 text-center">
            <p className="font-display text-2xl font-normal">{s.value}</p>
            <p className="mt-0.5 text-[10px] font-light text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Worauf Sie schauen sollten
      </p>
      <div className="mt-2 space-y-2">
        {flags.length ? (
          flags.map((f) => (
            <button
              key={`${f.day}-${f.entry.time}`}
              type="button"
              onClick={() => {
                onOpenDay?.(f.day);
                track("briefing_flag", `${client.id}:${f.day}`);
              }}
              className="flex w-full items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2.5 text-left transition-colors hover:bg-primary/10"
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="flex-1 text-xs font-light">{f.entry.text}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">Tag {f.day}</span>
            </button>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-border px-3 py-4 text-center text-xs font-light text-muted-foreground">
            Keine Auffälligkeiten im aktuellen Verlauf.
          </p>
        )}
      </div>

      {openQuestion && (
        <>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Offen aus dem Chat
          </p>
          <div className="mt-2 flex items-start gap-2.5 rounded-xl bg-muted/60 px-3 py-2.5">
            <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
            <p className="text-xs font-light">{openQuestion.text}</p>
          </div>
        </>
      )}

      <p className="mt-5 text-xs font-light text-muted-foreground text-pretty">
        Genau das sehen Sie, wenn Sie die Klient:in vor dem Termin öffnen - ohne Nachrichten, Fotos
        und Notizen vorher zusammenzusuchen.
      </p>
    </div>
  );
};
