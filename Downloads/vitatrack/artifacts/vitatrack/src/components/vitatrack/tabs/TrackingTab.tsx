import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { WeightEntry, SleepEntry, MoodEntry, MeasEntry } from "../../../hooks/useVitaTrack";
import { BADGE_DEFS } from "../../../data/badges";

interface Props {
  weightLog: WeightEntry[];
  sleepLog: SleepEntry[];
  moodLog: MoodEntry[];
  measLog: MeasEntry[];
  workoutStreak: number;
  earnedBadges: Set<string>;
  selMoodV: number;
  setSelMoodV: (v: number) => void;
  selEnergyV: number;
  setSelEnergyV: (v: number) => void;
  logWeight: (v: number) => void;
  deleteWeight: (i: number) => void;
  logSleep: (bed: string, wake: string) => void;
  logMood: () => void;
  logMeasurements: (chest: string, waist: string, hips: string, arms: string) => void;
}

export default function TrackingTab({
  weightLog, sleepLog, moodLog, measLog, workoutStreak, earnedBadges,
  selMoodV, setSelMoodV, selEnergyV, setSelEnergyV,
  logWeight, deleteWeight, logSleep, logMood, logMeasurements,
}: Props) {
  const [wtInput, setWtInput] = useState("");
  const [bedTime, setBedTime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [arms, setArms] = useState("");

  const moodEmojis = ["😔", "😐", "🙂", "😄", "🤩"];
  const energyEmojis = ["🪫", "😴", "⚡", "🔋", "🚀"];

  const avgSleep = sleepLog.length
    ? (sleepLog.reduce((s, e) => s + e.hrs, 0) / sleepLog.length).toFixed(1)
    : "--";
  const bestSleep = sleepLog.length
    ? Math.max(...sleepLog.map(e => e.hrs)).toFixed(1)
    : "--";

  const heatmapDays: { date: Date; active: boolean; isToday: boolean }[] = [];
  const now = new Date();
  for (let i = 48; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    heatmapDays.push({ date: d, active: false, isToday: i === 0 });
  }

  const chartData = weightLog.slice(-14).map((e, i) => ({ name: e.date, weight: e.val, index: i }));

  return (
    <div>
      {/* Streak / Badges */}
      <div className="vt-streak-sect">
        <div className="vt-sect-title">🔥 Streak & Achievements</div>
        <div className="vt-streak-row">
          <div className="vt-streak-fire">🔥</div>
          <div className="vt-streak-info">
            <h3>{workoutStreak} Days</h3>
            <p>current workout streak</p>
          </div>
        </div>
        <div className="vt-section-label">Activity Heatmap (last 7 weeks)</div>
        <div className="vt-heatmap">
          {heatmapDays.slice(-49).map((d, i) => (
            <div
              key={i}
              className={`vt-hm-cell${d.active ? " active" : ""}${d.isToday ? " today" : ""}`}
              title={d.date.toDateString()}
            />
          ))}
        </div>
        <div className="vt-section-label" style={{ marginTop: "20px" }}>Badges</div>
        <div className="vt-badges-grid">
          {BADGE_DEFS.map(b => (
            <div key={b.id} className={`vt-badge-item${earnedBadges.has(b.id) ? " earned" : ""}`} title={b.desc}>
              <span className="vt-badge-icon">{earnedBadges.has(b.id) ? b.icon : "🔒"}</span>
              <span className="vt-badge-name">{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weight */}
      <div className="vt-weight-sect">
        <div className="vt-sect-title">⚖️ Weight Tracker</div>
        <div className="vt-weight-input-row">
          <input
            type="number"
            placeholder="Enter weight (kg)"
            value={wtInput}
            step="0.1"
            onChange={e => setWtInput(e.target.value)}
          />
          <button
            className="vt-btn-log-wt"
            onClick={() => {
              const v = parseFloat(wtInput);
              if (isNaN(v) || v <= 0) return;
              logWeight(v);
              setWtInput("");
            }}
          >
            Log Weight
          </button>
        </div>
        {weightLog.length > 1 ? (
          <div className="vt-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
                <XAxis dataKey="name" tick={{ fill: "#8888aa", fontSize: 10 }} />
                <YAxis tick={{ fill: "#8888aa", fontSize: 10 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: "#13131a", border: "1.5px solid #2a2a3a", borderRadius: "10px", color: "#f0f0f5" }} />
                <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="vt-food-empty"><div>📈</div>Log 2+ weights to see your trend chart.</div>
        )}
        <div className="vt-wt-log-list">
          {weightLog.map((e, i) => (
            <div className="vt-wt-entry" key={i}>
              <span className="vt-wt-entry-date">{e.date}</span>
              <span className="vt-wt-entry-val">{e.val} kg</span>
              <button className="vt-wt-entry-del" onClick={() => deleteWeight(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div className="vt-sleep-sect">
        <div className="vt-sect-title">😴 Sleep Tracker</div>
        <div className="vt-sleep-row">
          <div className="vt-field">
            <label>Bedtime</label>
            <input type="time" className="vt-time-input" value={bedTime} onChange={e => setBedTime(e.target.value)} />
          </div>
          <div className="vt-field">
            <label>Wake up</label>
            <input type="time" className="vt-time-input" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
          </div>
          <button className="vt-btn-log-wt" onClick={() => logSleep(bedTime, wakeTime)} style={{ alignSelf: "flex-end" }}>
            Log Sleep
          </button>
        </div>
        <div className="vt-sleep-stats">
          <div className="vt-sleep-stat">
            <div className="vt-sleep-stat-val">{avgSleep}</div>
            <div className="vt-sleep-stat-lbl">Avg hrs/night</div>
          </div>
          <div className="vt-sleep-stat">
            <div className="vt-sleep-stat-val">{bestSleep}</div>
            <div className="vt-sleep-stat-lbl">Best night</div>
          </div>
          <div className="vt-sleep-stat">
            <div className="vt-sleep-stat-val">{sleepLog.length}</div>
            <div className="vt-sleep-stat-lbl">Days logged</div>
          </div>
        </div>
        <div className="vt-sleep-log-list">
          {sleepLog.map((e, i) => (
            <div className="vt-sleep-entry" key={i}>
              <span style={{ color: "var(--vt-muted)" }}>{e.date}</span>
              <span>{e.bed} → {e.wake}</span>
              <span style={{ color: "var(--vt-accent)", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{e.hrs}h</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div className="vt-mood-sect">
        <div className="vt-sect-title">😊 Mood & Energy Log</div>
        <div className="vt-mood-grid">
          <div>
            <div className="vt-mood-label">Today's Mood</div>
            <div className="vt-mood-emojis">
              {moodEmojis.map((e, i) => (
                <span
                  key={i}
                  className={`vt-mood-e${selMoodV === i + 1 ? " selected" : ""}`}
                  onClick={() => setSelMoodV(i + 1)}
                  title={["Very Bad", "Bad", "Okay", "Good", "Great"][i]}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="vt-mood-label">Energy Level</div>
            <div className="vt-mood-emojis">
              {energyEmojis.map((e, i) => (
                <span
                  key={i}
                  className={`vt-mood-e${selEnergyV === i + 1 ? " selected" : ""}`}
                  onClick={() => setSelEnergyV(i + 1)}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="vt-btn-log-mood" onClick={logMood}>Log Mood & Energy</button>
        <div className="vt-mood-log-list">
          {moodLog.map((e, i) => (
            <div className="vt-mood-entry" key={i}>
              <span style={{ color: "var(--vt-muted)" }}>{e.date}</span>
              <span>Mood: {e.mE}</span>
              <span>Energy: {e.eE}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Measurements */}
      <div className="vt-meas-sect">
        <div className="vt-sect-title">📏 Body Measurements</div>
        <div className="vt-meas-grid">
          {[
            { label: "Chest (cm)", val: chest, set: setChest },
            { label: "Waist (cm)", val: waist, set: setWaist },
            { label: "Hips (cm)", val: hips, set: setHips },
            { label: "Arms (cm)", val: arms, set: setArms },
          ].map(f => (
            <div className="vt-meas-field" key={f.label}>
              <label>{f.label}</label>
              <input type="number" placeholder="--" value={f.val} onChange={e => f.set(e.target.value)} />
            </div>
          ))}
        </div>
        <button className="vt-btn-log-meas" onClick={() => { logMeasurements(chest, waist, hips, arms); setChest(""); setWaist(""); setHips(""); setArms(""); }}>
          Save Measurements
        </button>
        <div className="vt-meas-log-list">
          {measLog.map((e, i) => (
            <div className="vt-meas-entry" key={i}>
              <span>{e.date}</span>
              <span>Chest: {e.chest || "--"}</span>
              <span>Waist: {e.waist || "--"}</span>
              <span>Hips: {e.hips || "--"}</span>
              <span>Arms: {e.arms || "--"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
