import { useState } from "react";
import type { CalcResult } from "../../../hooks/useVitaTrack";
import type { GoalType } from "../../../data/routines";

interface Props {
  calcResult: CalcResult | null;
  goal: GoalType;
  totalLogged: number;
  dailyTarget: number;
}

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

async function askCoach(prompt: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/vitatrack/ai-coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error ?? "AI Coach is unavailable");
  }
  const data = await res.json();
  return data.text;
}

const QUICK_PROMPTS = [
  { label: "🍽️ Meal Ideas", template: (target: number, logged: number) =>
    `I'm following a ${target} kcal/day diet and have ${target - logged} kcal remaining today. Suggest 3 healthy meal or snack ideas that fit within those calories. Be specific with foods and portions.` },
  { label: "💪 Workout Tips", template: (_target: number, _logged: number) =>
    "Give me 3 advanced workout tips to maximize my gym results, focusing on progressive overload, recovery, and exercise form. Be practical and specific." },
  { label: "📅 Weekly Summary", template: (target: number, logged: number) =>
    `I've logged ${logged} kcal against a ${target} kcal target today. Give me a brief motivational weekly check-in message, 2–3 actionable tips, and a reminder about what matters most for my health goal.` },
  { label: "🧘 Recovery Tips", template: (_t: number, _l: number) =>
    "What are the 3 most impactful recovery strategies I should use after intense workouts? Focus on sleep, nutrition timing, and active recovery. Give specific, science-backed recommendations." },
  { label: "🎯 Goal Strategy", template: (target: number, _l: number) =>
    `I'm targeting ${target} kcal/day. What are the top 3 habits I should build this week to stay on track? Include morning routine, meal timing, and evening wind-down advice.` },
];

export default function AICoachTab({ calcResult, goal, totalLogged, dailyTarget }: Props) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async (prompt: string) => {
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const text = await askCoach(prompt);
      setResponse(text);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Request failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const contextPrefix = calcResult
    ? `Context: Goal = ${goal}, Daily target = ${calcResult.target} kcal, BMI = ${calcResult.bmi} (${calcResult.bmiCat}), Protein goal = ${calcResult.pG}g. `
    : "";

  return (
    <div>
      <div className="vt-ai-sect">
        <div className="vt-sect-title">🤖 AI Health Coach</div>
        <p style={{ fontSize: "0.83rem", color: "var(--vt-muted)", marginBottom: "18px", lineHeight: 1.6 }}>
          Your personal AI coach powered by Claude. Ask anything about nutrition, workouts, or wellness — or use a quick prompt below.
        </p>

        {/* Quick prompts */}
        <div className="vt-ai-btn-row" style={{ marginBottom: "16px" }}>
          {QUICK_PROMPTS.map(p => (
            <button
              key={p.label}
              className="vt-ai-btn"
              disabled={loading}
              onClick={() => ask(contextPrefix + p.template(dailyTarget, totalLogged))}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Custom prompt */}
        <textarea
          style={{
            width: "100%",
            background: "var(--vt-surface2)",
            border: "1.5px solid var(--vt-border)",
            borderRadius: "14px",
            padding: "14px 16px",
            color: "var(--vt-text)",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            resize: "vertical",
            outline: "none",
            minHeight: "80px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
          placeholder="Ask your coach anything… e.g. 'What should I eat before a morning workout?'"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && customPrompt.trim()) ask(contextPrefix + customPrompt.trim()); }}
        />
        <button
          className="vt-btn-log"
          disabled={loading || !customPrompt.trim()}
          onClick={() => ask(contextPrefix + customPrompt.trim())}
          style={{ opacity: loading || !customPrompt.trim() ? 0.6 : 1 }}
        >
          {loading ? "Thinking…" : "Ask AI Coach ↩"}
        </button>

        {/* Response */}
        {loading && (
          <div className="vt-ai-loading">
            <div className="vt-spinner" />
            Claude is thinking…
          </div>
        )}
        {error && (
          <div className="vt-ai-output" style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>
            ⚠️ {error}
          </div>
        )}
        {response && !loading && (
          <div className="vt-ai-output" style={{ whiteSpace: "pre-wrap" }}>
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
