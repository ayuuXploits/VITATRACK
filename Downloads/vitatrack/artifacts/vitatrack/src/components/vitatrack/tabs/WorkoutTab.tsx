import { useState } from "react";
import { DB } from "../../../data/exerciseDb";
import { ROUTINES, REST_TIPS, NO_WORK_TIPS } from "../../../data/routines";
import type { GoalType } from "../../../data/routines";
import type { WorkoutType, MuscleGroup } from "../../../data/exerciseDb";

interface Props {
  goal: GoalType;
  work: WorkoutType | "none";
  activeDayIdx: number;
  setActiveDayIdx: (i: number) => void;
  workoutStreak: number;
  markWorkoutDay: () => void;
  showToast: (msg: string) => void;
  onStartTimer: (exerciseName: string, restSeconds: number) => void;
  onStartGuided: () => void;
}

export default function WorkoutTab({
  goal, work, activeDayIdx, setActiveDayIdx, workoutStreak,
  markWorkoutDay, showToast, onStartTimer, onStartGuided,
}: Props) {
  const [libFilter, setLibFilter] = useState<string>("all");
  const isNoWork = work === "none";

  const routine = !isNoWork ? ROUTINES[work][goal] : null;
  const activeDay = routine ? routine[activeDayIdx] : null;
  const isRestDay = activeDay?.type === "rest";

  const restTip = !isNoWork ? REST_TIPS[goal] : null;

  const libMuscles = isNoWork ? [] : Object.keys(DB[work as WorkoutType]) as MuscleGroup[];
  const libExercises = !isNoWork && libFilter !== "all"
    ? DB[work as WorkoutType][libFilter as MuscleGroup] ?? []
    : !isNoWork
    ? Object.values(DB[work as WorkoutType]).flat()
    : [];

  const dayExercises = !isNoWork && activeDay && !isRestDay
    ? activeDay.muscles.flatMap(m => DB[work as WorkoutType][m as MuscleGroup] ?? [])
    : [];

  const parseRest = (rst: string): number => {
    if (rst.includes("2min")) return 120;
    const match = rst.match(/(\d+)/);
    return match ? parseInt(match[1]) : 60;
  };

  if (isNoWork) {
    return (
      <div>
        <div className="vt-routine-sect">
          <div className="vt-routine-hdr">
            <div className="vt-sect-title">🧘 Active Lifestyle Plan</div>
            <span className="vt-routine-badge">No Equipment Needed</span>
          </div>
          <div className="vt-plan-items">
            {NO_WORK_TIPS.map(t => (
              <div className="vt-plan-item" key={t.t}>
                <span className="vt-pi-icon">{t.i}</span>
                <div className="vt-pi-text">
                  <strong>{t.t}</strong>
                  <span>{t.p}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="vt-routine-sect">
        <div className="vt-routine-hdr">
          <div className="vt-sect-title">Weekly Routine</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <span className="vt-routine-badge">🔥 {workoutStreak} day streak</span>
            <button className="vt-btn-timer-start" onClick={() => { markWorkoutDay(); showToast("Workout day logged!"); }}>
              ✓ Log Today
            </button>
            {!isRestDay && <button className="vt-btn-timer-start" style={{ background: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.3)", color: "#a78bfa" }} onClick={onStartGuided}>▶ Guided Workout</button>}
          </div>
        </div>

        <div className="vt-day-tabs">
          {routine!.map((d, i) => (
            <button
              key={d.day}
              className={`vt-day-tab${activeDayIdx === i ? " active" : ""}${d.type === "rest" ? " is-rest" : ""}`}
              onClick={() => setActiveDayIdx(i)}
            >
              {d.day}
            </button>
          ))}
        </div>

        <div className="vt-day-focus">{activeDay?.focus}</div>

        {isRestDay ? (
          <div className="vt-rest-box">
            <div className="ri">{restTip!.i}</div>
            <h3>{restTip!.t}</h3>
            <p>{restTip!.p}</p>
          </div>
        ) : (
          <>
            <div className="vt-ex-header">
              <span>Exercise</span><span>Sets</span><span>Reps</span><span>Rest</span><span>Timer</span>
            </div>
            <div className="vt-ex-list">
              {dayExercises.map((ex, i) => (
                <div className="vt-ex-item" key={i}>
                  <div className="vt-ex-name">
                    {ex.n}
                    <small>{ex.m}</small>
                  </div>
                  <span className="vt-ex-tag sets">{ex.sets}</span>
                  <span className="vt-ex-tag reps">{ex.reps}</span>
                  <span className="vt-ex-tag rest">{ex.rst}</span>
                  <button className="vt-btn-timer-start" onClick={() => onStartTimer(ex.n, parseRest(ex.rst))}>
                    ⏱ Start
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Exercise Library */}
      <div className="vt-lib-sect">
        <div className="vt-sect-title">Exercise Library</div>
        <div className="vt-lib-filters">
          <button className={`vt-lib-f${libFilter === "all" ? " active" : ""}`} onClick={() => setLibFilter("all")}>All</button>
          {libMuscles.map(m => (
            <button key={m} className={`vt-lib-f${libFilter === m ? " active" : ""}`} onClick={() => setLibFilter(m)}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        <div className="vt-lib-grid">
          {libExercises.map((ex, i) => (
            <div className="vt-lib-card" key={i}>
              <div className="vt-lib-card-top">
                <span className="vt-lib-card-name">{ex.n}</span>
                <span className="vt-lib-muscle">{ex.m}</span>
              </div>
              <div className="vt-lib-desc">{ex.d}</div>
              <div className="vt-lib-tags">
                {ex.tags.map(t => <span className="vt-lib-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
