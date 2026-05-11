import type { WorkoutType } from "./exerciseDb";

export type GoalType = "gain" | "lose" | "maintain";

export interface DayPlan {
  day: string;
  focus: string;
  muscles: string[];
  type: "work" | "rest";
}

export type Routines = Record<WorkoutType, Record<GoalType, DayPlan[]>>;

export const ROUTINES: Routines = {
  gym: {
    gain: [
      { day: "Mon", focus: "Chest & Triceps", muscles: ["chest", "arms"], type: "work" },
      { day: "Tue", focus: "Back & Biceps", muscles: ["back", "arms"], type: "work" },
      { day: "Wed", focus: "Rest & Recovery", muscles: [], type: "rest" },
      { day: "Thu", focus: "Legs (Power)", muscles: ["legs"], type: "work" },
      { day: "Fri", focus: "Shoulders & Core", muscles: ["shoulders", "core"], type: "work" },
      { day: "Sat", focus: "Full Body Compound", muscles: ["chest", "back", "legs"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
    lose: [
      { day: "Mon", focus: "Upper Body + Cardio", muscles: ["chest", "back"], type: "work" },
      { day: "Tue", focus: "Legs + HIIT", muscles: ["legs", "core"], type: "work" },
      { day: "Wed", focus: "Active Recovery", muscles: [], type: "rest" },
      { day: "Thu", focus: "Push (Chest/Shoulders)", muscles: ["chest", "shoulders"], type: "work" },
      { day: "Fri", focus: "Pull (Back/Arms)", muscles: ["back", "arms"], type: "work" },
      { day: "Sat", focus: "Legs + Core Circuit", muscles: ["legs", "core"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
    maintain: [
      { day: "Mon", focus: "Push Day", muscles: ["chest", "shoulders", "arms"], type: "work" },
      { day: "Tue", focus: "Pull Day", muscles: ["back", "arms"], type: "work" },
      { day: "Wed", focus: "Leg Day", muscles: ["legs", "core"], type: "work" },
      { day: "Thu", focus: "Rest / Light Cardio", muscles: [], type: "rest" },
      { day: "Fri", focus: "Upper Body", muscles: ["chest", "back", "shoulders"], type: "work" },
      { day: "Sat", focus: "Core & Mobility", muscles: ["core"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
  },
  home: {
    gain: [
      { day: "Mon", focus: "Push (Upper Body)", muscles: ["chest", "shoulders"], type: "work" },
      { day: "Tue", focus: "Pull & Back", muscles: ["back", "arms"], type: "work" },
      { day: "Wed", focus: "Legs & Glutes", muscles: ["legs"], type: "work" },
      { day: "Thu", focus: "Rest", muscles: [], type: "rest" },
      { day: "Fri", focus: "Arms & Core", muscles: ["arms", "core"], type: "work" },
      { day: "Sat", focus: "Full Body Circuit", muscles: ["chest", "legs", "core"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
    lose: [
      { day: "Mon", focus: "HIIT + Upper Body", muscles: ["chest", "arms"], type: "work" },
      { day: "Tue", focus: "Legs + Cardio", muscles: ["legs", "core"], type: "work" },
      { day: "Wed", focus: "Active Rest", muscles: [], type: "rest" },
      { day: "Thu", focus: "Push + Core", muscles: ["chest", "shoulders", "core"], type: "work" },
      { day: "Fri", focus: "Pull + Abs", muscles: ["back", "core"], type: "work" },
      { day: "Sat", focus: "Full Body Burn", muscles: ["legs", "chest", "arms"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
    maintain: [
      { day: "Mon", focus: "Upper Push", muscles: ["chest", "shoulders"], type: "work" },
      { day: "Tue", focus: "Lower Body", muscles: ["legs"], type: "work" },
      { day: "Wed", focus: "Rest", muscles: [], type: "rest" },
      { day: "Thu", focus: "Upper Pull", muscles: ["back", "arms"], type: "work" },
      { day: "Fri", focus: "Core & Flexibility", muscles: ["core"], type: "work" },
      { day: "Sat", focus: "Full Body Flow", muscles: ["chest", "legs", "core"], type: "work" },
      { day: "Sun", focus: "Rest", muscles: [], type: "rest" },
    ],
  },
};

export const REST_TIPS: Record<GoalType, { i: string; t: string; p: string }> = {
  gain: { i: "💪", t: "Recovery Day — Muscles Grow Here", p: "Muscles grow during rest, not training. Hit your protein target, sleep 8 hrs, do light walking or foam rolling." },
  lose: { i: "🚶", t: "Active Recovery Day", p: "30–45 min brisk walk, light yoga, or swim. Keep moving to maintain calorie burn without stressing muscles." },
  maintain: { i: "🧘", t: "Rest & Mobility", p: "Stretch major muscle groups. 10 min yoga or light walk. Reducing stress is critical for hormonal health." },
};

export const NO_WORK_TIPS = [
  { i: "🚶", t: "Daily 30-Min Walks", p: "Walking burns 150–200 kcal and improves insulin sensitivity, mood, and cardiovascular health." },
  { i: "🪜", t: "Maximize NEAT", p: "Take stairs, park farther, stand more. Non-exercise activity can add 300–500 kcal burned daily." },
  { i: "🧘", t: "Daily Yoga/Stretching", p: "20 min of yoga lowers cortisol (fat-storing hormone), improves flexibility, and supports joint health." },
  { i: "💤", t: "Sleep is Your Workout", p: "7–9 hrs of quality sleep increases growth hormone, repairs tissue, and regulates hunger hormones." },
];

export const PLAN_ITEMS: Record<GoalType, { i: string; t: string; p: string }[]> = {
  lose: [
    { i: "🥗", t: "Eat in a Caloric Deficit", p: "Load up on protein and fiber to stay satiated." },
    { i: "💧", t: "Drink Water Before Meals", p: "300ml of water 20 min before eating naturally reduces portion size by 15–20%." },
    { i: "😴", t: "Prioritize 7–9hr Sleep", p: "Poor sleep spikes ghrelin (hunger hormone) and increases fat retention." },
    { i: "📉", t: "Track Progress Weekly", p: "Weigh yourself at the same time each morning, once a week. Expect 0.3–0.7 kg/week of healthy loss." },
  ],
  gain: [
    { i: "🍗", t: "Eat in a Caloric Surplus", p: "Prioritize protein and complex carbs for muscle growth." },
    { i: "⏰", t: "Eat Every 3–4 Hours", p: "4–6 meals daily prevents muscle breakdown and keeps amino acids available for growth." },
    { i: "🥛", t: "Post-Workout Nutrition", p: "30g protein + fast carbs within 45 min of training maximizes muscle protein synthesis." },
    { i: "📈", t: "Target 0.5–1kg/Month", p: "Lean bulk — if gaining >1kg/week, reduce surplus slightly to minimize fat gain." },
  ],
  maintain: [
    { i: "⚖️", t: "Eat at Maintenance Calories", p: "Vary your food for micronutrient diversity." },
    { i: "🥦", t: "Micronutrients Matter Most", p: "Colorful vegetables, fruits, whole grains. Focus on vitamins D, B12, magnesium, and iron." },
    { i: "🧘", t: "Manage Stress Actively", p: "Cortisol from stress causes fat storage and muscle loss. Meditate, breathe, walk." },
    { i: "🧠", t: "Annual Health Checks", p: "Blood panel, cholesterol, blood pressure — yearly. Prevention beats cure." },
  ],
};

export const ALL_CHALLENGES = [
  { id: "c1", icon: "💧", name: "Drink 8 glasses of water", desc: "Complete your hydration goal today" },
  { id: "c2", icon: "🚶", name: "10,000 steps walk", desc: "Get your NEAT activity in" },
  { id: "c3", icon: "🥗", name: "Hit your protein target", desc: "Eat your daily protein goal today" },
  { id: "c4", icon: "😴", name: "Sleep 7+ hours tonight", desc: "Log your sleep after waking up" },
  { id: "c5", icon: "🧘", name: "5 min mindful breathing", desc: "Reduce cortisol, boost focus" },
  { id: "c6", icon: "📵", name: "No screen 30 min before bed", desc: "Improve sleep quality" },
];
