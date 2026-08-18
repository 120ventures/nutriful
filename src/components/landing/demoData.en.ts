// English demo data. Same shape and same ids as the German set in demoData.ts,
// so both languages drive the identical components.

import type {
  DemoAppointment,
  DemoClient,
  Diet,
  MealSlot,
  PlanGoal,
} from "./demoData";

export const DEMO_TODAY = "Monday, 17 August";

export const mealSlots: MealSlot[] = ["breakfast", "lunch", "dinner", "snack"];

export const mealLabels: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

export const dietFilters: { id: Diet; label: string }[] = [
  { id: "vegetarisch", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "laktosefrei", label: "Lactose-free" },
  { id: "halal", label: "Halal" },
];

export const quickReplies = [
  "How did the weekend go?",
  "Could you send me a photo of your dinner?",
  "Does next week's appointment still suit you?",
];

const ALL: Diet[] = ["vegetarisch", "vegan", "laktosefrei", "halal"];
const VEGGIE_LF: Diet[] = ["vegetarisch", "laktosefrei", "halal"];
const VEGGIE_DAIRY: Diet[] = ["vegetarisch", "halal"];
const MEAT: Diet[] = ["laktosefrei", "halal"];
const NONE: Diet[] = [];

export const planGoals: PlanGoal[] = [
  {
    id: "umstellung",
    label: "Dietary change",
    hint: "Balanced, workable day to day, nothing forbidden",
    blocks: [
      { id: "u1", slot: "breakfast", icon: "🥣", text: "Porridge with berries", ingredients: ["Oats", "Milk", "Berries", "Cinnamon"], kcal: 380, highlights: ["Fibre", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "u10", slot: "breakfast", icon: "🌾", text: "Oat-drink porridge with apple", ingredients: ["Oats", "Oat drink", "Apple", "Cinnamon"], kcal: 350, highlights: ["Fibre", "Magnesium"], diets: ALL },
      { id: "u2", slot: "breakfast", icon: "🍳", text: "Scrambled eggs with tomatoes", ingredients: ["Eggs", "Tomatoes", "Olive oil", "Chives"], kcal: 320, highlights: ["Protein", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "u9", slot: "breakfast", icon: "🥓", text: "Wholegrain bread with ham", ingredients: ["Wholegrain bread", "Ham", "Butter", "Cucumber"], kcal: 340, highlights: ["Protein", "Fibre"], diets: NONE },
      { id: "u3", slot: "lunch", icon: "🍚", text: "Rice with chicken and vegetables", ingredients: ["Rice", "Chicken breast", "Carrots", "Broccoli"], kcal: 560, highlights: ["Protein", "Vitamin C"], diets: MEAT },
      { id: "u4", slot: "lunch", icon: "🥗", text: "Large salad with egg", ingredients: ["Leaf salad", "Eggs", "Tomatoes", "Olive oil"], kcal: 420, highlights: ["Protein", "Folate"], diets: VEGGIE_LF },
      { id: "u11", slot: "lunch", icon: "🫘", text: "Lentil salad with roast vegetables", ingredients: ["Lentils", "Courgette", "Peppers", "Olive oil"], kcal: 480, highlights: ["Fibre", "Iron"], diets: ALL },
      { id: "u12", slot: "lunch", icon: "🥙", text: "Falafel bowl with hummus", ingredients: ["Chickpeas", "Bulgur", "Cucumber", "Tahini"], kcal: 540, highlights: ["Fibre", "Iron"], diets: ALL },
      { id: "u5", slot: "dinner", icon: "🐟", text: "Fish with potatoes", ingredients: ["Cod", "Potatoes", "Lemon", "Parsley"], kcal: 460, highlights: ["Protein", "Iodine"], diets: MEAT },
      { id: "u6", slot: "dinner", icon: "🍲", text: "Vegetable stew", ingredients: ["Carrots", "Celeriac", "Potatoes", "Leek"], kcal: 320, highlights: ["Beta-carotene", "Potassium"], diets: ALL },
      { id: "u13", slot: "dinner", icon: "🎃", text: "Roast pumpkin with feta", ingredients: ["Pumpkin", "Feta", "Pumpkin seeds", "Olive oil"], kcal: 430, highlights: ["Calcium", "Beta-carotene"], diets: VEGGIE_DAIRY },
      { id: "u14", slot: "dinner", icon: "🍜", text: "Vegetable curry with rice", ingredients: ["Rice", "Coconut milk", "Broccoli", "Carrots"], kcal: 520, highlights: ["Vitamin C", "Fibre"], diets: ALL },
      { id: "u7", slot: "snack", icon: "🍎", text: "Apple with nuts", ingredients: ["Apple", "Walnuts"], kcal: 210, highlights: ["Fibre", "Magnesium"], diets: ALL },
      { id: "u8", slot: "snack", icon: "🥕", text: "Vegetable sticks with hummus", ingredients: ["Carrots", "Peppers", "Chickpeas", "Tahini"], kcal: 180, highlights: ["Fibre", "Vitamin C"], diets: ALL },
      { id: "u15", slot: "snack", icon: "🥛", text: "Plain yoghurt with berries", ingredients: ["Yoghurt", "Berries", "Linseed"], kcal: 160, highlights: ["Calcium", "Protein"], diets: VEGGIE_DAIRY },
      { id: "u16", slot: "snack", icon: "🍐", text: "Pear with almonds", ingredients: ["Pear", "Almonds"], kcal: 190, highlights: ["Fibre", "Vitamin E"], diets: ALL },
    ],
  },
  {
    id: "gewicht",
    label: "Weight management",
    hint: "Filling, at a moderate energy density",
    blocks: [
      { id: "g1", slot: "breakfast", icon: "🍳", text: "Eggs with wholegrain bread", ingredients: ["Eggs", "Wholegrain bread", "Tomatoes"], kcal: 330, highlights: ["Protein", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "g2", slot: "breakfast", icon: "🥛", text: "Quark with berries", ingredients: ["Quark", "Berries", "Linseed"], kcal: 260, highlights: ["Protein", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "g9", slot: "breakfast", icon: "🥣", text: "Porridge with cinnamon", ingredients: ["Oats", "Water", "Cinnamon", "Apple"], kcal: 300, highlights: ["Fibre", "Magnesium"], diets: ALL },
      { id: "g11", slot: "breakfast", icon: "🌱", text: "Soy yoghurt with chia seeds", ingredients: ["Soy yoghurt", "Chia seeds", "Blueberries"], kcal: 280, highlights: ["Protein", "Fibre"], diets: ALL },
      { id: "g3", slot: "lunch", icon: "🥗", text: "Salad with chicken breast", ingredients: ["Leaf salad", "Chicken breast", "Cucumber", "Vinaigrette"], kcal: 420, highlights: ["Protein", "Folate"], diets: MEAT },
      { id: "g4", slot: "lunch", icon: "🍲", text: "Vegetable soup with lentils", ingredients: ["Lentils", "Carrots", "Celeriac", "Onion"], kcal: 380, highlights: ["Fibre", "Iron"], diets: ALL },
      { id: "g12", slot: "lunch", icon: "🐟", text: "Tuna salad with white beans", ingredients: ["Tuna", "White beans", "Onion", "Parsley"], kcal: 440, highlights: ["Protein", "Iron"], diets: MEAT },
      { id: "g13", slot: "lunch", icon: "🥦", text: "Broccoli quinoa bowl", ingredients: ["Quinoa", "Broccoli", "Chickpeas", "Lemon"], kcal: 460, highlights: ["Protein", "Vitamin C"], diets: ALL },
      { id: "g5", slot: "dinner", icon: "🐟", text: "Salmon with broccoli", ingredients: ["Salmon", "Broccoli", "Lemon"], kcal: 480, highlights: ["Omega-3", "Vitamin D"], diets: MEAT },
      { id: "g6", slot: "dinner", icon: "🥒", text: "Colourful plate with egg", ingredients: ["Eggs", "Peppers", "Cucumber", "Wholegrain bread"], kcal: 390, highlights: ["Protein", "Vitamin C"], diets: VEGGIE_LF },
      { id: "g10", slot: "dinner", icon: "🍠", text: "Roast vegetables with chickpeas", ingredients: ["Chickpeas", "Carrots", "Courgette", "Olive oil"], kcal: 420, highlights: ["Fibre", "Beta-carotene"], diets: ALL },
      { id: "g14", slot: "dinner", icon: "🍜", text: "Courgette noodles with tofu", ingredients: ["Courgette", "Tofu", "Tomatoes", "Basil"], kcal: 350, highlights: ["Protein", "Calcium"], diets: ALL },
      { id: "g7", slot: "snack", icon: "🥜", text: "A handful of almonds", ingredients: ["Almonds"], kcal: 170, highlights: ["Magnesium", "Vitamin E"], diets: ALL },
      { id: "g8", slot: "snack", icon: "🍓", text: "Berries", ingredients: ["Blueberries", "Raspberries"], kcal: 60, highlights: ["Vitamin C", "Fibre"], diets: ALL },
      { id: "g15", slot: "snack", icon: "🥚", text: "Boiled egg", ingredients: ["Egg", "Salt", "Pepper"], kcal: 80, highlights: ["Protein", "Vitamin B12"], diets: VEGGIE_LF },
      { id: "g16", slot: "snack", icon: "🥕", text: "Carrots with skyr dip", ingredients: ["Carrots", "Skyr", "Herbs"], kcal: 130, highlights: ["Protein", "Beta-carotene"], diets: VEGGIE_DAIRY },
    ],
  },
  {
    id: "sport",
    label: "Sports nutrition",
    hint: "Carbohydrates and protein around the session",
    blocks: [
      { id: "s1", slot: "breakfast", icon: "🥣", text: "Oats with whey", ingredients: ["Oats", "Whey protein", "Milk", "Banana"], kcal: 520, highlights: ["Protein", "Potassium"], diets: VEGGIE_DAIRY },
      { id: "s2", slot: "breakfast", icon: "🍳", text: "Eggs with wholegrain toast", ingredients: ["Eggs", "Wholegrain toast", "Avocado"], kcal: 480, highlights: ["Protein", "Potassium"], diets: VEGGIE_LF },
      { id: "s9", slot: "breakfast", icon: "🌱", text: "Soy yoghurt with oats", ingredients: ["Soy yoghurt", "Oats", "Berries"], kcal: 400, highlights: ["Protein", "Fibre"], diets: ALL },
      { id: "s13", slot: "breakfast", icon: "🥞", text: "Oat pancakes with quark", ingredients: ["Oats", "Eggs", "Quark", "Honey"], kcal: 540, highlights: ["Protein", "Calcium"], diets: VEGGIE_DAIRY },
      { id: "s3", slot: "lunch", icon: "🍗", text: "Chicken, rice, broccoli", ingredients: ["Chicken breast", "Rice", "Broccoli"], kcal: 620, highlights: ["Protein", "Vitamin C"], diets: MEAT },
      { id: "s4", slot: "lunch", icon: "🍝", text: "Pasta with turkey ragout", ingredients: ["Wholegrain pasta", "Turkey", "Tomatoes", "Onion"], kcal: 650, highlights: ["Protein", "Fibre"], diets: MEAT },
      { id: "s10", slot: "lunch", icon: "🫘", text: "Lentil bolognese with wholegrain pasta", ingredients: ["Red lentils", "Wholegrain pasta", "Tomatoes", "Carrots"], kcal: 600, highlights: ["Fibre", "Iron"], diets: ALL },
      { id: "s14", slot: "lunch", icon: "🌯", text: "Chicken wrap with vegetables", ingredients: ["Wholegrain wrap", "Chicken breast", "Peppers", "Hummus"], kcal: 580, highlights: ["Protein", "Vitamin C"], diets: MEAT },
      { id: "s5", slot: "dinner", icon: "🐟", text: "Salmon with sweet potato", ingredients: ["Salmon", "Sweet potato", "Spinach"], kcal: 610, highlights: ["Omega-3", "Beta-carotene"], diets: MEAT },
      { id: "s6", slot: "dinner", icon: "🍚", text: "Rice with beef", ingredients: ["Rice", "Beef", "Peppers"], kcal: 640, highlights: ["Protein", "Iron"], diets: MEAT },
      { id: "s11", slot: "dinner", icon: "🍜", text: "Tofu stir-fry with rice", ingredients: ["Tofu", "Rice", "Broccoli", "Soy sauce"], kcal: 550, highlights: ["Protein", "Calcium"], diets: ALL },
      { id: "s15", slot: "dinner", icon: "🥘", text: "Chickpea curry with rice", ingredients: ["Chickpeas", "Rice", "Coconut milk", "Spinach"], kcal: 590, highlights: ["Fibre", "Iron"], diets: ALL },
      { id: "s7", slot: "snack", icon: "🥤", text: "Shake after training", ingredients: ["Whey protein", "Milk", "Banana"], kcal: 280, highlights: ["Protein", "Potassium"], diets: VEGGIE_DAIRY },
      { id: "s8", slot: "snack", icon: "🍌", text: "Banana with quark", ingredients: ["Banana", "Quark", "Honey"], kcal: 250, highlights: ["Protein", "Potassium"], diets: VEGGIE_DAIRY },
      { id: "s12", slot: "snack", icon: "🥜", text: "Peanut butter on bread", ingredients: ["Wholegrain bread", "Peanut butter", "Banana"], kcal: 320, highlights: ["Protein", "Magnesium"], diets: ALL },
      { id: "s16", slot: "snack", icon: "🍘", text: "Rice cakes with hummus", ingredients: ["Rice cakes", "Hummus", "Peppers"], kcal: 220, highlights: ["Fibre", "Iron"], diets: ALL },
    ],
  },
  {
    id: "intoleranz",
    label: "Intolerance elimination",
    hint: "Tolerated during the elimination phase, easy to document",
    blocks: [
      { id: "i1", slot: "breakfast", icon: "🍚", text: "Rice porridge with banana", ingredients: ["Rice", "Water", "Banana"], kcal: 340, highlights: ["Potassium", "easy to digest"], diets: ALL },
      { id: "i2", slot: "breakfast", icon: "🥣", text: "Millet porridge", ingredients: ["Millet", "Water", "Cinnamon"], kcal: 320, highlights: ["Magnesium", "Iron"], diets: ALL },
      { id: "i10", slot: "breakfast", icon: "🍐", text: "Buckwheat porridge with pear", ingredients: ["Buckwheat", "Water", "Pear"], kcal: 330, highlights: ["Fibre", "Magnesium"], diets: ALL },
      { id: "i11", slot: "breakfast", icon: "🥔", text: "Potato fritters with apple sauce", ingredients: ["Potatoes", "Apple sauce", "Olive oil"], kcal: 360, highlights: ["Potassium", "Vitamin C"], diets: ALL },
      { id: "i3", slot: "lunch", icon: "🍗", text: "Chicken with rice", ingredients: ["Chicken breast", "Rice", "Carrots"], kcal: 520, highlights: ["Protein", "Beta-carotene"], diets: MEAT },
      { id: "i9", slot: "lunch", icon: "🥔", text: "Potato and vegetable pan", ingredients: ["Potatoes", "Carrots", "Courgette", "Olive oil"], kcal: 430, highlights: ["Potassium", "Beta-carotene"], diets: ALL },
      { id: "i12", slot: "lunch", icon: "🍜", text: "Rice noodles with vegetables", ingredients: ["Rice noodles", "Courgette", "Carrots", "Sesame oil"], kcal: 470, highlights: ["Beta-carotene", "easy to digest"], diets: ALL },
      { id: "i13", slot: "lunch", icon: "🍗", text: "Turkey with mashed potato", ingredients: ["Turkey", "Potatoes", "Oat drink", "Parsley"], kcal: 500, highlights: ["Protein", "Potassium"], diets: MEAT },
      { id: "i4", slot: "dinner", icon: "🐟", text: "Fish with potatoes", ingredients: ["Cod", "Potatoes", "Parsley"], kcal: 440, highlights: ["Protein", "Iodine"], diets: MEAT },
      { id: "i5", slot: "dinner", icon: "🍲", text: "Vegetable stew", ingredients: ["Carrots", "Potatoes", "Celeriac"], kcal: 310, highlights: ["Beta-carotene", "Potassium"], diets: ALL },
      { id: "i6", slot: "dinner", icon: "🥕", text: "Vegetable pan", ingredients: ["Courgette", "Carrots", "Peppers", "Olive oil"], kcal: 290, highlights: ["Vitamin C", "Beta-carotene"], diets: ALL },
      { id: "i14", slot: "dinner", icon: "🎃", text: "Pumpkin soup with rice", ingredients: ["Pumpkin", "Rice", "Ginger", "Olive oil"], kcal: 360, highlights: ["Beta-carotene", "Potassium"], diets: ALL },
      { id: "i7", slot: "snack", icon: "🍌", text: "Banana", ingredients: ["Banana"], kcal: 90, highlights: ["Potassium"], diets: ALL },
      { id: "i8", slot: "snack", icon: "🍐", text: "Pear", ingredients: ["Pear"], kcal: 60, highlights: ["Fibre"], diets: ALL },
      { id: "i15", slot: "snack", icon: "🍘", text: "Rice cakes with banana", ingredients: ["Rice cakes", "Banana"], kcal: 150, highlights: ["Potassium", "easy to digest"], diets: ALL },
      { id: "i16", slot: "snack", icon: "🥒", text: "Cucumber sticks with olive oil", ingredients: ["Cucumber", "Olive oil", "Herbs"], kcal: 90, highlights: ["Vitamin K"], diets: ALL },
    ],
  },
];

export const demoClients: DemoClient[] = [
  {
    id: "lisa",
    name: "Lisa M.",
    program: "30-day programme",
    focus: "Dietary change",
    totalDays: 30,
    currentDay: 9,
    phases: [
      { label: "Assessment", days: 7 },
      { label: "Transition", days: 14 },
      { label: "Everyday", days: 9 },
    ],
    days: {
      1: [
        { time: "08:00", icon: "\u{1F950}", text: "Breakfast: white roll with butter", tag: "Photo" },
        { time: "12:30", icon: "\u{1F35D}", text: "Lunch: pasta with pesto", tag: "Photo" },
        { time: "20:15", icon: "\u{1F36B}", text: "Note: chocolate in front of the TV", tag: "Note" },
      ],
      2: [
        { time: "07:45", icon: "\u2615", text: "Note: coffee only, no breakfast", tag: "Note" },
        { time: "13:00", icon: "\u{1F957}", text: "Lunch: salad from the canteen", tag: "Photo" },
        { time: "19:30", icon: "\u{1F355}", text: "Dinner: ordered pizza", tag: "Photo" },
      ],
      3: [
        { time: "08:20", icon: "\u{1F373}", text: "Breakfast: scrambled eggs with tomatoes", tag: "Photo" },
        { time: "15:00", icon: "\u2615", text: "Note: cappuccino and a biscuit", tag: "Note" },
        { time: "19:00", icon: "\u{1F372}", text: "Dinner: vegetable soup", tag: "Photo" },
      ],
      4: [
        {
          time: "09:00",
          icon: "\u26A0\uFE0F",
          text: "Note: skipped breakfast, appointment too early",
          tag: "Flagged",
          tone: "warn",
        },
        { time: "13:30", icon: "\u{1F96A}", text: "Lunch: sandwich on the go", tag: "Photo" },
        { time: "21:00", icon: "\u{1F35F}", text: "Late: chips on the way home", tag: "Photo" },
      ],
      5: [
        { time: "08:00", icon: "\u{1F963}", text: "Breakfast: porridge with apple", tag: "Photo" },
        { time: "12:45", icon: "\u{1F35A}", text: "Lunch: rice with chicken", tag: "Photo" },
        { time: "18:30", icon: "\u{1F957}", text: "Dinner: large salad", tag: "Photo" },
      ],
      6: [
        { time: "08:10", icon: "\u{1F950}", text: "Breakfast: croissant to go", tag: "Photo" },
        { time: "14:00", icon: "\u{1F34E}", text: "Snack: apple", tag: "Note" },
        { time: "19:45", icon: "\u{1F35D}", text: "Dinner: pasta with vegetables", tag: "Photo" },
      ],
      7: [
        { time: "08:00", icon: "\u{1F963}", text: "Breakfast: yoghurt with muesli", tag: "Photo" },
        { time: "12:30", icon: "\u{1F959}", text: "Lunch: falafel wrap", tag: "Photo" },
        { time: "20:00", icon: "\u{1F4CB}", text: "Assessment phase completed", tag: "Phase" },
      ],
      8: [
        { time: "08:05", icon: "\u{1F963}", text: "Breakfast: porridge with berries", tag: "Photo" },
        { time: "13:00", icon: "\u{1F41F}", text: "Lunch: salmon with potatoes", tag: "Photo" },
        { time: "19:30", icon: "\u{1F957}", text: "Dinner: salad with egg", tag: "Photo" },
      ],
      9: [
        { time: "08:10", icon: "\u{1F963}", text: "Breakfast: porridge with berries", tag: "Photo" },
        {
          time: "15:20",
          icon: "\u26A0\uFE0F",
          text: "Note: afternoon slump, strong cravings",
          tag: "Flagged",
          tone: "warn",
        },
        { time: "19:45", icon: "\u{1F372}", text: "Dinner: rice with vegetables", tag: "Photo" },
      ],
    },
    chat: [
      { from: "client", text: "Does the afternoon cappuccino count as a snack? \u{1F914}" },
      { from: "you", text: "It does - log it as a snack, then we can see the pattern. \u{1F44D}" },
    ],
    chatReplies: [
      "Understood, I will do that from today.",
      "The afternoon slump was pretty strong again yesterday.",
      "I managed breakfast every day this week \u{1F642}",
      "Fine by me, I will let you know if anything comes up.",
    ],
    profile: {
      age: 34,
      sex: "female",
      height: "168 cm",
      weight: "74 kg",
      goal: "Change her diet, more energy through the day",
      energyKcal: 2000,
      energyBasis: "Basal rate 1,430 kcal, PAL 1.4 (mostly sedentary)",
      conditions: ["Hashimoto's thyroiditis, well controlled"],
      intolerances: ["none known"],
      medication: ["Levothyroxine 50 \u00b5g"],
    },
    appointments: [
      {
        day: 9,
        time: "09:30",
        date: "17/08/2026",
        title: "Review appointment",
        note: "Review the assessment phase, plan the transition",
        planned: true,
      },
      {
        day: 8,
        time: "16:15",
        date: "16/08/2026",
        title: "Phone check-in",
        note: "Assessment phase completed",
        protocol: [
          "Assessment phase completed, 7 of 7 days tracked",
          "Notable: irregular breakfast, afternoon slump on four days",
          "Agreed: a fixed afternoon snack, do not skip breakfast",
        ],
      },
      {
        day: 1,
        time: "10:00",
        date: "09/08/2026",
        title: "First consultation",
        note: "History taken, 30-day programme started",
        protocol: [
          "History: Hashimoto's thyroiditis, well controlled on levothyroxine 50 \u00b5g",
          "Goal: more energy through the day, fewer afternoon cravings",
          "Agreed: seven days of assessment, record everything without changing it",
        ],
      },
    ],
  },
  {
    id: "markus",
    name: "Markus T.",
    program: "30-day programme",
    focus: "Sports nutrition",
    totalDays: 30,
    currentDay: 5,
    phases: [
      { label: "Baseline", days: 5 },
      { label: "Build-up", days: 16 },
      { label: "Stabilisation", days: 9 },
    ],
    days: {
      1: [
        { time: "06:30", icon: "\u{1F964}", text: "Note: shake before the session", tag: "Note" },
        { time: "12:00", icon: "\u{1F357}", text: "Lunch: chicken with rice", tag: "Photo" },
        { time: "19:00", icon: "\u{1F957}", text: "Dinner: salad with tuna", tag: "Photo" },
      ],
      2: [
        { time: "07:00", icon: "\u{1F373}", text: "Breakfast: eggs with wholegrain toast", tag: "Photo" },
        { time: "13:30", icon: "\u{1F35D}", text: "Lunch: pasta after the session", tag: "Photo" },
        { time: "20:00", icon: "\u{1F95B}", text: "Snack: quark with banana", tag: "Note" },
      ],
      3: [
        {
          time: "06:45",
          icon: "\u26A0\uFE0F",
          text: "Note: trained fasted, performance dropped off",
          tag: "Flagged",
          tone: "warn",
        },
        { time: "12:30", icon: "\u{1F35A}", text: "Lunch: rice with turkey", tag: "Photo" },
        { time: "19:15", icon: "\u{1F372}", text: "Dinner: lentil curry", tag: "Photo" },
      ],
      4: [
        { time: "07:15", icon: "\u{1F963}", text: "Breakfast: oats with whey", tag: "Photo" },
        { time: "13:00", icon: "\u{1F959}", text: "Lunch: chicken wrap", tag: "Photo" },
        { time: "18:45", icon: "\u{1F41F}", text: "Dinner: salmon with sweet potato", tag: "Photo" },
      ],
      5: [
        { time: "06:30", icon: "\u{1F964}", text: "Note: shake before the session", tag: "Note" },
        { time: "12:15", icon: "\u{1F357}", text: "Lunch: chicken, rice, broccoli", tag: "Photo" },
        {
          time: "21:30",
          icon: "\u26A0\uFE0F",
          text: "Note: ate late, slept badly",
          tag: "Flagged",
          tone: "warn",
        },
      ],
    },
    chat: [
      { from: "client", text: "Is the shake enough before training or do I need something solid?" },
      {
        from: "you",
        text: "For 90 minutes the shake is fine - from two hours we move to solid carbohydrates.",
      },
    ],
    chatReplies: [
      "Good to know, I have a long session tomorrow.",
      "I slept badly again after eating late.",
      "Could I swap the shake for quark?",
      "Thanks, I will try that this week.",
    ],
    profile: {
      age: 29,
      sex: "male",
      height: "182 cm",
      weight: "78 kg",
      goal: "Build performance, nutrition around four sessions a week",
      energyKcal: 2900,
      energyBasis: "Basal rate 1,820 kcal, PAL 1.6 (training on four days)",
      conditions: ["none"],
      intolerances: ["none known"],
      medication: ["none"],
    },
    appointments: [
      {
        day: 5,
        time: "11:00",
        date: "17/08/2026",
        title: "Review appointment",
        note: "Set the timing around training sessions",
        planned: true,
      },
      {
        day: 1,
        time: "17:30",
        date: "13/08/2026",
        title: "First consultation",
        note: "Training plan reviewed, programme started",
        protocol: [
          "Training plan reviewed: four sessions a week, two of them in the morning",
          "Goal: build performance without unnecessary weight gain",
          "Agreed: five days of baseline recording including training times",
        ],
      },
    ],
  },
  {
    id: "anna",
    name: "Anna K.",
    program: "21-day programme",
    focus: "Intolerance work-up",
    totalDays: 21,
    currentDay: 5,
    phases: [
      { label: "Elimination", days: 14 },
      { label: "Reintroduction", days: 7 },
    ],
    days: {
      1: [
        { time: "08:00", icon: "\u{1F35A}", text: "Breakfast: rice porridge without milk", tag: "Photo" },
        { time: "12:30", icon: "\u{1F957}", text: "Lunch: salad with olive oil", tag: "Photo" },
        { time: "19:00", icon: "\u{1F372}", text: "Dinner: potato soup", tag: "Photo" },
      ],
      2: [
        { time: "08:15", icon: "\u{1F34C}", text: "Breakfast: banana with oat drink", tag: "Photo" },
        { time: "13:00", icon: "\u{1F357}", text: "Lunch: chicken with rice", tag: "Photo" },
        { time: "18:30", icon: "\u{1F955}", text: "Dinner: vegetable pan", tag: "Photo" },
      ],
      3: [
        { time: "08:00", icon: "\u{1F35A}", text: "Breakfast: rice porridge", tag: "Photo" },
        {
          time: "14:00",
          icon: "\u26A0\uFE0F",
          text: "Symptom: bloating after lunch",
          tag: "Flagged",
          tone: "warn",
        },
        { time: "19:30", icon: "\u{1F372}", text: "Dinner: soup", tag: "Photo" },
      ],
      4: [
        { time: "08:10", icon: "\u{1F963}", text: "Breakfast: millet porridge", tag: "Photo" },
        { time: "12:45", icon: "\u{1F41F}", text: "Lunch: fish with potatoes", tag: "Photo" },
        { time: "19:00", icon: "\u{1F957}", text: "Dinner: leaf salad", tag: "Photo" },
      ],
      5: [
        { time: "08:00", icon: "\u{1F35A}", text: "Breakfast: rice porridge with banana", tag: "Photo" },
        {
          time: "13:15",
          icon: "\u26A0\uFE0F",
          text: "Note: ate a wrap - it contained wheat",
          tag: "Flagged",
          tone: "warn",
        },
        { time: "19:45", icon: "\u{1F372}", text: "Dinner: vegetable stew", tag: "Photo" },
      ],
    },
    chat: [
      { from: "client", text: "I ate a wheat wrap by mistake - is the elimination phase ruined?" },
      {
        from: "you",
        text: "Not ruined. We note it down and see whether symptoms turn up this evening.",
      },
      { from: "client", text: "Am I actually allowed soy yoghurt during the elimination phase?" },
    ],
    chatReplies: [
      "No symptoms came up, thankfully.",
      "I am unsure what I am allowed to buy when I shop.",
      "Rice porridge every morning is getting a bit dull \u{1F605}",
      "Alright, I will log it right away.",
    ],
    profile: {
      age: 41,
      sex: "female",
      height: "165 cm",
      weight: "62 kg",
      goal: "Work up her symptoms after eating",
      energyKcal: 1900,
      energyBasis: "Basal rate 1,360 kcal, PAL 1.4 (mostly sedentary)",
      conditions: ["Suspected irritable bowel syndrome", "Iron deficiency 2025, treated"],
      intolerances: ["Lactose (positive H2 breath test)", "Wheat under investigation"],
      medication: ["none"],
    },
    appointments: [
      {
        day: 5,
        time: "14:30",
        date: "17/08/2026",
        title: "Interim check",
        note: "Go through the symptom diary, plan the reintroduction",
        planned: true,
      },
      {
        day: 1,
        time: "08:45",
        date: "13/08/2026",
        title: "First consultation",
        note: "History taken, elimination phase started",
        protocol: [
          "Symptoms: bloating and fullness, mostly in the afternoon",
          "Prior findings: positive H2 breath test for lactose, iron deficiency treated in 2025",
          "Agreed: 14 days of elimination, document symptoms daily",
        ],
      },
    ],
  },
];

export type { DemoAppointment };
