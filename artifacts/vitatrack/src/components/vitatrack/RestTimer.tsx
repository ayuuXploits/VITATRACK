import { useState, useEffect, useRef } from "react";

interface Props {
  exerciseName: string;
  totalSeconds: number;
  onClose: () => void;
}

export default function RestTimer({ exerciseName, totalSeconds, onClose }: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining]);

  const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const pct = ((totalSeconds - remaining) / totalSeconds) * 100;

  return (
    <div className="vt-timer-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="vt-timer-box">
        <div className="vt-timer-ex">{exerciseName}</div>
        <div className="vt-timer-display">{mins}:{secs}</div>
        <div className="vt-timer-label">
          {remaining === 0 ? "🎉 Rest complete! Time to lift!" : "Rest timer — breathe and reset"}
        </div>
        <div className="vt-timer-btns">
          <button className="vt-timer-btn" onClick={() => setRunning(r => !r)}>
            {running ? "⏸ Pause" : "▶ Resume"}
          </button>
          <button className="vt-timer-btn" onClick={() => { setRemaining(totalSeconds); setRunning(true); }}>
            🔄 Reset
          </button>
          <button className="vt-timer-btn primary" onClick={onClose}>✕ Close</button>
        </div>
        <div className="vt-timer-progress">
          <div className="vt-timer-prog-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
