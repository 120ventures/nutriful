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
  chat: ChatMessage[];
  /** Canned answers the demo client sends back, used in order. */
  chatReplies: string[];
};

export type ChatMessage = { from: "client" | "you"; text: string };

/** One-tap messages a practitioner sends often - shortcuts in the demo chat. */
export const quickReplies = [
  "Wie ist es Ihnen am Wochenende gegangen?",
  "Schicken Sie mir bitte ein Foto vom Abendessen.",
  "Passt der Termin nächste Woche noch?",
];

export type MealSlot = "Frühstück" | "Mittag" | "Abend" | "Snack";

export const mealSlots: MealSlot[] = ["Frühstück", "Mittag", "Abend", "Snack"];

export type Diet = "vegetarisch" | "vegan" | "halal" | "laktosefrei";

/** Filters offered above the building blocks. Vegan implies vegetarisch. */
export const dietFilters: { id: Diet; label: string }[] = [
  { id: "vegetarisch", label: "Vegetarisch" },
  { id: "vegan", label: "Vegan" },
  { id: "laktosefrei", label: "Laktosefrei" },
  { id: "halal", label: "Halal" },
];

export type PlanBlock = {
  id: string;
  slot: MealSlot;
  icon: string;
  text: string;
  /** Searchable - a practitioner looks for "Linsen", not for a recipe title. */
  ingredients: string[];
  /** Every diet this block is suitable for - a block matches all active filters. */
  diets: Diet[];
};

export type PlanGoal = { id: string; label: string; hint: string; blocks: PlanBlock[] };

const ALL: Diet[] = ["vegetarisch", "vegan", "laktosefrei", "halal"];
const VEGGIE_LF: Diet[] = ["vegetarisch", "laktosefrei", "halal"];
const VEGGIE_DAIRY: Diet[] = ["vegetarisch", "halal"];
const MEAT: Diet[] = ["laktosefrei", "halal"];

/** Recipes a practitioner picks from when assembling a plan. */
export const planGoals: PlanGoal[] = [
  {
    id: "umstellung",
    label: "Ernährungsumstellung",
    hint: "Ausgewogen, alltagstauglich, ohne Verbote",
    blocks: [
      { id: "u1", slot: "Frühstück", icon: "🥣", text: "Porridge mit Beeren", ingredients: ["Haferflocken", "Milch", "Beeren", "Zimt"], diets: VEGGIE_DAIRY },
      { id: "u10", slot: "Frühstück", icon: "🌾", text: "Haferdrink-Porridge mit Apfel", ingredients: ["Haferflocken", "Haferdrink", "Apfel", "Zimt"], diets: ALL },
      { id: "u2", slot: "Frühstück", icon: "🍳", text: "Rührei mit Tomaten", ingredients: ["Eier", "Tomaten", "Olivenöl", "Schnittlauch"], diets: VEGGIE_LF },
      { id: "u9", slot: "Frühstück", icon: "🥓", text: "Vollkornbrot mit Schinken", ingredients: ["Vollkornbrot", "Schinken", "Butter", "Gurke"], diets: [] },
      { id: "u3", slot: "Mittag", icon: "🍚", text: "Reis mit Hühnchen und Gemüse", ingredients: ["Reis", "Hühnerbrust", "Karotten", "Brokkoli"], diets: MEAT },
      { id: "u4", slot: "Mittag", icon: "🥗", text: "Großer Salat mit Ei", ingredients: ["Blattsalat", "Eier", "Tomaten", "Olivenöl"], diets: VEGGIE_LF },
      { id: "u11", slot: "Mittag", icon: "🫘", text: "Linsensalat mit Ofengemüse", ingredients: ["Linsen", "Zucchini", "Paprika", "Olivenöl"], diets: ALL },
      { id: "u5", slot: "Abend", icon: "🐟", text: "Fisch mit Kartoffeln", ingredients: ["Kabeljau", "Kartoffeln", "Zitrone", "Petersilie"], diets: MEAT },
      { id: "u6", slot: "Abend", icon: "🍲", text: "Gemüseeintopf", ingredients: ["Karotten", "Sellerie", "Kartoffeln", "Lauch"], diets: ALL },
      { id: "u7", slot: "Snack", icon: "🍎", text: "Apfel mit Nüssen", ingredients: ["Apfel", "Walnüsse"], diets: ALL },
      { id: "u8", slot: "Snack", icon: "🥕", text: "Gemüsesticks mit Hummus", ingredients: ["Karotten", "Paprika", "Kichererbsen", "Tahin"], diets: ALL },
    ],
  },
  {
    id: "gewicht",
    label: "Gewichtsmanagement",
    hint: "Sättigend bei moderater Energiedichte",
    blocks: [
      { id: "g1", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkornbrot", ingredients: ["Eier", "Vollkornbrot", "Tomaten"], diets: VEGGIE_LF },
      { id: "g2", slot: "Frühstück", icon: "🥛", text: "Topfen mit Beeren", ingredients: ["Topfen", "Beeren", "Leinsamen"], diets: VEGGIE_DAIRY },
      { id: "g9", slot: "Frühstück", icon: "🥣", text: "Haferbrei mit Zimt", ingredients: ["Haferflocken", "Wasser", "Zimt", "Apfel"], diets: ALL },
      { id: "g3", slot: "Mittag", icon: "🥗", text: "Salat mit Hühnerbrust", ingredients: ["Blattsalat", "Hühnerbrust", "Gurke", "Essig-Öl-Dressing"], diets: MEAT },
      { id: "g4", slot: "Mittag", icon: "🍲", text: "Gemüsesuppe mit Linsen", ingredients: ["Linsen", "Karotten", "Sellerie", "Zwiebel"], diets: ALL },
      { id: "g5", slot: "Abend", icon: "🐟", text: "Lachs mit Brokkoli", ingredients: ["Lachs", "Brokkoli", "Zitrone"], diets: MEAT },
      { id: "g6", slot: "Abend", icon: "🥒", text: "Bunter Teller mit Ei", ingredients: ["Eier", "Paprika", "Gurke", "Vollkornbrot"], diets: VEGGIE_LF },
      { id: "g10", slot: "Abend", icon: "🍠", text: "Ofengemüse mit Kichererbsen", ingredients: ["Kichererbsen", "Karotten", "Zucchini", "Olivenöl"], diets: ALL },
      { id: "g7", slot: "Snack", icon: "🥜", text: "Handvoll Mandeln", ingredients: ["Mandeln"], diets: ALL },
      { id: "g8", slot: "Snack", icon: "🍓", text: "Beeren", ingredients: ["Heidelbeeren", "Himbeeren"], diets: ALL },
    ],
  },
  {
    id: "sport",
    label: "Sporternährung",
    hint: "Kohlenhydrate und Eiweiß um die Einheit herum",
    blocks: [
      { id: "s1", slot: "Frühstück", icon: "🥣", text: "Haferflocken mit Whey", ingredients: ["Haferflocken", "Whey-Protein", "Milch", "Banane"], diets: VEGGIE_DAIRY },
      { id: "s2", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkorntoast", ingredients: ["Eier", "Vollkorntoast", "Avocado"], diets: VEGGIE_LF },
      { id: "s9", slot: "Frühstück", icon: "🌱", text: "Sojajoghurt mit Haferflocken", ingredients: ["Sojajoghurt", "Haferflocken", "Beeren"], diets: ALL },
      { id: "s3", slot: "Mittag", icon: "🍗", text: "Hühnchen, Reis, Brokkoli", ingredients: ["Hühnerbrust", "Reis", "Brokkoli"], diets: MEAT },
      { id: "s4", slot: "Mittag", icon: "🍝", text: "Pasta mit Putenragout", ingredients: ["Vollkornpasta", "Putenfleisch", "Tomaten", "Zwiebel"], diets: MEAT },
      { id: "s10", slot: "Mittag", icon: "🫘", text: "Linsen-Bolognese mit Vollkornpasta", ingredients: ["Rote Linsen", "Vollkornpasta", "Tomaten", "Karotten"], diets: ALL },
      { id: "s5", slot: "Abend", icon: "🐟", text: "Lachs mit Süßkartoffel", ingredients: ["Lachs", "Süßkartoffel", "Spinat"], diets: MEAT },
      { id: "s6", slot: "Abend", icon: "🍚", text: "Reis mit Rindfleisch", ingredients: ["Reis", "Rindfleisch", "Paprika"], diets: MEAT },
      { id: "s11", slot: "Abend", icon: "🍜", text: "Tofu-Pfanne mit Reis", ingredients: ["Tofu", "Reis", "Brokkoli", "Sojasauce"], diets: ALL },
      { id: "s7", slot: "Snack", icon: "🥤", text: "Shake nach der Einheit", ingredients: ["Whey-Protein", "Milch", "Banane"], diets: VEGGIE_DAIRY },
      { id: "s8", slot: "Snack", icon: "🍌", text: "Banane mit Topfen", ingredients: ["Banane", "Topfen", "Honig"], diets: VEGGIE_DAIRY },
      { id: "s12", slot: "Snack", icon: "🥜", text: "Erdnussbutter-Brot", ingredients: ["Vollkornbrot", "Erdnussbutter", "Banane"], diets: ALL },
    ],
  },
  {
    id: "intoleranz",
    label: "Intoleranz-Karenz",
    hint: "Verträglich in der Karenzphase, gut dokumentierbar",
    blocks: [
      { id: "i1", slot: "Frühstück", icon: "🍚", text: "Reisbrei mit Banane", ingredients: ["Reis", "Wasser", "Banane"], diets: ALL },
      { id: "i2", slot: "Frühstück", icon: "🥣", text: "Hirsebrei", ingredients: ["Hirse", "Wasser", "Zimt"], diets: ALL },
      { id: "i3", slot: "Mittag", icon: "🍗", text: "Hühnchen mit Reis", ingredients: ["Hühnerbrust", "Reis", "Karotten"], diets: MEAT },
      { id: "i9", slot: "Mittag", icon: "🥔", text: "Kartoffel-Gemüse-Pfanne", ingredients: ["Kartoffeln", "Karotten", "Zucchini", "Olivenöl"], diets: ALL },
      { id: "i4", slot: "Abend", icon: "🐟", text: "Fisch mit Kartoffeln", ingredients: ["Kabeljau", "Kartoffeln", "Petersilie"], diets: MEAT },
      { id: "i5", slot: "Abend", icon: "🍲", text: "Gemüseeintopf", ingredients: ["Karotten", "Kartoffeln", "Sellerie"], diets: ALL },
      { id: "i6", slot: "Abend", icon: "🥕", text: "Gemüsepfanne", ingredients: ["Zucchini", "Karotten", "Paprika", "Olivenöl"], diets: ALL },
      { id: "i7", slot: "Snack", icon: "🍌", text: "Banane", ingredients: ["Banane"], diets: ALL },
      { id: "i8", slot: "Snack", icon: "🍐", text: "Birne", ingredients: ["Birne"], diets: ALL },
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
    chatReplies: [
      "Alles klar, mache ich ab heute so.",
      "Das Nachmittagstief war gestern wieder ziemlich stark.",
      "Frühstück habe ich diese Woche jeden Tag geschafft 🙂",
      "Passt, ich melde mich, wenn etwas dazwischenkommt.",
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
    chatReplies: [
      "Gut zu wissen, morgen ist eine lange Einheit geplant.",
      "Nach dem späten Essen habe ich wieder schlecht geschlafen.",
      "Kann ich den Shake auch durch Topfen ersetzen?",
      "Danke, probiere ich diese Woche aus.",
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
    chatReplies: [
      "Beschwerden sind zum Glück keine gekommen.",
      "Beim Einkaufen bin ich unsicher, was ich nehmen darf.",
      "Reisbrei jeden Morgen wird langsam fad 😅",
      "Okay, ich trage es gleich ein.",
    ],
  },
];
