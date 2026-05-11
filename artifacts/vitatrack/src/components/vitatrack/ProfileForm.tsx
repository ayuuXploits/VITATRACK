import { useState } from "react";

interface Props {
  goal: string;
  onCalculate: (age: number, gender: string, weight: number, height: number, act: number) => void;
  accentColor: string;
}

export default function ProfileForm({ goal, onCalculate, accentColor }: Props) {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [act, setAct] = useState("1.55");

  const handle = () => {
    const a = parseInt(age), w = parseFloat(weight), h = parseFloat(height), f = parseFloat(act);
    if (!a || !w || !h || !f || a < 10 || a > 100 || w < 20 || h < 100) return;
    onCalculate(a, gender, w, h, f);
  };

  return (
    <>
      <div className="vt-form-grid">
        <div className="vt-field">
          <label>Age</label>
          <input type="number" min="10" max="100" placeholder="25" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div className="vt-field">
          <label>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="vt-field">
          <label>Weight (kg)</label>
          <input type="number" step="0.5" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div className="vt-field">
          <label>Height (cm)</label>
          <input type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        <div className="vt-field" style={{ gridColumn: "1 / -1" }}>
          <label>Activity Level</label>
          <select value={act} onChange={e => setAct(e.target.value)}>
            <option value="1.2">Sedentary (desk job, no exercise)</option>
            <option value="1.375">Lightly active (1–3 days/week)</option>
            <option value="1.55">Moderately active (3–5 days/week)</option>
            <option value="1.725">Very active (6–7 days/week)</option>
            <option value="1.9">Extremely active (2× training/day)</option>
          </select>
        </div>
        <button
          className="vt-btn-calc"
          style={{ background: accentColor }}
          onClick={handle}
        >
          Calculate My {goal === "lose" ? "Fat Loss" : goal === "gain" ? "Muscle Gain" : "Maintenance"} Plan
        </button>
      </div>
    </>
  );
}
