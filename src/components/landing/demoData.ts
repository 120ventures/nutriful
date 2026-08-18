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
  /** Counselling focus, e.g. "Ernährungsumstellung" - the day count is derived. */
  focus: string;
  totalDays: number;
  /** Today in the program - days beyond this are not tracked yet. */
  currentDay: number;
  phases: DemoPhase[];
  /** Entries per tracked day, keyed by day number. */
  days: Record<number, DemoEntry[]>;
  chat: ChatMessage[];
  /** Canned answers the demo client sends back, used in order. */
  chatReplies: string[];
  profile: DemoProfile;
  /** Newest first. "geplant" marks an appointment that has not happened yet. */
  appointments: DemoAppointment[];
};

export type DemoProfile = {
  age: number;
  sex: string;
  height: string;
  weight: string;
  goal: string;
  /** Daily energy requirement in kcal - the plan builder compares against it. */
  energyKcal: number;
  /** How that number was arrived at, so it is not a magic figure. */
  energyBasis: string;
  conditions: string[];
  intolerances: string[];
  medication: string[];
};

/** The demo is anchored to one fixed day so dates and program days line up. */
export const DEMO_TODAY = "Montag, 17. August";

export type DemoAppointment = {
  /** Program day the appointment falls on, so it can sit in the timeline. */
  day: number;
  time: string;
  date: string;
  title: string;
  note: string;
  /** What was agreed - the record a practitioner has to keep anyway. */
  protocol?: string[];
  planned?: boolean;
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
  /** Rough energy per portion. Demo values, rounded on purpose. */
  kcal: number;
  /** What this recipe delivers a lot of - also searchable, e.g. "Eisen". */
  highlights: string[];
  /** Every diet this block is suitable for - a block matches all active filters. */
  diets: Diet[];
};

export type PlanGoal = { id: string; label: string; hint: string; blocks: PlanBlock[] };

const ALL: Diet[] = ["vegetarisch", "vegan", "laktosefrei", "halal"];
const VEGGIE_LF: Diet[] = ["vegetarisch", "laktosefrei", "halal"];
const VEGGIE_DAIRY: Diet[] = ["vegetarisch", "halal"];
const MEAT: Diet[] = ["laktosefrei", "halal"];
const NONE: Diet[] = [];

/** Recipes a practitioner picks from when assembling a plan. */
export const planGoals: PlanGoal[] = [
  {
    id: "umstellung",
    label: "Ernährungsumstellung",
    hint: "Ausgewogen, alltagstauglich, ohne Verbote",
    blocks: [
      { id: "u1", slot: "Frühstück", icon: "🥣", text: "Porridge mit Beeren", ingredients: ["Haferflocken", "Milch", "Beeren", "Zimt"], kcal: 380, highlights: ["Ballaststoffe", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "u10", slot: "Frühstück", icon: "🌾", text: "Haferdrink-Porridge mit Apfel", ingredients: ["Haferflocken", "Haferdrink", "Apfel", "Zimt"], kcal: 350, highlights: ["Ballaststoffe", "Magnesium"], diets: ALL },
      { id: "u2", slot: "Frühstück", icon: "🍳", text: "Rührei mit Tomaten", ingredients: ["Eier", "Tomaten", "Olivenöl", "Schnittlauch"], kcal: 320, highlights: ["Eiweiß", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "u9", slot: "Frühstück", icon: "🥓", text: "Vollkornbrot mit Schinken", ingredients: ["Vollkornbrot", "Schinken", "Butter", "Gurke"], kcal: 340, highlights: ["Eiweiß", "Ballaststoffe"], diets: NONE },
      { id: "u3", slot: "Mittag", icon: "🍚", text: "Reis mit Hühnchen und Gemüse", ingredients: ["Reis", "Hühnerbrust", "Karotten", "Brokkoli"], kcal: 560, highlights: ["Eiweiß", "Vitamin C"], diets: MEAT },
      { id: "u4", slot: "Mittag", icon: "🥗", text: "Großer Salat mit Ei", ingredients: ["Blattsalat", "Eier", "Tomaten", "Olivenöl"], kcal: 420, highlights: ["Eiweiß", "Folsäure"], diets: VEGGIE_LF },
      { id: "u11", slot: "Mittag", icon: "🫘", text: "Linsensalat mit Ofengemüse", ingredients: ["Linsen", "Zucchini", "Paprika", "Olivenöl"], kcal: 480, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
      { id: "u12", slot: "Mittag", icon: "🥙", text: "Falafel-Bowl mit Hummus", ingredients: ["Kichererbsen", "Bulgur", "Gurke", "Tahin"], kcal: 540, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
      { id: "u5", slot: "Abend", icon: "🐟", text: "Fisch mit Kartoffeln", ingredients: ["Kabeljau", "Kartoffeln", "Zitrone", "Petersilie"], kcal: 460, highlights: ["Eiweiß", "Jod"], diets: MEAT },
      { id: "u6", slot: "Abend", icon: "🍲", text: "Gemüseeintopf", ingredients: ["Karotten", "Sellerie", "Kartoffeln", "Lauch"], kcal: 320, highlights: ["Beta-Carotin", "Kalium"], diets: ALL },
      { id: "u13", slot: "Abend", icon: "🎃", text: "Ofenkürbis mit Feta", ingredients: ["Kürbis", "Feta", "Kürbiskerne", "Olivenöl"], kcal: 430, highlights: ["Calcium", "Beta-Carotin"], diets: VEGGIE_DAIRY },
      { id: "u14", slot: "Abend", icon: "🍜", text: "Gemüsecurry mit Reis", ingredients: ["Reis", "Kokosmilch", "Brokkoli", "Karotten"], kcal: 520, highlights: ["Vitamin C", "Ballaststoffe"], diets: ALL },
      { id: "u7", slot: "Snack", icon: "🍎", text: "Apfel mit Nüssen", ingredients: ["Apfel", "Walnüsse"], kcal: 210, highlights: ["Ballaststoffe", "Magnesium"], diets: ALL },
      { id: "u8", slot: "Snack", icon: "🥕", text: "Gemüsesticks mit Hummus", ingredients: ["Karotten", "Paprika", "Kichererbsen", "Tahin"], kcal: 180, highlights: ["Ballaststoffe", "Vitamin C"], diets: ALL },
      { id: "u15", slot: "Snack", icon: "🥛", text: "Naturjoghurt mit Beeren", ingredients: ["Joghurt", "Beeren", "Leinsamen"], kcal: 160, highlights: ["Calcium", "Eiweiß"], diets: VEGGIE_DAIRY },
      { id: "u16", slot: "Snack", icon: "🍐", text: "Birne mit Mandeln", ingredients: ["Birne", "Mandeln"], kcal: 190, highlights: ["Ballaststoffe", "Vitamin E"], diets: ALL },
    ],
  },
  {
    id: "gewicht",
    label: "Gewichtsmanagement",
    hint: "Sättigend bei moderater Energiedichte",
    blocks: [
      { id: "g1", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkornbrot", ingredients: ["Eier", "Vollkornbrot", "Tomaten"], kcal: 330, highlights: ["Eiweiß", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "g2", slot: "Frühstück", icon: "🥛", text: "Topfen mit Beeren", ingredients: ["Topfen", "Beeren", "Leinsamen"], kcal: 260, highlights: ["Eiweiß", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "g9", slot: "Frühstück", icon: "🥣", text: "Haferbrei mit Zimt", ingredients: ["Haferflocken", "Wasser", "Zimt", "Apfel"], kcal: 300, highlights: ["Ballaststoffe", "Magnesium"], diets: ALL },
      { id: "g11", slot: "Frühstück", icon: "🌱", text: "Sojajoghurt mit Chiasamen", ingredients: ["Sojajoghurt", "Chiasamen", "Heidelbeeren"], kcal: 280, highlights: ["Eiweiß", "Ballaststoffe"], diets: ALL },
      { id: "g3", slot: "Mittag", icon: "🥗", text: "Salat mit Hühnerbrust", ingredients: ["Blattsalat", "Hühnerbrust", "Gurke", "Essig-Öl-Dressing"], kcal: 420, highlights: ["Eiweiß", "Folsäure"], diets: MEAT },
      { id: "g4", slot: "Mittag", icon: "🍲", text: "Gemüsesuppe mit Linsen", ingredients: ["Linsen", "Karotten", "Sellerie", "Zwiebel"], kcal: 380, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
      { id: "g12", slot: "Mittag", icon: "🐟", text: "Thunfischsalat mit Bohnen", ingredients: ["Thunfisch", "Weiße Bohnen", "Zwiebel", "Petersilie"], kcal: 440, highlights: ["Eiweiß", "Eisen"], diets: MEAT },
      { id: "g13", slot: "Mittag", icon: "🥦", text: "Brokkoli-Quinoa-Bowl", ingredients: ["Quinoa", "Brokkoli", "Kichererbsen", "Zitrone"], kcal: 460, highlights: ["Eiweiß", "Vitamin C"], diets: ALL },
      { id: "g5", slot: "Abend", icon: "🐟", text: "Lachs mit Brokkoli", ingredients: ["Lachs", "Brokkoli", "Zitrone"], kcal: 480, highlights: ["Omega-3", "Vitamin D"], diets: MEAT },
      { id: "g6", slot: "Abend", icon: "🥒", text: "Bunter Teller mit Ei", ingredients: ["Eier", "Paprika", "Gurke", "Vollkornbrot"], kcal: 390, highlights: ["Eiweiß", "Vitamin C"], diets: VEGGIE_LF },
      { id: "g10", slot: "Abend", icon: "🍠", text: "Ofengemüse mit Kichererbsen", ingredients: ["Kichererbsen", "Karotten", "Zucchini", "Olivenöl"], kcal: 420, highlights: ["Ballaststoffe", "Beta-Carotin"], diets: ALL },
      { id: "g14", slot: "Abend", icon: "🍜", text: "Zucchininudeln mit Tofu", ingredients: ["Zucchini", "Tofu", "Tomaten", "Basilikum"], kcal: 350, highlights: ["Eiweiß", "Calcium"], diets: ALL },
      { id: "g7", slot: "Snack", icon: "🥜", text: "Handvoll Mandeln", ingredients: ["Mandeln"], kcal: 170, highlights: ["Magnesium", "Vitamin E"], diets: ALL },
      { id: "g8", slot: "Snack", icon: "🍓", text: "Beeren", ingredients: ["Heidelbeeren", "Himbeeren"], kcal: 60, highlights: ["Vitamin C", "Ballaststoffe"], diets: ALL },
      { id: "g15", slot: "Snack", icon: "🥚", text: "Gekochtes Ei", ingredients: ["Ei", "Salz", "Pfeffer"], kcal: 80, highlights: ["Eiweiß", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "g16", slot: "Snack", icon: "🥕", text: "Karotten mit Skyr-Dip", ingredients: ["Karotten", "Skyr", "Kräuter"], kcal: 130, highlights: ["Eiweiß", "Beta-Carotin"], diets: VEGGIE_DAIRY },
    ],
  },
  {
    id: "sport",
    label: "Sporternährung",
    hint: "Kohlenhydrate und Eiweiß um die Einheit herum",
    blocks: [
      { id: "s1", slot: "Frühstück", icon: "🥣", text: "Haferflocken mit Whey", ingredients: ["Haferflocken", "Whey-Protein", "Milch", "Banane"], kcal: 520, highlights: ["Eiweiß", "Kalium"], diets: VEGGIE_DAIRY },
      { id: "s2", slot: "Frühstück", icon: "🍳", text: "Eier mit Vollkorntoast", ingredients: ["Eier", "Vollkorntoast", "Avocado"], kcal: 480, highlights: ["Eiweiß", "Kalium"], diets: VEGGIE_LF },
      { id: "s9", slot: "Frühstück", icon: "🌱", text: "Sojajoghurt mit Haferflocken", ingredients: ["Sojajoghurt", "Haferflocken", "Beeren"], kcal: 400, highlights: ["Eiweiß", "Ballaststoffe"], diets: ALL },
      { id: "s13", slot: "Frühstück", icon: "🥞", text: "Haferpfannkuchen mit Topfen", ingredients: ["Haferflocken", "Eier", "Topfen", "Honig"], kcal: 540, highlights: ["Eiweiß", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "s3", slot: "Mittag", icon: "🍗", text: "Hühnchen, Reis, Brokkoli", ingredients: ["Hühnerbrust", "Reis", "Brokkoli"], kcal: 620, highlights: ["Eiweiß", "Vitamin C"], diets: MEAT },
      { id: "s4", slot: "Mittag", icon: "🍝", text: "Pasta mit Putenragout", ingredients: ["Vollkornpasta", "Putenfleisch", "Tomaten", "Zwiebel"], kcal: 650, highlights: ["Eiweiß", "Ballaststoffe"], diets: MEAT },
      { id: "s10", slot: "Mittag", icon: "🫘", text: "Linsen-Bolognese mit Vollkornpasta", ingredients: ["Rote Linsen", "Vollkornpasta", "Tomaten", "Karotten"], kcal: 600, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
      { id: "s14", slot: "Mittag", icon: "🌯", text: "Hühnchen-Wrap mit Gemüse", ingredients: ["Vollkornwrap", "Hühnerbrust", "Paprika", "Hummus"], kcal: 580, highlights: ["Eiweiß", "Vitamin C"], diets: MEAT },
      { id: "s5", slot: "Abend", icon: "🐟", text: "Lachs mit Süßkartoffel", ingredients: ["Lachs", "Süßkartoffel", "Spinat"], kcal: 610, highlights: ["Omega-3", "Beta-Carotin"], diets: MEAT },
      { id: "s6", slot: "Abend", icon: "🍚", text: "Reis mit Rindfleisch", ingredients: ["Reis", "Rindfleisch", "Paprika"], kcal: 640, highlights: ["Eiweiß", "Eisen"], diets: MEAT },
      { id: "s11", slot: "Abend", icon: "🍜", text: "Tofu-Pfanne mit Reis", ingredients: ["Tofu", "Reis", "Brokkoli", "Sojasauce"], kcal: 550, highlights: ["Eiweiß", "Calcium"], diets: ALL },
      { id: "s15", slot: "Abend", icon: "🥘", text: "Kichererbsen-Curry mit Reis", ingredients: ["Kichererbsen", "Reis", "Kokosmilch", "Spinat"], kcal: 590, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
      { id: "s7", slot: "Snack", icon: "🥤", text: "Shake nach der Einheit", ingredients: ["Whey-Protein", "Milch", "Banane"], kcal: 280, highlights: ["Eiweiß", "Kalium"], diets: VEGGIE_DAIRY },
      { id: "s8", slot: "Snack", icon: "🍌", text: "Banane mit Topfen", ingredients: ["Banane", "Topfen", "Honig"], kcal: 250, highlights: ["Eiweiß", "Kalium"], diets: VEGGIE_DAIRY },
      { id: "s12", slot: "Snack", icon: "🥜", text: "Erdnussbutter-Brot", ingredients: ["Vollkornbrot", "Erdnussbutter", "Banane"], kcal: 320, highlights: ["Eiweiß", "Magnesium"], diets: ALL },
      { id: "s16", slot: "Snack", icon: "🍘", text: "Reiswaffeln mit Hummus", ingredients: ["Reiswaffeln", "Hummus", "Paprika"], kcal: 220, highlights: ["Ballaststoffe", "Eisen"], diets: ALL },
    ],
  },
  {
    id: "intoleranz",
    label: "Intoleranz-Karenz",
    hint: "Verträglich in der Karenzphase, gut dokumentierbar",
    blocks: [
      { id: "i1", slot: "Frühstück", icon: "🍚", text: "Reisbrei mit Banane", ingredients: ["Reis", "Wasser", "Banane"], kcal: 340, highlights: ["Kalium", "leicht verdaulich"], diets: ALL },
      { id: "i2", slot: "Frühstück", icon: "🥣", text: "Hirsebrei", ingredients: ["Hirse", "Wasser", "Zimt"], kcal: 320, highlights: ["Magnesium", "Eisen"], diets: ALL },
      { id: "i10", slot: "Frühstück", icon: "🍐", text: "Buchweizenbrei mit Birne", ingredients: ["Buchweizen", "Wasser", "Birne"], kcal: 330, highlights: ["Ballaststoffe", "Magnesium"], diets: ALL },
      { id: "i11", slot: "Frühstück", icon: "🥔", text: "Kartoffelpuffer mit Apfelmus", ingredients: ["Kartoffeln", "Apfelmus", "Olivenöl"], kcal: 360, highlights: ["Kalium", "Vitamin C"], diets: ALL },
      { id: "i3", slot: "Mittag", icon: "🍗", text: "Hühnchen mit Reis", ingredients: ["Hühnerbrust", "Reis", "Karotten"], kcal: 520, highlights: ["Eiweiß", "Beta-Carotin"], diets: MEAT },
      { id: "i9", slot: "Mittag", icon: "🥔", text: "Kartoffel-Gemüse-Pfanne", ingredients: ["Kartoffeln", "Karotten", "Zucchini", "Olivenöl"], kcal: 430, highlights: ["Kalium", "Beta-Carotin"], diets: ALL },
      { id: "i12", slot: "Mittag", icon: "🍜", text: "Reisnudeln mit Gemüse", ingredients: ["Reisnudeln", "Zucchini", "Karotten", "Sesamöl"], kcal: 470, highlights: ["Beta-Carotin", "leicht verdaulich"], diets: ALL },
      { id: "i13", slot: "Mittag", icon: "🍗", text: "Pute mit Kartoffelpüree", ingredients: ["Putenfleisch", "Kartoffeln", "Haferdrink", "Petersilie"], kcal: 500, highlights: ["Eiweiß", "Kalium"], diets: MEAT },
      { id: "i4", slot: "Abend", icon: "🐟", text: "Fisch mit Kartoffeln", ingredients: ["Kabeljau", "Kartoffeln", "Petersilie"], kcal: 440, highlights: ["Eiweiß", "Jod"], diets: MEAT },
      { id: "i5", slot: "Abend", icon: "🍲", text: "Gemüseeintopf", ingredients: ["Karotten", "Kartoffeln", "Sellerie"], kcal: 310, highlights: ["Beta-Carotin", "Kalium"], diets: ALL },
      { id: "i6", slot: "Abend", icon: "🥕", text: "Gemüsepfanne", ingredients: ["Zucchini", "Karotten", "Paprika", "Olivenöl"], kcal: 290, highlights: ["Vitamin C", "Beta-Carotin"], diets: ALL },
      { id: "i14", slot: "Abend", icon: "🎃", text: "Kürbissuppe mit Reis", ingredients: ["Kürbis", "Reis", "Ingwer", "Olivenöl"], kcal: 360, highlights: ["Beta-Carotin", "Kalium"], diets: ALL },
      { id: "i7", slot: "Snack", icon: "🍌", text: "Banane", ingredients: ["Banane"], kcal: 90, highlights: ["Kalium"], diets: ALL },
      { id: "i8", slot: "Snack", icon: "🍐", text: "Birne", ingredients: ["Birne"], kcal: 60, highlights: ["Ballaststoffe"], diets: ALL },
      { id: "i15", slot: "Snack", icon: "🍘", text: "Reiswaffeln mit Banane", ingredients: ["Reiswaffeln", "Banane"], kcal: 150, highlights: ["Kalium", "leicht verdaulich"], diets: ALL },
      { id: "i16", slot: "Snack", icon: "🥒", text: "Gurkensticks mit Olivenöl", ingredients: ["Gurke", "Olivenöl", "Kräuter"], kcal: 90, highlights: ["Vitamin K"], diets: ALL },
    ],
  },
];

export const demoClients: DemoClient[] = [
  {
    id: "lisa",
    name: "Lisa M.",
    program: "30-Tage-Programm",
    focus: "Ernährungsumstellung",
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
    profile: {
      age: 34,
      sex: "weiblich",
      height: "168 cm",
      weight: "74 kg",
      goal: "Ernährung umstellen, mehr Energie im Alltag",
      energyKcal: 2000,
      energyBasis: "Grundumsatz 1.430 kcal, PAL 1,4 (überwiegend sitzend)",
      conditions: ["Hashimoto-Thyreoiditis, gut eingestellt"],
      intolerances: ["keine bekannt"],
      medication: ["L-Thyroxin 50 µg"],
    },
    appointments: [
      {
        day: 9,
        time: "09:30",
        date: "17.08.2026",
        title: "Zwischentermin",
        note: "Auswertung der Analysephase, Umstellung planen",
        planned: true,
      },
      {
        day: 8,
        time: "16:15",
        date: "16.08.2026",
        title: "Telefonisches Check-in",
        note: "Analysephase abgeschlossen",
        protocol: [
          "Analysephase abgeschlossen, 7 von 7 Tagen getrackt",
          "Auffällig: unregelmäßiges Frühstück, Nachmittagstief an vier Tagen",
          "Vereinbart: fixe Zwischenmahlzeit am Nachmittag, Frühstück nicht auslassen",
        ],
      },
      {
        day: 1,
        time: "10:00",
        date: "09.08.2026",
        title: "Erstgespräch",
        note: "Anamnese und Start des 30-Tage-Programms",
        protocol: [
          "Anamnese: Hashimoto-Thyreoiditis, gut eingestellt unter L-Thyroxin 50 µg",
          "Ziel: mehr Energie im Alltag, weniger Heißhunger am Nachmittag",
          "Vereinbart: sieben Tage Analysephase, alles erfassen ohne zu verändern",
        ],
      },
    ],
  },
  {
    id: "markus",
    name: "Markus T.",
    program: "30-Tage-Programm",
    focus: "Sporternährung",
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
    profile: {
      age: 29,
      sex: "männlich",
      height: "182 cm",
      weight: "78 kg",
      goal: "Leistungsaufbau, Ernährung rund um vier Einheiten pro Woche",
      energyKcal: 2900,
      energyBasis: "Grundumsatz 1.820 kcal, PAL 1,6 (Training an vier Tagen)",
      conditions: ["keine"],
      intolerances: ["keine bekannt"],
      medication: ["keine"],
    },
    appointments: [
      {
        day: 5,
        time: "11:00",
        date: "17.08.2026",
        title: "Zwischentermin",
        note: "Timing rund um die Einheiten festlegen",
        planned: true,
      },
      {
        day: 1,
        time: "17:30",
        date: "13.08.2026",
        title: "Erstgespräch",
        note: "Trainingsplan gesichtet, Programm gestartet",
        protocol: [
          "Trainingsplan gesichtet: vier Einheiten pro Woche, davon zwei am Morgen",
          "Ziel: Leistungsaufbau ohne unnötige Gewichtszunahme",
          "Vereinbart: fünf Tage Bestandsaufnahme inklusive Trainingszeiten",
        ],
      },
    ],
  },
  {
    id: "anna",
    name: "Anna K.",
    program: "21-Tage-Programm",
    focus: "Intoleranz-Abklärung",
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
      { from: "client", text: "Darf ich in der Karenz eigentlich Sojajoghurt essen?" },
    ],
    chatReplies: [
      "Beschwerden sind zum Glück keine gekommen.",
      "Beim Einkaufen bin ich unsicher, was ich nehmen darf.",
      "Reisbrei jeden Morgen wird langsam fad 😅",
      "Okay, ich trage es gleich ein.",
    ],
    profile: {
      age: 41,
      sex: "weiblich",
      height: "165 cm",
      weight: "62 kg",
      goal: "Beschwerden nach dem Essen abklären",
      energyKcal: 1900,
      energyBasis: "Grundumsatz 1.360 kcal, PAL 1,4 (überwiegend sitzend)",
      conditions: ["Verdacht auf Reizdarmsyndrom", "Eisenmangel 2025, behandelt"],
      intolerances: ["Laktose (H2-Atemtest positiv)", "Weizen in Abklärung"],
      medication: ["keine"],
    },
    appointments: [
      {
        day: 5,
        time: "14:30",
        date: "17.08.2026",
        title: "Zwischenkontrolle",
        note: "Symptomtagebuch besprechen, Provokation planen",
        planned: true,
      },
      {
        day: 1,
        time: "08:45",
        date: "13.08.2026",
        title: "Erstgespräch",
        note: "Anamnese und Start der Karenzphase",
        protocol: [
          "Beschwerdebild: Blähungen und Völlegefühl, meist nachmittags",
          "Vorbefunde: H2-Atemtest auf Laktose positiv, Eisenmangel 2025 behandelt",
          "Vereinbart: 14 Tage Karenz, Symptome täglich dokumentieren",
        ],
      },
    ],
  },
];
