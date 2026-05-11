import { useState, useCallback } from "react";
import type { GoalType } from "../data/routines";
import type { WorkoutType } from "../data/exerciseDb";
import { BADGE_DEFS } from "../data/badges";
import { ALL_CHALLENGES } from "../data/routines";

export interface FoodEntry {
  emoji: string;
  name: string;
  qty: string;
  cal: number;
}

export interface WeightEntry {
  date: string;
  val: number;
}

export interface SleepEntry {
  date: string;
  hrs: number;
  bed: string;
  wake: string;
}

export interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  mE: string;
  eE: string;
}

export interface MeasEntry {
  date: string;
  chest: string;
  waist: string;
  hips: string;
  arms: string;
}

export interface MealTemplate {
  name: string;
  items: FoodEntry[];
}

export interface UserProfile {
  age: number;
  gender: string;
  weight: number;
  height: number;
  act: number;
  goal: GoalType;
  work: WorkoutType | "none";
}

export interface CalcResult {
  bmr: number;
  tdee: number;
  target: number;
  bmi: number;
  bmiCat: string;
  bmiPct: number;
  idealLow: number;
  idealHigh: number;
  pG: number;
  cG: number;
  fG: number;
  pP: number;
  cP: number;
  fP: number;
  timelineLabel: string;
  timelineUnit: string;
}

export function useVitaTrack() {
  const [goal, setGoal] = useState<GoalType>("lose");
  const [work, setWork] = useState<WorkoutType | "none">("gym");
  const [calcResult, setCalcResult] = useState<CalcResult | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dailyTarget, setDailyTarget] = useState(2000);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Food
  const [foodItems, setFoodItems] = useState<(FoodEntry | null)[]>([]);
  const [totalLogged, setTotalLogged] = useState(0);
  const [mealTemplates, setMealTemplates] = useState<MealTemplate[]>([]);

  // Water
  const [waterGoal, setWaterGoal] = useState(8);
  const [waterCount, setWaterCount] = useState(0);

  // Weight
  const [weightLog, setWeightLog] = useState<WeightEntry[]>([]);

  // Sleep
  const [sleepLog, setSleepLog] = useState<SleepEntry[]>([]);

  // Mood
  const [moodLog, setMoodLog] = useState<MoodEntry[]>([]);
  const [selMoodV, setSelMoodV] = useState(0);
  const [selEnergyV, setSelEnergyV] = useState(0);

  // Measurements
  const [measLog, setMeasLog] = useState<MeasEntry[]>([]);

  // Streak/Badges
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [workoutDays, setWorkoutDays] = useState<Set<string>>(new Set());
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());

  // Challenges
  const [todayChallenges] = useState(() =>
    ALL_CHALLENGES.slice().sort(() => Math.random() - 0.5).slice(0, 3)
  );
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }, []);

  const checkBadge = useCallback((id: string, condition: boolean) => {
    if (condition && !earnedBadges.has(id)) {
      setEarnedBadges(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      const b = BADGE_DEFS.find(x => x.id === id);
      if (b) showToast(`🏆 Badge unlocked: ${b.name} ${b.icon}`);
    }
  }, [earnedBadges, showToast]);

  const calculate = useCallback((
    age: number, gender: string, weight: number, height: number, act: number
  ) => {
    let bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * act);
    let target = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 400 : tdee;
    target = Math.max(target, 1200);

    const hM = height / 100;
    const bmi = parseFloat((weight / (hM * hM)).toFixed(1));
    const idealLow = Math.round(18.5 * hM * hM);
    const idealHigh = Math.round(24.9 * hM * hM);

    let pP: number, cP: number, fP: number;
    if (goal === "gain") { pP = 0.30; cP = 0.45; fP = 0.25; }
    else if (goal === "lose") { pP = 0.35; cP = 0.35; fP = 0.30; }
    else { pP = 0.25; cP = 0.50; fP = 0.25; }

    const pG = Math.round(target * pP / 4);
    const cG = Math.round(target * cP / 4);
    const fG = Math.round(target * fP / 9);

    let bmiCat: string, bmiPct: number;
    if (bmi < 18.5) { bmiCat = "Underweight"; bmiPct = Math.max(0, (bmi / 18.5) * 20); }
    else if (bmi < 25) { bmiCat = "Normal Weight"; bmiPct = 20 + ((bmi - 18.5) / 6.4) * 30; }
    else if (bmi < 30) { bmiCat = "Overweight"; bmiPct = 50 + ((bmi - 25) / 5) * 25; }
    else { bmiCat = "Obese"; bmiPct = Math.min(100, 75 + ((bmi - 30) / 10) * 25); }

    const wtD = goal === "lose"
      ? Math.abs(weight - idealLow)
      : goal === "gain"
      ? Math.abs(idealHigh - weight)
      : 0;

    let timelineLabel: string, timelineUnit: string;
    if (goal === "maintain") {
      timelineLabel = "∞";
      timelineUnit = "staying balanced";
    } else {
      const wks = Math.ceil(wtD / 0.5);
      timelineLabel = wks > 52 ? Math.ceil(wks / 4) + " mo" : wks + " wks";
      timelineUnit = `to ${goal === "lose" ? idealLow : idealHigh} kg`;
    }

    const wg = Math.min(12, Math.max(6, Math.round(weight * 0.033)));
    setWaterGoal(wg);
    setDailyTarget(target);
    setCalcResult({ bmr, tdee, target, bmi, bmiCat, bmiPct, idealLow, idealHigh, pG, cG, fG, pP, cP, fP, timelineLabel, timelineUnit });
    setUserProfile({ age, gender, weight, height, act, goal, work });
  }, [goal, work]);

  const pushFoodEntry = useCallback((entry: FoodEntry) => {
    setFoodItems(prev => [...prev, entry]);
    setTotalLogged(prev => prev + entry.cal);
    checkBadge("first_log", true);
  }, [checkBadge]);

  const removeFoodEntry = useCallback((idx: number) => {
    setFoodItems(prev => {
      const item = prev[idx];
      if (item) setTotalLogged(t => t - item.cal);
      return prev.map((x, i) => (i === idx ? null : x));
    });
  }, []);

  const logWeight = useCallback((val: number) => {
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    setWeightLog(prev => {
      const next = [...prev, { date: today, val }];
      checkBadge("weight_watcher", next.filter(Boolean).length >= 5);
      return next;
    });
    showToast(`Weight logged: ${val} kg`);
  }, [checkBadge, showToast]);

  const deleteWeight = useCallback((idx: number) => {
    setWeightLog(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const logSleep = useCallback((bed: string, wake: string) => {
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    let mins = (wh * 60 + wm) - (bh * 60 + bm);
    if (mins < 0) mins += 1440;
    const hrs = parseFloat((mins / 60).toFixed(1));
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    setSleepLog(prev => {
      const next = [...prev, { date: today, hrs, bed, wake }];
      checkBadge("sleeper", next.length >= 3);
      return next;
    });
    showToast(`Sleep logged: ${hrs} hrs`);
  }, [checkBadge, showToast]);

  const logMood = useCallback(() => {
    if (!selMoodV || !selEnergyV) { showToast("Select both mood and energy."); return; }
    const mEmojis = ["😔", "😐", "🙂", "😄", "🤩"];
    const eEmojis = ["🪫", "😴", "⚡", "🔋", "🚀"];
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    setMoodLog(prev => {
      const next = [...prev, { date: today, mood: selMoodV, energy: selEnergyV, mE: mEmojis[selMoodV - 1], eE: eEmojis[selEnergyV - 1] }];
      checkBadge("mood_tracker", next.length >= 3);
      return next;
    });
    showToast("Mood logged!");
  }, [selMoodV, selEnergyV, checkBadge, showToast]);

  const logMeasurements = useCallback((chest: string, waist: string, hips: string, arms: string) => {
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    setMeasLog(prev => [...prev, { date: today, chest, waist, hips, arms }]);
    showToast("Measurements saved!");
  }, [showToast]);

  const markWorkoutDay = useCallback(() => {
    const today = new Date().toDateString();
    setWorkoutDays(prev => {
      const next = new Set(prev);
      next.add(today);
      setWorkoutStreak(next.size);
      checkBadge("week_streak", next.size >= 7);
      return next;
    });
  }, [checkBadge]);

  const completeChallenge = useCallback((id: string) => {
    setCompletedChallenges(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    showToast("Challenge completed!");
  }, [showToast]);

  const saveMealTemplate = useCallback((name: string) => {
    const items = foodItems.filter((x): x is FoodEntry => x !== null);
    if (!items.length) { showToast("Log some foods first."); return; }
    setMealTemplates(prev => [...prev, { name, items }]);
    showToast(`Template "${name}" saved!`);
  }, [foodItems, showToast]);

  const loadTemplate = useCallback((idx: number) => {
    const tmpl = mealTemplates[idx];
    tmpl.items.forEach(item => pushFoodEntry(item));
    showToast(`Loaded template: ${tmpl.name}`);
  }, [mealTemplates, pushFoodEntry, showToast]);

  const applyCustomTargets = useCallback((cal?: number, _prot?: number, _carbs?: number) => {
    if (cal && cal > 0) setDailyTarget(cal);
    showToast("Custom targets applied!");
  }, [showToast]);

  const toggleWater = useCallback((filled: boolean) => {
    setWaterCount(prev => {
      const next = filled ? prev + 1 : prev - 1;
      if (filled && next === waterGoal) {
        showToast("Hydration goal reached!");
        checkBadge("hydrated", true);
      }
      return next;
    });
  }, [waterGoal, showToast, checkBadge]);

  return {
    goal, setGoal,
    work, setWork,
    calcResult, userProfile, dailyTarget, setDailyTarget,
    activeTab, setActiveTab,
    activeDayIdx, setActiveDayIdx,
    foodItems, totalLogged, mealTemplates,
    waterGoal, waterCount,
    weightLog, sleepLog, moodLog, measLog,
    workoutStreak, workoutDays, earnedBadges,
    todayChallenges, completedChallenges,
    selMoodV, setSelMoodV, selEnergyV, setSelEnergyV,
    toastMsg, toastVisible,
    showToast,
    calculate,
    pushFoodEntry, removeFoodEntry,
    logWeight, deleteWeight,
    logSleep,
    logMood,
    logMeasurements,
    markWorkoutDay,
    completeChallenge,
    saveMealTemplate, loadTemplate,
    applyCustomTargets,
    toggleWater,
  };
}
