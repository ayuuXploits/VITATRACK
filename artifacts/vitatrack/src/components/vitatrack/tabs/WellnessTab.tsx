import type { GoalType } from "../../../data/routines";
import { ALL_CHALLENGES } from "../../../data/routines";

interface Props {
  goal: GoalType;
  todayChallenges: typeof ALL_CHALLENGES;
  completedChallenges: Set<string>;
  completeChallenge: (id: string) => void;
}

const WELLNESS_TIPS = [
  {
    cat: "Sleep",
    icon: "😴",
    color: "#6366f1",
    tips: [
      { t: "7–9 Hours is the Target", d: "Consistently sleeping less than 6 hours raises cortisol, impairs muscle recovery, and increases fat storage." },
      { t: "Keep a Sleep Schedule", d: "Go to bed and wake at the same time every day — even weekends. Circadian consistency is more important than duration." },
      { t: "Cool, Dark Room", d: "18–19°C is optimal for sleep. Blackout curtains + no blue light 30 min before bed = faster sleep onset." },
    ],
  },
  {
    cat: "Stress",
    icon: "🧘",
    color: "#22c55e",
    tips: [
      { t: "Cortisol is the Enemy", d: "Chronic stress → high cortisol → fat storage (especially belly) + muscle breakdown. Manage it proactively." },
      { t: "4-7-8 Breathing", d: "Inhale 4s, hold 7s, exhale 8s. Activates the parasympathetic nervous system. 4 cycles = instant calm." },
      { t: "Daily Walk Therapy", d: "A 20-min walk in nature lowers cortisol by 15%. More effective than scrolling social media to 'decompress'." },
    ],
  },
  {
    cat: "Nutrition",
    icon: "🥗",
    color: "#f97316",
    tips: [
      { t: "Eat Whole Foods 80% of the Time", d: "The remaining 20% is for enjoyment. Sustainable beats perfect. Rigid restriction leads to binging." },
      { t: "Protein at Every Meal", d: "25–40g protein per meal maximizes muscle protein synthesis. Eggs, curd, chicken, dal, paneer — every plate." },
      { t: "Fiber is Underrated", d: "25–35g/day fiber: stabilizes blood sugar, feeds gut bacteria, and reduces hunger hormones naturally." },
    ],
  },
  {
    cat: "Mindset",
    icon: "🧠",
    color: "#a78bfa",
    tips: [
      { t: "Track Consistently, Not Obsessively", d: "Daily tracking creates awareness. If it causes anxiety, switch to 3-day-per-week logging instead." },
      { t: "Progress Over Perfection", d: "One bad meal doesn't ruin a week, like one good workout doesn't build a body. Consistency over months is what matters." },
      { t: "Recovery is Training", d: "Rest days, sleep, and deload weeks are when your body actually changes. Skipping them limits results." },
    ],
  },
];

export default function WellnessTab({ goal, todayChallenges, completedChallenges, completeChallenge }: Props) {
  return (
    <div>
      {/* Daily Challenges */}
      <div className="vt-challenge-sect">
        <div className="vt-sect-title">⚡ Daily Challenges</div>
        {todayChallenges.map(c => {
          const done = completedChallenges.has(c.id);
          return (
            <div key={c.id} className={`vt-challenge-card${done ? " done" : ""}`}>
              <span className="vt-challenge-icon">{c.icon}</span>
              <div className="vt-challenge-info">
                <div className="vt-challenge-name" style={{ textDecoration: done ? "line-through" : "none" }}>{c.name}</div>
                <div className="vt-challenge-desc">{c.desc}</div>
              </div>
              <button
                className={`vt-btn-challenge${done ? " done" : ""}`}
                onClick={() => !done && completeChallenge(c.id)}
              >
                {done ? "✓ Done" : "Complete"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Wellness tips */}
      {WELLNESS_TIPS.map(section => (
        <div className="vt-plan-sect" key={section.cat} style={{ marginBottom: "20px" }}>
          <div className="vt-sect-title" style={{ color: section.color }}>
            {section.icon} {section.cat} Health
          </div>
          <div className="vt-plan-items">
            {section.tips.map(tip => (
              <div className="vt-plan-item" key={tip.t}>
                <span className="vt-pi-icon" style={{ color: section.color }}>•</span>
                <div className="vt-pi-text">
                  <strong>{tip.t}</strong>
                  <span>{tip.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Goal-specific bonus */}
      <div className="vt-plan-sect">
        <div className="vt-sect-title">🎯 Goal-Specific Wellness</div>
        <div className="vt-plan-items">
          {goal === "lose" && <>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">🚶</span>
              <div className="vt-pi-text"><strong>Walk After Meals</strong><span>A 10-min walk after eating reduces blood sugar spikes by up to 30% — the single easiest habit for fat loss.</span></div>
            </div>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">🍽️</span>
              <div className="vt-pi-text"><strong>Slow Down Eating</strong><span>It takes 20 min for your stomach to signal fullness to your brain. Put the fork down between bites.</span></div>
            </div>
          </>}
          {goal === "gain" && <>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">🛌</span>
              <div className="vt-pi-text"><strong>Sleep is Your Anabolic Window</strong><span>GH (growth hormone) peaks in deep sleep. Prioritize 8+ hours to maximize muscle synthesis from your training.</span></div>
            </div>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">🍌</span>
              <div className="vt-pi-text"><strong>Pre-Sleep Protein</strong><span>1 cup curd or 1 cup warm milk before bed provides casein protein that slowly feeds muscles overnight.</span></div>
            </div>
          </>}
          {goal === "maintain" && <>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">⚖️</span>
              <div className="vt-pi-text"><strong>Recomposition Mode</strong><span>At maintenance, aim to slowly swap fat for muscle over months. Prioritize progressive overload in training + adequate protein.</span></div>
            </div>
            <div className="vt-plan-item">
              <span className="vt-pi-icon">🧬</span>
              <div className="vt-pi-text"><strong>Annual Blood Panel</strong><span>Check vitamin D, B12, iron, thyroid, cholesterol, and fasting glucose. Prevention is cheaper and easier than treatment.</span></div>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}
