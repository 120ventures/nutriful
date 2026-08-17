// Fictional practice data for the clickable dashboard demo on the landing page.
// Nothing here is real - it exists so visitors can get a feel for the daily view
// before there is a product to log into.

export type DemoEntry = {
  time: string;
  icon: string;
  text: string;
  tag: string;
  /** "warn" marks the kind of entry a practitioner would want to catch. */
  tone?: "warn";
};

export type DemoPhase = { label: string; days: number };

export type DemoClient = {
  id: string;
  name: string;
  program: string;
  /** Sidebar subtitle, e.g. "Ernährungsumstellung · Woche 2". */
  subtitle: string;
  totalDays: number;
  /** Today in the program - days beyond this are not tracked yet. */
  currentDay: number;
  phases: DemoPhase[];
  /** Entries per tracked day, keyed by day number. */
  days: Record<number, DemoEntry[]>;
  chat: { from: "client" | "you"; text: string }[];
};

export type MealSlot = "Frühstück" | "Mittag" | "Abend" | "Snack";

export const mealSlots: MealSlot[] = ["Frühstück", "Mittag", "Abend", "Snack"];

export type PlanBlock = { id: string; slot: MealSlot; icon: string; text: string };

export type PlanGoal = { id: string; label: string; hint: string; blocks: PlanBlock[] };

/** Building blocks a practitioner picks from when assembling a plan. */
export const planGoals: PlanGoal[] = [
  {
    id: "umstellung",
    label: "Ernährungsumstellung",
    hint: "Ausgewogen, alltagstauglich, ohne Verbote",
    blocks: [
      { id: "u1", slot: "Frühstück", icon: "🥣", text: "Porridge mit Beeren" },
      { id: "u2", slot: "Frühstück", icon: "🍳", text: "Rührei mit Tomaten" },
      { id: "u3", slot: "Mittag", icon: "🍚", text: "Reis mit Hühnchen und Gemüse" },
      { id: "u4", slot: "Mittag", icon: "🥗", text: "Großer Salat mit Ei" },
      { id: "u5", slot: "Abend", icon: "🐟", text: "Fisch mit Kartoffeln" },
      { id: "u6", slot: "Abend", icon: "🍲", text: "Gemüseeintopf" },
      { id: "u7", slot: "Snack", icon: "🍎", text: "Apfel mit Nüssen" },
      { id: "u8", slot: "Snack", icon: "🥕", text: "Gemüsesticks mit Hummus" },
    ],
  },
  {
    id: "gewicht",
    label: "Gewichtsmanagement",
    hint: "Sättigend bei moderater Energiedichte",
    blocks: [
      { id: "g1", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkornbrot" },
      { id: "g2", slot: "Frühstück", icon: "🥛", text: "Topfen mit Beeren" },
      { id: "g3", slot: "Mittag", icon: "🥗", text: "Salat mit Hühnerbrust" },
      { id: "g4", slot: "Mittag", icon: "🍲", text: "Gemüsesuppe mit Linsen" },
      { id: "g5", slot: "Abend", icon: "🐟", text: "Lachs mit Brokkoli" },
      { id: "g6", slot: "Abend", icon: "🥒", text: "Bunter Teller mit Ei" },
      { id: "g7", slot: "Snack", icon: "🥜", text: "Handvoll Mandeln" },
      { id: "g8", slot: "Snack", icon: "🍓", text: "Beeren" },
    ],
  },
  {
    id: "sport",
    label: "Sporternährung",
    hint: "Kohlenhydrate und Eiweiß um die Einheit herum",
    blocks: [
      { id: "s1", slot: "Frühstück", icon: "🥣", text: "Haferflocken mit Whey" },
      { id: "s2", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkorntoast" },
      { id: "s3", slot: "Mittag", icon: "🍗", text: "Hühnchen, Reis, Brokkoli" },
      { id: "s4", slot: "Mittag", icon: "🍝", text: "Pasta mit Putenragout" },
      { id: "s5", slot: "Abend", icon: "🐟", text: "Lachs mit Süßkartoffel" },
      { id: "s6", slot: "Abend", icon: "🍚", text: "Reis mit Rindfleisch" },
      { id: "s7", slot: "Snack", icon: "🥤", text: "Shake nach der Einheit" },
      { id: "s8", slot: "Snack", icon: "🍌", text: "Banane mit Topfen" },
    ],
  },
  {
    id: "intoleranz",
    label: "Intoleranz-Karenz",
    hint: "Verträglich in der Karenzphase, gut dokumentierbar",
    blocks: [
      { id: "i1", slot: "Frühstück", icon: "🍚", text: "Reisbrei mit Banane" },
      { id: "i2", slot: "Frühstück", icon: "🥣", text: "Hirsebrei" },
      { id: "i3", slot: "Mittag", icon: "🍗", text: "Hühnchen mit Reis" },
      { id: "i4", slot: "Mittag", icon: "🐟", text: "Fisch mit Kartoffeln" },
      { id: "i5", slot: "Abend", icon: "🍲", text: "Gemüseeintopf" },
      { id: "i6", slot: "Abend", icon: "🥕", text: "Gemüsepfanne" },
      { id: "i7", slot: "Snack", icon: "🍌", text: "Banane" },
      { id: "i8", slot: "Snack", icon: "🍐", text: "Birne" },
    ],
  },
];

export const demoClients: DemoClient[] = [
  {
    id: "lisa",
    name: "Lisa M.",
    program: "30-Tage-Programm",
    subtitle: "Ernährungsumstellung · Woche 2",
    totalDays: 30,
    currentDay: 9,
    phases: [
      { label: "Analyse", days: 7 },
      { label: "Umstellung", days: 14 },
      { label: "Alltag", days: 9 },
    ],
    days: {
      1: [
        { time: "08:00", icon: "🥐", text: "Frühstück: Semmel mit Butter", tag: "Foto" },
        { time: "12:30", icon: "🍝", text: "Mittag: Nudeln mit Pesto", tag: "Foto" },
        { time: "20:15", icon: "🍫", text: "Notiz: Schokolade vor dem Fernseher", tag: "Notiz" },
      ],
      2: [
        { time: "07:45", icon: "☕", text: "Notiz: nur Kaffee, kein Frühstück", tag: "Notiz" },
        { time: "13:00", icon: "🥗", text: "Mittag: Salat aus der Kantine", tag: "Foto" },
        { time: "19:30", icon: "🍕", text: "Abendessen: Pizza bestellt", tag: "Foto" },
      ],
      3: [
        { time: "08:20", icon: "🍳", text: "Frühstück: Rührei mit Tomaten", tag: "Foto" },
        { time: "15:00", icon: "☕", text: "Notiz: Cappuccino und ein Keks", tag: "Notiz" },
        { time: "19:00", icon: "🍲", text: "Abendessen: Gemüsesuppe", tag: "Foto" },
      ],
      4: [
        {
          time: "09:00",
          icon: "⚠️",
          text: "Notiz: Frühstück ausgelassen, Termin zu früh",
          tag: "Auffällig",
          tone: "warn",
        },
        { time: "13:30", icon: "🥪", text: "Mittag: Sandwich unterwegs", tag: "Foto" },
        { time: "21:00", icon: "🍟", text: "Spät: Pommes auf dem Heimweg", tag: "Foto" },
      ],
      5: [
        { time: "08:00", icon: "🥣", text: "Frühstück: Porridge mit Apfel", tag: "Foto" },
        { time: "12:45", icon: "🍚", text: "Mittag: Reis mit Hühnchen", tag: "Foto" },
        { time: "18:30", icon: "🥗", text: "Abendessen: großer Salat", tag: "Foto" },
      ],
      6: [
        { time: "08:10", icon: "🥐", text: "Frühstück: Croissant to go", tag: "Foto" },
        { time: "14:00", icon: "🍎", text: "Snack: Apfel", tag: "Notiz" },
        { time: "19:45", icon: "🍝", text: "Abendessen: Pasta mit Gemüse", tag: "Foto" },
      ],
      7: [
        { time: "08:00", icon: "🥣", text: "Frühstück: Joghurt mit Müsli", tag: "Foto" },
        { time: "12:30", icon: "🥙", text: "Mittag: Wrap mit Falafel", tag: "Foto" },
        { time: "20:00", icon: "📋", text: "Analyse-Phase abgeschlossen", tag: "Phase" },
      ],
      8: [
        { time: "08:05", icon: "🥣", text: "Frühstück: Porridge mit Beeren", tag: "Foto" },
        { time: "13:00", icon: "🐟", text: "Mittag: Lachs mit Kartoffeln", tag: "Foto" },
        { time: "19:30", icon: "🥗", text: "Abendessen: Salat mit Ei", tag: "Foto" },
      ],
      9: [
        { time: "08:10", icon: "🥣", text: "Frühstück: Porridge mit Beeren", tag: "Foto" },
        {
          time: "15:20",
          icon: "⚠️",
          text: "Notiz: Nachmittagstief, Heißhunger",
          tag: "Auffällig",
          tone: "warn",
        },
        { time: "19:45", icon: "🍲", text: "Abendessen: Reis mit Gemüse", tag: "Foto" },
      ],
    },
    chat: [
      { from: "client", text: "Zählt der Cappuccino am Nachmittag als Zwischenmahlzeit? 🤔" },
      { from: "you", text: "Ja, trag ihn am besten als Snack ein - dann sehen wir das Muster. 👍" },
    ],
  },
  {
    id: "markus",
    name: "Markus T.",
    program: "30-Tage-Programm",
    subtitle: "Sporternährung · Woche 1",
    totalDays: 30,
    currentDay: 5,
    phases: [
      { label: "Bestandsaufnahme", days: 5 },
      { label: "Aufbau", days: 16 },
      { label: "Stabilisierung", days: 9 },
    ],
    days: {
      1: [
        { time: "06:30", icon: "🥤", text: "Notiz: Shake vor der Einheit", tag: "Notiz" },
        { time: "12:00", icon: "🍗", text: "Mittag: Hühnchen mit Reis", tag: "Foto" },
        { time: "19:00", icon: "🥗", text: "Abendessen: Salat mit Thunfisch", tag: "Foto" },
      ],
      2: [
        { time: "07:00", icon: "🍳", text: "Frühstück: Eier mit Vollkorntoast", tag: "Foto" },
        { time: "13:30", icon: "🍝", text: "Mittag: Pasta nach der Einheit", tag: "Foto" },
        { time: "20:00", icon: "🥛", text: "Snack: Topfen mit Banane", tag: "Notiz" },
      ],
      3: [
        {
          time: "06:45",
          icon: "⚠️",
          text: "Notiz: nüchtern trainiert, Leistung eingebrochen",
          tag: "Auffällig",
          tone: "warn",
        },
        { time: "12:30", icon: "🍚", text: "Mittag: Reis mit Pute", tag: "Foto" },
        { time: "19:15", icon: "🍲", text: "Abendessen: Linsencurry", tag: "Foto" },
      ],
      4: [
        { time: "07:15", icon: "🥣", text: "Frühstück: Haferflocken mit Whey", tag: "Foto" },
        { time: "13:00", icon: "🥙", text: "Mittag: Wrap mit Hühnchen", tag: "Foto" },
        { time: "18:45", icon: "🐟", text: "Abendessen: Lachs mit Süßkartoffel", tag: "Foto" },
      ],
      5: [
        { time: "06:30", icon: "🥤", text: "Notiz: Shake vor der Einheit", tag: "Notiz" },
        { time: "12:15", icon: "🍗", text: "Mittag: Hühnchen, Reis, Brokkoli", tag: "Foto" },
        {
          time: "21:30",
          icon: "⚠️",
          text: "Notiz: spät gegessen, schlecht geschlafen",
          tag: "Auffällig",
          tone: "warn",
        },
      ],
    },
    chat: [
      { from: "client", text: "Reicht der Shake vor dem Training oder brauche ich was Festes?" },
      {
        from: "you",
        text: "Bei 90 Minuten reicht der Shake - ab zwei Stunden gehen wir auf feste Kohlenhydrate.",
      },
    ],
  },
  {
    id: "anna",
    name: "Anna K.",
    program: "21-Tage-Programm",
    subtitle: "Intoleranz-Abklärung · Tag 5",
    totalDays: 21,
    currentDay: 5,
    phases: [
      { label: "Karenz", days: 14 },
      { label: "Provokation", days: 7 },
    ],
    days: {
      1: [
        { time: "08:00", icon: "🍚", text: "Frühstück: Reisbrei ohne Milch", tag: "Foto" },
        { time: "12:30", icon: "🥗", text: "Mittag: Salat mit Olivenöl", tag: "Foto" },
        { time: "19:00", icon: "🍲", text: "Abendessen: Kartoffelsuppe", tag: "Foto" },
      ],
      2: [
        { time: "08:15", icon: "🍌", text: "Frühstück: Banane mit Haferdrink", tag: "Foto" },
        { time: "13:00", icon: "🍗", text: "Mittag: Hühnchen mit Reis", tag: "Foto" },
        { time: "18:30", icon: "🥕", text: "Abendessen: Gemüsepfanne", tag: "Foto" },
      ],
      3: [
        { time: "08:00", icon: "🍚", text: "Frühstück: Reisbrei", tag: "Foto" },
        {
          time: "14:00",
          icon: "⚠️",
          text: "Symptom: Blähungen nach dem Mittagessen",
          tag: "Auffällig",
          tone: "warn",
        },
        { time: "19:30", icon: "🍲", text: "Abendessen: Suppe", tag: "Foto" },
      ],
      4: [
        { time: "08:10", icon: "🥣", text: "Frühstück: Hirsebrei", tag: "Foto" },
        { time: "12:45", icon: "🐟", text: "Mittag: Fisch mit Kartoffeln", tag: "Foto" },
        { time: "19:00", icon: "🥗", text: "Abendessen: Blattsalat", tag: "Foto" },
      ],
      5: [
        { time: "08:00", icon: "🍚", text: "Frühstück: Reisbrei mit Banane", tag: "Foto" },
        {
          time: "13:15",
          icon: "⚠️",
          text: "Notiz: Wrap gegessen - war mit Weizen",
          tag: "Auffällig",
          tone: "warn",
        },
        { time: "19:45", icon: "🍲", text: "Abendessen: Gemüseeintopf", tag: "Foto" },
      ],
    },
    chat: [
      { from: "client", text: "Ich habe aus Versehen einen Weizenwrap gegessen - Karenz kaputt?" },
      {
        from: "you",
        text: "Nicht kaputt. Wir notieren es und schauen, ob heute Abend Beschwerden kommen.",
      },
    ],
  },
];
