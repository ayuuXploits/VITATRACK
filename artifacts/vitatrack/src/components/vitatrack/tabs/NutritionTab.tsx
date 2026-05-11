import { useState, useRef, useEffect } from "react";
import { searchFoods } from "../../../data/foodDb";
import type { FoodEntry, MealTemplate } from "../../../hooks/useVitaTrack";

interface Props {
  foodItems: (FoodEntry | null)[];
  totalLogged: number;
  dailyTarget: number;
  mealTemplates: MealTemplate[];
  waterGoal: number;
  waterCount: number;
  pushFoodEntry: (e: FoodEntry) => void;
  removeFoodEntry: (i: number) => void;
  toggleWater: (filled: boolean) => void;
  saveMealTemplate: (name: string) => void;
  loadTemplate: (i: number) => void;
  applyCustomTargets: (cal?: number, prot?: number, carbs?: number) => void;
  showToast: (msg: string) => void;
  dailyTargetProp: number;
}

export default function NutritionTab({
  foodItems, totalLogged, dailyTarget, mealTemplates,
  waterGoal, waterCount, pushFoodEntry, removeFoodEntry,
  toggleWater, saveMealTemplate, loadTemplate, applyCustomTargets, showToast,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchFoods>>([]);
  const [pending, setPending] = useState<ReturnType<typeof searchFoods>[0] | null>(null);
  const [qty, setQty] = useState(1);
  const [showManual, setShowManual] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualCal, setManualCal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tmplName, setTmplName] = useState("");
  const [showTmpl, setShowTmpl] = useState(false);
  const [customCal, setCustomCal] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = searchFoods(query);
    setResults(r);
    setShowDropdown(query.length > 0 && r.length > 0 && !pending);
  }, [query, pending]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectFood = (food: ReturnType<typeof searchFoods>[0]) => {
    setPending(food);
    setQty(1);
    setQuery("");
    setShowDropdown(false);
  };

  const logFood = () => {
    if (!pending) return;
    pushFoodEntry({
      emoji: pending.emoji,
      name: pending.name,
      qty: `${qty} × ${pending.unit}`,
      cal: Math.round(pending.cal * qty),
    });
    setPending(null);
    setQty(1);
  };

  const logManual = () => {
    const cal = parseInt(manualCal);
    if (!manualName.trim() || isNaN(cal) || cal <= 0) { showToast("Enter a valid name and calories."); return; }
    pushFoodEntry({ emoji: "🍽️", name: manualName.trim(), qty: "1 serving", cal });
    setManualName(""); setManualCal("");
    showToast(`Logged ${cal} kcal manually.`);
  };

  const remaining = dailyTarget - totalLogged;
  const pct = Math.min(100, Math.round((totalLogged / dailyTarget) * 100));
  const activeItems = foodItems.filter((x): x is FoodEntry => x !== null);

  return (
    <div>
      {/* Food search */}
      <div className="vt-food-sect">
        <div className="vt-sect-title">Log Your Food</div>

        {mealTemplates.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <div className="vt-section-label">Meal Templates</div>
            <div className="vt-tmpl-row">
              {mealTemplates.map((t, i) => (
                <button key={i} className="vt-tmpl-btn" onClick={() => loadTemplate(i)}>📋 {t.name}</button>
              ))}
            </div>
          </div>
        )}

        <div className="vt-food-search-wrap" ref={searchRef}>
          <input
            className="vt-food-search-input"
            placeholder='Search "banana", "chicken curry", "dal"…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query && results.length && setShowDropdown(true)}
          />
          <span className="vt-food-search-icon">🔍</span>
          {showDropdown && (
            <div className="vt-food-dropdown">
              {results.map((f, i) => (
                <div key={i} className="vt-fd-item" onMouseDown={() => selectFood(f)}>
                  <span className="vt-fd-emoji">{f.emoji}</span>
                  <div className="vt-fd-info">
                    <div className="vt-fd-name">{f.name}</div>
                    <div className="vt-fd-meta">{f.unit}</div>
                  </div>
                  <span className="vt-fd-cal">{f.cal} kcal</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {pending && (
          <>
            <div className="vt-food-pill">
              <span className="vt-pill-emoji">{pending.emoji}</span>
              <div className="vt-pill-info">
                <div className="vt-pill-name">{pending.name}</div>
                <div className="vt-pill-cal-preview">{Math.round(pending.cal * qty)} kcal</div>
              </div>
              <button className="vt-pill-clear" onClick={() => setPending(null)}>✕</button>
            </div>
            <div className="vt-qty-row">
              <span className="vt-qty-label">Quantity ({pending.unit})</span>
              <div className="vt-qty-btns">
                <button className="vt-qty-btn" onClick={() => setQty(q => Math.max(0.5, parseFloat((q - 0.5).toFixed(1))))}>−</button>
                <span className="vt-qty-val">{qty}</span>
                <button className="vt-qty-btn" onClick={() => setQty(q => parseFloat((q + 0.5).toFixed(1)))}>+</button>
              </div>
            </div>
            <button className="vt-btn-log" onClick={logFood}>+ Log {Math.round(pending.cal * qty)} kcal</button>
          </>
        )}

        <div className="vt-manual-toggle" onClick={() => setShowManual(s => !s)}>
          {showManual ? "▲ Hide" : "▼ Add manually (custom kcal)"}
        </div>
        {showManual && (
          <div className="vt-manual-row">
            <input placeholder="Food name" value={manualName} onChange={e => setManualName(e.target.value)} />
            <input type="number" placeholder="Calories" value={manualCal} onChange={e => setManualCal(e.target.value)} />
            <button className="vt-btn-add-manual" onClick={logManual}>Add</button>
          </div>
        )}

        {/* Summary bar */}
        <div className="vt-food-summary">
          <span>{totalLogged} / {dailyTarget} kcal</span>
          <div className="vt-mbar-bg" style={{ flex: 1, margin: "0 12px" }}>
            <div className="vt-mbar-fill" style={{ width: `${pct}%`, background: remaining < 0 ? "#ef4444" : "var(--vt-accent)" }} />
          </div>
          <strong style={{ color: remaining < 0 ? "#ef4444" : "var(--vt-accent)" }}>
            {remaining < 0 ? `+${Math.abs(remaining)}` : remaining} kcal {remaining < 0 ? "over" : "left"}
          </strong>
        </div>

        {/* Template save */}
        {activeItems.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <button className="vt-btn-save-tmpl" onClick={() => setShowTmpl(s => !s)}>💾 Save as Template</button>
            {showTmpl && (
              <>
                <input
                  style={{ flex: 1, background: "var(--vt-surface2)", border: "1.5px solid var(--vt-border)", borderRadius: "10px", padding: "7px 12px", color: "var(--vt-text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", outline: "none" }}
                  placeholder="Template name"
                  value={tmplName}
                  onChange={e => setTmplName(e.target.value)}
                />
                <button className="vt-btn-add-manual" onClick={() => { saveMealTemplate(tmplName || "Meal"); setTmplName(""); setShowTmpl(false); }}>Save</button>
              </>
            )}
          </div>
        )}

        {/* Food log */}
        {activeItems.length === 0 ? (
          <div className="vt-food-empty">
            <div>🥗</div>
            Search and log your first meal above!
          </div>
        ) : (
          <div className="vt-food-log">
            {foodItems.map((item, i) =>
              item ? (
                <div className="vt-food-entry" key={i}>
                  <span className="vt-fe-emoji">{item.emoji}</span>
                  <div className="vt-fe-info">
                    <div className="vt-fe-name">{item.name}</div>
                    <div className="vt-fe-qty">{item.qty}</div>
                  </div>
                  <span className="vt-fe-cal">{item.cal} kcal</span>
                  <button className="vt-fe-del" onClick={() => removeFoodEntry(i)}>🗑</button>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Export */}
        <div className="vt-export-row" style={{ marginTop: "16px" }}>
          <button className="vt-btn-export" onClick={() => {
            const rows = activeItems.map(i => `${i.name},${i.qty},${i.cal}`).join("\n");
            const blob = new Blob([`Name,Qty,Calories\n${rows}`], { type: "text/csv" });
            const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "food-log.csv"; a.click();
          }}>📄 Export CSV</button>
          <button className="vt-btn-export" onClick={() => window.print()}>🖨️ Print</button>
        </div>
      </div>

      {/* Water */}
      <div className="vt-water-sect">
        <div className="vt-sect-title">💧 Hydration Tracker</div>
        <div className="vt-water-glasses">
          {Array.from({ length: waterGoal }).map((_, i) => {
            const filled = i < waterCount;
            return (
              <div
                key={i}
                className={`vt-glass${filled ? " filled" : ""}`}
                title={filled ? "Click to unlog" : "Click to log a glass"}
                onClick={() => toggleWater(!filled)}
              >
                <div className="vt-glass-fill" />
              </div>
            );
          })}
        </div>
        <div className="vt-water-txt">
          <strong>{waterCount}</strong> / {waterGoal} glasses today
          {waterCount >= waterGoal && " 🎉 Goal reached!"}
        </div>
      </div>

      {/* Custom targets */}
      <div className="vt-custom-targets-sect">
        <div className="vt-sect-title">⚙️ Custom Targets Override</div>
        <div className="vt-custom-grid">
          <div className="vt-custom-field">
            <label>Calories (kcal)</label>
            <input type="number" placeholder={String(dailyTarget)} value={customCal} onChange={e => setCustomCal(e.target.value)} />
          </div>
        </div>
        <button className="vt-btn-apply-custom" onClick={() => { applyCustomTargets(parseInt(customCal) || undefined); setCustomCal(""); }}>
          Apply Custom Targets
        </button>
      </div>
    </div>
  );
}
