import { useState } from "react";
import type { Exercise } from "../../data/exerciseDb";

interface Props {
  exercises: Exercise[];
  onClose: () => void;
  onStartTimer: (name: string, secs: number) => void;
}

export default function GuidedWorkout({ exercises, onClose, onStartTimer }: Props) {
  const [step, setStep] = useState(0);

  if (!exercises.length) {
    return (
      <div className="vt-guided-overlay">
        <button className="vt-guided-close" onClick={onClose}>✕ Close</button>
        <div className="vt-guided-inner">
          <div className="vt-guided-name">No exercises today</div>
          <div className="vt-guided-desc">This is a rest day — enjoy your recovery!</div>
          <button className="vt-guided-btn secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const ex = exercises[step];
  const progress = ((step + 1) / exercises.length) * 100;

  const parseRest = (rst: string): number => {
    if (rst.includes("2min")) return 120;
    const match = rst.match(/(\d+)/);
    return match ? parseInt(match[1]) : 60;
  };

  return (
    <div className="vt-guided-overlay">
      <button className="vt-guided-close" onClick={onClose}>✕ Exit Workout</button>
      <div className="vt-guided-inner">
        <div className="vt-guided-progress-bar">
          <div className="vt-guided-prog-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="vt-guided-step">Exercise {step + 1} of {exercises.length}</div>
        <div className="vt-guided-name">{ex.n}</div>
        <div className="vt-guided-muscle">{ex.m}</div>
        <div className="vt-guided-desc">{ex.d}</div>
        <div className="vt-guided-meta">
          <div className="vt-guided-chip">
            <span>Sets</span>
            <strong>{ex.sets}</strong>
          </div>
          <div className="vt-guided-chip">
            <span>Reps</span>
            <strong>{ex.reps}</strong>
          </div>
          <div className="vt-guided-chip">
            <span>Rest</span>
            <strong>{ex.rst}</strong>
          </div>
        </div>
        <div className="vt-guided-actions">
          {step > 0 && (
            <button className="vt-guided-btn secondary" onClick={() => setStep(s => s - 1)}>← Prev</button>
          )}
          <button
            className="vt-guided-btn primary"
            onClick={() => onStartTimer(ex.n, parseRest(ex.rst))}
          >
            ⏱ Rest Timer
          </button>
          {step < exercises.length - 1 ? (
            <button className="vt-guided-btn primary" onClick={() => setStep(s => s + 1)}>Next →</button>
          ) : (
            <button className="vt-guided-btn primary" style={{ background: "#22c55e" }} onClick={onClose}>
              🎉 Done!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
