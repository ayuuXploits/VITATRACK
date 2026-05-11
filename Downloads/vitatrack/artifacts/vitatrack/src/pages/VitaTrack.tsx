import { useState } from "react";
import { useVitaTrack } from "../hooks/useVitaTrack";
import { DB } from "../data/exerciseDb";
import { ROUTINES } from "../data/routines";
import type { WorkoutType, MuscleGroup } from "../data/exerciseDb";
import ProfileForm from "../components/vitatrack/ProfileForm";
import RestTimer from "../components/vitatrack/RestTimer";
import GuidedWorkout from "../components/vitatrack/GuidedWorkout";
import OverviewTab from "../components/vitatrack/tabs/OverviewTab";
import WorkoutTab from "../components/vitatrack/tabs/WorkoutTab";
import NutritionTab from "../components/vitatrack/tabs/NutritionTab";
import TrackingTab from "../components/vitatrack/tabs/TrackingTab";
import WellnessTab from "../components/vitatrack/tabs/WellnessTab";
import AICoachTab from "../components/vitatrack/tabs/AICoachTab";

type GoalType = "gain" | "lose" | "maintain";
type WorkType = WorkoutType | "none";

const GOAL_OPTIONS: { id: GoalType; icon: string; name: string; desc: string; color: string }[] = [
  { id: "lose", icon: "🔥", name: "Lose Weight", desc: "Fat loss + lean muscle", color: "#22c55e" },
  { id: "gain", icon: "💪", name: "Gain Muscle", desc: "Bulk + strength build", color: "#f97316" },
  { id: "maintain", icon: "⚖️", name: "Stay Healthy", desc: "Balance + wellness", color: "#6366f1" },
];

const WORK_OPTIONS: { id: WorkType; icon: string; name: string; desc: string }[] = [
  { id: "gym", icon: "🏋️", name: "Gym Workout", desc: "Machines + free weights" },
  { id: "home", icon: "🏠", name: "Home Workout", desc: "Bodyweight + bands" },
  { id: "none", icon: "🧘", name: "No Workout", desc: "Lifestyle + nutrition" },
];

const TABS = [
  { id: "overview", label: "📊 Overview" },
  { id: "workout", label: "💪 Workout" },
  { id: "nutrition", label: "🥗 Nutrition" },
  { id: "tracking", label: "📈 Tracking" },
  { id: "wellness", label: "🧘 Wellness" },
  { id: "ai", label: "🤖 AI Coach" },
];

export default function VitaTrack() {
  const vt = useVitaTrack();
  const [timerEx, setTimerEx] = useState<{ name: string; secs: number } | null>(null);
  const [showGuided, setShowGuided] = useState(false);

  const goalColor = vt.goal === "gain" ? "#f97316" : vt.goal === "lose" ? "#22c55e" : "#6366f1";

  const guidedExercises =
    vt.work !== "none" && vt.calcResult
      ? (() => {
          const routine = ROUTINES[vt.work as WorkoutType][vt.goal];
          const day = routine[vt.activeDayIdx];
          if (day.type === "rest") return [];
          return day.muscles.flatMap(m => DB[vt.work as WorkoutType][m as MuscleGroup] ?? []);
        })()
      : [];

  const startTimer = (exerciseName: string, restSeconds: number) => {
    setTimerEx({ name: exerciseName, secs: restSeconds });
  };

  return (
    <div className="vt-root">
      <div className="vt-container">
        {/* Header */}
        <div className="vt-header">
          <div className="vt-logo">VitaTrack</div>
          <div className="vt-tagline">Your intelligent nutrition & fitness companion</div>
        </div>

        {/* Goal Selector */}
        <div className="vt-sel-section">
          <div className="vt-section-label">Step 1 — Your Goal</div>
          <div className="vt-sel-cards">
            {GOAL_OPTIONS.map(g => (
              <div
                key={g.id}
                className={`vt-sel-card${vt.goal === g.id ? " active" : ""}`}
                style={{ "--_c": g.color } as React.CSSProperties}
                onClick={() => vt.setGoal(g.id)}
              >
                <span className="ci">{g.icon}</span>
                <div className="cn" style={{ color: vt.goal === g.id ? g.color : undefined }}>{g.name}</div>
                <div className="cd">{g.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Selector */}
        <div className="vt-sel-section">
          <div className="vt-section-label">Step 2 — Your Workout Style</div>
          <div className="vt-sel-cards">
            {WORK_OPTIONS.map(w => (
              <div
                key={w.id}
                className={`vt-sel-card${vt.work === w.id ? " active" : ""}`}
                style={{ "--_c": goalColor } as React.CSSProperties}
                onClick={() => vt.setWork(w.id)}
              >
                <span className="ci">{w.icon}</span>
                <div className="cn" style={{ color: vt.work === w.id ? goalColor : undefined }}>{w.name}</div>
                <div className="cd">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <div className="vt-sel-section">
          <div className="vt-section-label">Step 3 — Your Profile</div>
          <ProfileForm
            goal={vt.goal}
            onCalculate={vt.calculate}
            accentColor={goalColor}
          />
        </div>

        {/* Main Dashboard */}
        {vt.calcResult && (
          <>
            {/* Tab Nav */}
            <div className="vt-tab-nav" style={{ "--vt-accent": goalColor } as React.CSSProperties}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`vt-tab-btn${vt.activeTab === t.id ? " active" : ""}`}
                  onClick={() => vt.setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ "--vt-accent": goalColor } as React.CSSProperties}>
              {vt.activeTab === "overview" && (
                <OverviewTab
                  calcResult={vt.calcResult}
                  goal={vt.goal}
                  totalLogged={vt.totalLogged}
                  dailyTarget={vt.dailyTarget}
                />
              )}
              {vt.activeTab === "workout" && (
                <WorkoutTab
                  goal={vt.goal}
                  work={vt.work}
                  activeDayIdx={vt.activeDayIdx}
                  setActiveDayIdx={vt.setActiveDayIdx}
                  workoutStreak={vt.workoutStreak}
                  markWorkoutDay={vt.markWorkoutDay}
                  showToast={vt.showToast}
                  onStartTimer={startTimer}
                  onStartGuided={() => setShowGuided(true)}
                />
              )}
              {vt.activeTab === "nutrition" && (
                <NutritionTab
                  foodItems={vt.foodItems}
                  totalLogged={vt.totalLogged}
                  dailyTarget={vt.dailyTarget}
                  mealTemplates={vt.mealTemplates}
                  waterGoal={vt.waterGoal}
                  waterCount={vt.waterCount}
                  pushFoodEntry={vt.pushFoodEntry}
                  removeFoodEntry={vt.removeFoodEntry}
                  toggleWater={vt.toggleWater}
                  saveMealTemplate={vt.saveMealTemplate}
                  loadTemplate={vt.loadTemplate}
                  applyCustomTargets={vt.applyCustomTargets}
                  showToast={vt.showToast}
                  dailyTargetProp={vt.dailyTarget}
                />
              )}
              {vt.activeTab === "tracking" && (
                <TrackingTab
                  weightLog={vt.weightLog}
                  sleepLog={vt.sleepLog}
                  moodLog={vt.moodLog}
                  measLog={vt.measLog}
                  workoutStreak={vt.workoutStreak}
                  earnedBadges={vt.earnedBadges}
                  selMoodV={vt.selMoodV}
                  setSelMoodV={vt.setSelMoodV}
                  selEnergyV={vt.selEnergyV}
                  setSelEnergyV={vt.setSelEnergyV}
                  logWeight={vt.logWeight}
                  deleteWeight={vt.deleteWeight}
                  logSleep={vt.logSleep}
                  logMood={vt.logMood}
                  logMeasurements={vt.logMeasurements}
                />
              )}
              {vt.activeTab === "wellness" && (
                <WellnessTab
                  goal={vt.goal}
                  todayChallenges={vt.todayChallenges}
                  completedChallenges={vt.completedChallenges}
                  completeChallenge={vt.completeChallenge}
                />
              )}
              {vt.activeTab === "ai" && (
                <AICoachTab
                  calcResult={vt.calcResult}
                  goal={vt.goal}
                  totalLogged={vt.totalLogged}
                  dailyTarget={vt.dailyTarget}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      <div className={`vt-toast${vt.toastVisible ? " show" : ""}`}>{vt.toastMsg}</div>

      {/* Rest Timer overlay */}
      {timerEx && (
        <RestTimer
          exerciseName={timerEx.name}
          totalSeconds={timerEx.secs}
          onClose={() => setTimerEx(null)}
        />
      )}

      {/* Guided Workout overlay */}
      {showGuided && (
        <GuidedWorkout
          exercises={guidedExercises}
          onClose={() => setShowGuided(false)}
          onStartTimer={(name, secs) => { setShowGuided(false); startTimer(name, secs); }}
        />
      )}
    </div>
  );
}
