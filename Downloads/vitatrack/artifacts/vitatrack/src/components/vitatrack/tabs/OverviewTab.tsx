import type { CalcResult } from "../../../hooks/useVitaTrack";
import type { GoalType } from "../../../data/routines";
import { PLAN_ITEMS } from "../../../data/routines";

interface Props {
  calcResult: CalcResult;
  goal: GoalType;
  totalLogged: number;
  dailyTarget: number;
}

export default function OverviewTab({ calcResult, goal, totalLogged, dailyTarget }: Props) {
  const pct = Math.min(100, Math.round((totalLogged / dailyTarget) * 100));
  const ringOffset = 283 - (283 * pct) / 100;
  const accentColor = goal === "gain" ? "#f97316" : goal === "lose" ? "#22c55e" : "#6366f1";

  return (
    <div>
      {/* Calorie Ring */}
      <div className="vt-ring-wrap">
        <div className="vt-ring-cont">
          <svg className="vt-ring-svg" width="100" height="100" viewBox="0 0 100 100">
            <circle className="vt-rbg" cx="50" cy="50" r="45" />
            <circle
              className="vt-rfill"
              cx="50" cy="50" r="45"
              style={{ strokeDashoffset: ringOffset, stroke: accentColor }}
            />
          </svg>
          <div className="vt-ring-ctr">
            <span className="vt-ring-pct" style={{ color: accentColor }}>{pct}%</span>
            <span className="vt-ring-lbl">eaten</span>
          </div>
        </div>
        <div className="vt-ring-info">
          <h3>Today's Calories</h3>
          <div className="vt-ring-stat"><span>Logged</span><strong>{totalLogged} kcal</strong></div>
          <div className="vt-ring-stat"><span>Target</span><strong>{dailyTarget} kcal</strong></div>
          <div className="vt-ring-stat">
            <span>Remaining</span>
            <strong style={{ color: totalLogged > dailyTarget ? "#ef4444" : accentColor }}>
              {Math.max(0, dailyTarget - totalLogged)} kcal
            </strong>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="vt-metrics-grid">
        {[
          { label: "Daily Target", value: calcResult.target, unit: "kcal / day", color: accentColor },
          { label: "TDEE", value: calcResult.tdee, unit: "kcal maintenance", color: "#a78bfa" },
          { label: "BMR", value: Math.round(calcResult.bmr), unit: "kcal at rest", color: "#38bdf8" },
          { label: "Timeline", value: calcResult.timelineLabel, unit: calcResult.timelineUnit, color: "#fb923c" },
        ].map(m => (
          <div className="vt-metric-card" key={m.label} style={{ "--vt-accent": m.color } as React.CSSProperties}>
            <div className="vt-metric-label">{m.label}</div>
            <div className="vt-metric-value" style={{ color: m.color }}>{m.value}</div>
            <div className="vt-metric-unit">{m.unit}</div>
          </div>
        ))}
      </div>

      {/* BMI */}
      <div className="vt-bmi-sect">
        <div className="vt-bmi-hdr">
          <span className="vt-bmi-ttl">Body Mass Index (BMI)</span>
          <span className="vt-bmi-badge">{calcResult.bmi} — {calcResult.bmiCat}</span>
        </div>
        <div className="vt-bmi-track">
          <div className="vt-bmi-ptr" style={{ left: `${calcResult.bmiPct}%` }} />
        </div>
        <div className="vt-bmi-lbls">
          <span>Underweight<br />&lt;18.5</span>
          <span>Normal<br />18.5–24.9</span>
          <span>Overweight<br />25–29.9</span>
          <span>Obese<br />&gt;30</span>
        </div>
        <div style={{ marginTop: "14px", fontSize: "0.82rem", color: "var(--vt-muted)" }}>
          Ideal weight range for your height: <strong style={{ color: "var(--vt-text)" }}>{calcResult.idealLow}–{calcResult.idealHigh} kg</strong>
        </div>
      </div>

      {/* Macros */}
      <div className="vt-macro-sect">
        <div className="vt-sect-title">Daily Macro Targets</div>
        {[
          { name: "Protein", g: calcResult.pG, pct: Math.round(calcResult.pP * 100), color: "#f97316" },
          { name: "Carbohydrates", g: calcResult.cG, pct: Math.round(calcResult.cP * 100), color: "#22c55e" },
          { name: "Fats", g: calcResult.fG, pct: Math.round(calcResult.fP * 100), color: "#6366f1" },
        ].map(m => (
          <div className="vt-macro-row" key={m.name}>
            <div className="vt-macro-info">
              <span>{m.name}</span>
              <span>{m.g}g ({m.pct}% of calories)</span>
            </div>
            <div className="vt-mbar-bg">
              <div className="vt-mbar-fill" style={{ width: `${m.pct}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Plan */}
      <div className="vt-plan-sect">
        <div className="vt-sect-title">
          {goal === "lose" ? "🎯 Fat Loss Action Plan" : goal === "gain" ? "💪 Muscle Gain Action Plan" : "⚖️ Maintenance Plan"}
        </div>
        <div className="vt-plan-items">
          {PLAN_ITEMS[goal].map(item => (
            <div className="vt-plan-item" key={item.t}>
              <span className="vt-pi-icon">{item.i}</span>
              <div className="vt-pi-text">
                <strong>{item.t}</strong>
                <span>{item.p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
