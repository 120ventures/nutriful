import {
  CalendarCheck,
  ClipboardList,
  LineChart,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./index";

type Card = { icon: LucideIcon; title: string; text: string };
type Step = { step: string; title: string; text: string };
type Faq = { q: string; a: string };

const de = {
  pains: [
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
  ] as Card[],
  heroProof: [
    "Spart die Vorbereitung vor jedem Termin",
    "Keine Zettelwirtschaft",
    "Alles einheitlich dokumentiert",
  ],
  pillars: [
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
  ] as Card[],
  features: [
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
  ] as Card[],
  steps: [
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
  ] as Step[],
  faqs: [
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
  ] as Faq[],
  chaosChips: [
    { label: "WhatsApp, 22:41", rotate: "-rotate-2" },
    { label: "Foto per E-Mail", rotate: "rotate-1" },
    { label: "Papier-Tagebuch", rotate: "-rotate-1" },
    { label: "3 Tage Funkstille", rotate: "rotate-2" },
    { label: "„Zählt das als Snack?“", rotate: "-rotate-2" },
  ],
  demoHighlights: ["Termin-Briefing", "Verlauf pro Tag", "Chat mit Klient:innen", "Plan-Baukasten"],
};

const en: typeof de = {
  pains: [
    {
      icon: MessageCircle,
      title: "Scattered data",
      text: "Food photos on WhatsApp, questions by email, a food diary on paper - your client's week sits in five different channels.",
    },
    {
      icon: ClipboardList,
      title: "Piecing it together before every appointment",
      text: "Before the consultation starts, time goes into assembling messages, photos and notes into one picture.",
    },
    {
      icon: CalendarCheck,
      title: "Drop-outs between appointments",
      text: "Dietary changes rarely fail on the plan - they fail in the three weeks of everyday life between two appointments, when nobody is looking.",
    },
  ],
  heroProof: [
    "Saves the prep before every appointment",
    "No more paper trail",
    "Everything documented the same way",
  ],
  pillars: [
    {
      icon: MessageCircle,
      title: "Communication",
      text: "Questions between appointments run through Nutriful instead of your private number - with the client's record right beside them, instead of from memory.",
    },
    {
      icon: ClipboardList,
      title: "Nutrition plans",
      text: "Build plans from recipes - by meal, ingredient and dietary form. Built once, reusable with the next client.",
    },
    {
      icon: LineChart,
      title: "Progress",
      text: "Meals, photos and notes flow into one record automatically. Before the appointment you see what stood out and what is still open.",
    },
  ],
  features: [
    {
      icon: ClipboardList,
      title: "An end to the paper trail",
      text: "A food diary on paper, photos on WhatsApp, notes in the calendar - in Nutriful it all comes together in one record. Captured consistently, with no retyping and nothing lost on the way.",
    },
    {
      icon: CalendarCheck,
      title: "Preparation that is already done",
      text: "What your clients record day to day is ready by the next appointment. You start with the record and the flagged moments in front of you, instead of searching through messages first.",
    },
    {
      icon: LineChart,
      title: "Every client documented alike",
      text: "All programmes follow the same structure - you compare records without having to think your way into each client afresh, and the documentation is complete without rework.",
    },
    {
      icon: ShieldCheck,
      title: "Secure data",
      text: "Encrypted transmission, secure storage, deletion at any time - trust is the basis of your client relationships, digitally too.",
    },
  ],
  steps: [
    {
      step: "1",
      title: "Invite your client",
      text: "You invite your client into Nutriful with a link - nothing to install on your side.",
    },
    {
      step: "2",
      title: "Your client tracks day to day",
      text: "Meals, photos and notes are captured in the programme - presented in a way that keeps people going.",
    },
    {
      step: "3",
      title: "You see it all in one place",
      text: "Record, flagged moments and open questions in one place - your consultation starts prepared instead of with detective work.",
    },
  ],
  faqs: [
    {
      q: "Does Nutriful replace my consultation?",
      a: "No - Nutriful is your tool, not a replacement. The professional judgement, the interpretation and the relationship with your client stay with you. Nutriful covers the stretch between appointments.",
    },
    {
      q: "How does the pilot partnership work?",
      a: "In the pilot you test Nutriful with real clients and we build the tool around your feedback. What comes afterwards we discuss personally - we clarify scope and terms together in a first call.",
    },
    {
      q: "What do my clients have to do?",
      a: "Open the invitation link and start. The programme is built so that tracking takes under two minutes a day - the simpler it is, the more people stick with it.",
    },
    {
      q: "How secure is the data?",
      a: "All data is transmitted encrypted and stored securely. Deletion is possible at any time. We set out the details transparently in the pilot agreement.",
    },
  ],
  chaosChips: [
    { label: "WhatsApp, 22:41", rotate: "-rotate-2" },
    { label: "Photo by email", rotate: "rotate-1" },
    { label: "Paper diary", rotate: "-rotate-1" },
    { label: "3 days of silence", rotate: "rotate-2" },
    { label: '"Does that count as a snack?"', rotate: "-rotate-2" },
  ],
  demoHighlights: ["Appointment briefing", "Day-by-day record", "Chat with clients", "Plan builder"],
};

export const landingContent = (lang: Lang) => (lang === "en" ? en : de);
