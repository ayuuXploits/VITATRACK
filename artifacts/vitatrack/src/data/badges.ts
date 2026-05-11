export interface BadgeDef {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: "first_log", icon: "🥗", name: "First Meal", desc: "Log your first food" },
  { id: "week_streak", icon: "🔥", name: "7-Day Streak", desc: "7 days in a row" },
  { id: "protein_hero", icon: "💪", name: "Protein Hero", desc: "Hit protein goal 5 days" },
  { id: "hydrated", icon: "💧", name: "Hydrated", desc: "Reach water goal" },
  { id: "sleeper", icon: "😴", name: "Sleep Champ", desc: "Log sleep 3 days" },
  { id: "mood_tracker", icon: "😊", name: "Mood Aware", desc: "Log mood 3 days" },
  { id: "weight_watcher", icon: "⚖️", name: "Weight Watcher", desc: "Log weight 5 times" },
];
