// UI Rendering Module
const UI = {
  // Render overview tab
  renderOverview(data) {
    const tab = document.getElementById('tab-overview');
    if (!tab) return;

    tab.innerHTML = `
      <div class="ring-wrap">
        <div class="ring-cont">
          <svg class="ring-svg" viewBox="0 0 100 100">
            <circle class="rbg" cx="50" cy="50" r="42"/>
            <circle class="rfill" id="ringFill" cx="50" cy="50" r="42"/>
          </svg>
          <div class="ring-ctr">
            <div class="ring-pct" id="ringPct">0%</div>
            <div class="ring-lbl">Goal</div>
          </div>
        </div>
        <div class="ring-info">
          <h3>Daily Calories</h3>
          <div class="ring-stat"><span>BMR</span><strong id="bmrS">${data.bmr} kcal</strong></div>
          <div class="ring-stat"><span>Maintenance</span><strong id="maintS">${data.tdee} kcal</strong></div>
          <div class="ring-stat"><span>Target</span><strong id="targetS">${data.target} kcal</strong></div>
          <div class="ring-stat"><span>Logged</span><strong id="loggedS">${DataManager.state.totalLogged} kcal</strong></div>
        </div>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">BMI</div>
          <div class="metric-value">${data.bmi}</div>
          <div class="metric-unit">${data.bmiCategory}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Ideal Weight</div>
          <div class="metric-value">${data.idealRange.low}-${data.idealRange.high}</div>
          <div class="metric-unit">kg</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Protein</div>
          <div class="metric-value">${data.macros.protein}</div>
          <div class="metric-unit">g/day</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Timeline</div>
          <div class="metric-value">--</div>
          <div class="metric-unit">--</div>
        </div>
      </div>
      
      <div class="bmi-sect">
        <div class="bmi-hdr">
          <span class="bmi-ttl">BMI Scale</span>
          <span class="bmi-badge">${data.bmiCategory}</span>
        </div>
        <div class="bmi-track">
          <div class="bmi-ptr" style="left:50%"></div>
        </div>
        <div class="bmi-lbls">
          <span>Under<br>&lt;18.5</span>
          <span>Normal<br>18.5-24.9</span>
          <span>Over<br>25-29.9</span>
          <span>Obese<br>&gt;30</span>
        </div>
      </div>
      
      <div class="macro-sect">
        <div class="sect-title">Macro Targets</div>
        <div class="macro-row">
          <div class="macro-info"><span>Protein</span><span>${data.macros.protein}g</span></div>
          <div class="mbar-bg"><div class="mbar-fill" style="width:${data.macroSplit.protein * 100}%;background:#6366f1"></div></div>
        </div>
        <div class="macro-row">
          <div class="macro-info"><span>Carbs</span><span>${data.macros.carbs}g</span></div>
          <div class="mbar-bg"><div class="mbar-fill" style="width:${data.macroSplit.carbs * 100}%;background:#f97316"></div></div>
        </div>
        <div class="macro-row">
          <div class="macro-info"><span>Fats</span><span>${data.macros.fat}g</span></div>
          <div class="mbar-bg"><div class="mbar-fill" style="width:${data.macroSplit.fat * 100}%;background:#22c55e"></div></div>
        </div>
      </div>
    `;
  },

  // Render workout tab
  renderWorkout() {
    const tab = document.getElementById('tab-workout');
    const routine = DataManager.getWeeklyRoutine();
    
    if (DataManager.state.workoutType === 'none') {
      tab.innerHTML = `
        <div class="routine-sect">
          <div class="sect-title">Lifestyle Plan</div>
          <div class="plan-items">
            ${NoWorkoutTips.map(tip => `
              <div class="plan-item">
                <span class="pi-icon">${tip.i}</span>
                <div class="pi-text">
                  <strong>${tip.t}</strong>
                  <span>${tip.p}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      return;
    }

    const dayTabs = routine.map((day, i) => `
      <div class="day-tab${day.type === 'rest' ? ' is-rest' : ''}${i === 0 ? ' active' : ''}" 
           onclick="UI.switchDay(${i})">${day.day}</div>
    `).join('');

    const dayContents = routine.map((day, i) => {
      if (day.type === 'rest') {
        const tip = RestTips[DataManager.state.goal];
        return `
          <div class="day-pane${i === 0 ? ' active' : ''}">
            <div class="rest-box">
              <div class="ri">${tip.i}</div>
              <h3>${tip.t}</h3>
              <p>${tip.p}</p>
            </div>
          </div>
        `;
      }

      const exercises = [];
      day.muscles.forEach(muscle => {
        const exs = DataManager.getExercises(DataManager.state.workoutType, muscle);
        exs.forEach(ex => {
          if (!exercises.find(x => x.n === ex.n)) exercises.push(ex);
        });
      });

      return `
        <div class="day-pane${i === 0 ? ' active' : ''}">
          <div class="day-focus">${day.focus}</div>
          <div class="ex-header">
            <span>Exercise</span><span>Sets</span><span>Reps</span><span>Rest</span><span></span>
          </div>
          <div class="ex-list">
            ${exercises.map(ex => {
              const secs = Utils.parseRestSecs(ex.rst);
              return `
                <div class="ex-item">
                  <div class="ex-name">${ex.n}<small>${ex.m}</small></div>
                  <span class="ex-tag sets">${ex.sets}</span>
                  <span class="ex-tag reps">${ex.reps}</span>
                  <span class="ex-tag rest">${ex.rst}</span>
                  <button class="btn-timer-start" onclick="app.openTimer(${secs},'${ex.n}')">Timer</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    tab.innerHTML = `
      <div class="routine-sect">
        <div class="routine-hdr">
          <div class="sect-title" style="margin-bottom:0">Weekly Routine</div>
          <button class="btn-timer-start" onclick="app.startGuidedWorkout()">Guided Mode</button>
        </div>
        <div class="day-tabs">${dayTabs}</div>
        <div id="dayContents">${dayContents}</div>
      </div>
      <div class="lib-sect">
        <div class="sect-title">Exercise Library</div>
        <div class="lib-filters">
          <div class="lib-f active" onclick="UI.filterLibrary('all',this)">All</div>
          ${Object.keys(ExerciseDB[DataManager.state.workoutType] || {}).map(cat => `
            <div class="lib-f" onclick="UI.filterLibrary('${cat}',this)">${cat}</div>
          `).join('')}
        </div>
        <div class="lib-grid" id="libGrid"></div>
      </div>
    `;

    this.filterLibrary('all', document.querySelector('.lib-f'));
  },

  // Switch workout day
  switchDay(index) {
    document.querySelectorAll('.day-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.day-pane').forEach((pane, i) => {
      pane.classList.toggle('active', i === index);
    });
  },

  // Filter exercise library
  filterLibrary(category, element) {
    document.querySelectorAll('.lib-f').forEach(f => f.classList.remove('active'));
    if (element) element.classList.add('active');

    const db = ExerciseDB[DataManager.state.workoutType] || {};
    const categories = category === 'all' ? Object.keys(db) : [category];
    
    const exercises = categories.flatMap(cat => db[cat] || []);
    
    document.getElementById('libGrid').innerHTML = exercises.map(ex => `
      <div class="lib-card">
        <div class="lib-card-top">
          <div class="lib-card-name">${ex.n}</div>
          <span class="lib-muscle">${ex.m}</span>
        </div>
        <div class="lib-desc">${ex.d}</div>
        <div class="lib-tags">
          ${ex.tags.map(t => `<span class="lib-tag">${t}</span>`).join('')}
          <span class="lib-tag">${ex.sets}x${ex.reps}</span>
        </div>
      </div>
    `).join('');
  },

  // Render nutrition tab
  renderNutrition() {
    const tab = document.getElementById('tab-nutrition');
    tab.innerHTML = `
      <div class="food-sect">
        <div class="sect-title">Food Log</div>
        <div class="meal-templates">
          <div class="section-label" style="margin-bottom:6px;">Meal Templates</div>
          <div class="tmpl-row" id="tmplRow">
            <span style="font-size:.7rem;color:var(--muted);">Save meals as templates</span>
          </div>
          <button class="btn-save-tmpl" onclick="app.saveMealTemplate()">Save Template</button>
        </div>
        <div style="border-top:1px solid var(--border);margin:10px 0;"></div>
        <div class="food-search-wrap">
          <input class="food-search-input" id="foodSearch" type="text" 
                 placeholder="Search food... rice, egg, banana..." 
                 autocomplete="off" 
                 oninput="app.onFoodInput(this.value)" 
                 onkeydown="app.onFoodKey(event)">
          <span class="food-search-icon">&#x1F50D;</span>
          <div class="food-dropdown" id="foodDropdown"></div>
        </div>
        <div class="food-selected-pill" id="foodPill">
          <span class="pill-emoji" id="pillEmoji">-</span>
          <div class="pill-info">
            <div class="pill-name" id="pillName">--</div>
            <div class="pill-cal-preview" id="pillCalPreview">--</div>
          </div>
          <button class="pill-clear" onclick="app.clearSelected()">X</button>
        </div>
        <div class="food-qty-row" id="qtyRow" style="display:none">
          <span class="qty-label">Qty:</span>
          <div class="qty-btns">
            <button class="qty-btn" onclick="app.changeQty(-0.5)">-</button>
            <span class="qty-val" id="qtyVal">1</span>
            <button class="qty-btn" onclick="app.changeQty(0.5)">+</button>
          </div>
          <span class="qty-label" id="qtyUnit">serving</span>
        </div>
        <button class="btn-log" id="btnLog" onclick="app.logSelectedFood()" style="display:none">+ Add to Log</button>
        <div class="manual-toggle" onclick="app.toggleManual()">+ Add food manually</div>
        <div class="manual-row" id="manualRow">
          <input type="text" id="manualName" placeholder="Food name">
          <input type="number" id="manualCal" placeholder="kcal" style="max-width:80px" inputmode="numeric">
          <button class="btn-add-manual" onclick="app.addManual()">Add</button>
        </div>
        <div class="food-summary" id="foodSummary" style="display:none">
          <span>Today</span>
          <strong id="foodTotalDisp">0 kcal</strong>
          <span id="foodRemainDisp">--</span>
        </div>
        <div class="food-log" id="foodLog">
          <div class="food-empty"><div>+</div>Search foods above</div>
        </div>
      </div>
      <div class="water-sect">
        <div class="sect-title">Hydration</div>
        <div class="water-glasses" id="waterGlasses"></div>
        <div class="water-txt">
          <strong id="wCount">0</strong>/<span id="wGoal">${DataManager.state.waterGoal}</span> glasses
        </div>
      </div>
    `;

    // Initialize water glasses
    this.renderWaterGlasses();
  },

  // Render water glasses
  renderWaterGlasses() {
    const container = document.getElementById('waterGlasses');
    if (!container) return;
    
    container.innerHTML = '';
    DataManager.state.waterCount = 0;
    
    for (let i = 0; i < DataManager.state.waterGoal; i++) {
      const glass = document.createElement('div');
      glass.className = 'glass';
      glass.innerHTML = '<div class="glass-fill"></div>';
      glass.onclick = () => {
        const filled = glass.classList.toggle('filled');
        DataManager.state.waterCount += filled ? 1 : -1;
        document.getElementById('wCount').textContent = DataManager.state.waterCount;
        if (DataManager.state.waterCount === DataManager.state.waterGoal) {
          Utils.showToast('Hydrated!');
          DataManager.checkBadge('hydrated', true);
        }
      };
      container.appendChild(glass);
    }
  },

  // Render tracking tab
  renderTracking() {
    const tab = document.getElementById('tab-tracking');
    tab.innerHTML = `
      <div class="weight-sect">
        <div class="sect-title">Weight Log</div>
        <div class="weight-input-row">
          <input type="number" id="wtInput" placeholder="Weight (kg)" step="0.1" inputmode="decimal">
          <button class="btn-log-wt" onclick="app.logWeight()">Log</button>
        </div>
        <div class="chart-wrap"><canvas id="weightChart"></canvas></div>
        <div class="wt-log-list" id="wtLogList"></div>
      </div>
      <div class="meas-sect">
        <div class="sect-title">Measurements</div>
        <div class="meas-grid">
          <div class="meas-field"><label>Chest (cm)</label><input type="number" id="measChest" placeholder="95" inputmode="numeric"></div>
          <div class="meas-field"><label>Waist (cm)</label><input type="number" id="measWaist" placeholder="80" inputmode="numeric"></div>
          <div class="meas-field"><label>Hips (cm)</label><input type="number" id="measHips" placeholder="90" inputmode="numeric"></div>
          <div class="meas-field"><label>Arms (cm)</label><input type="number" id="measArms" placeholder="32" inputmode="numeric"></div>
        </div>
        <button class="btn-log-meas" onclick="app.logMeasurements()">Log Measurements</button>
        <div class="meas-log-list" id="measLogList"></div>
      </div>
    `;
  },

  // Render wellness tab
  renderWellness() {
    const tab = document.getElementById('tab-wellness');
    tab.innerHTML = `
      <div class="sleep-sect">
        <div class="sect-title">Sleep Tracker</div>
        <div class="sleep-row">
          <div class="field"><label>Bedtime</label><input type="time" id="sleepBed" value="22:30"></div>
          <div class="field"><label>Wake</label><input type="time" id="sleepWake" value="06:30"></div>
          <button class="btn-log-wt" onclick="app.logSleep()">Log</button>
        </div>
        <div class="sleep-stats">
          <div class="sleep-stat">
            <div class="sleep-stat-val" id="sleepLast">--</div>
            <div class="sleep-stat-lbl">Last night</div>
          </div>
          <div class="sleep-stat">
            <div class="sleep-stat-val" id="sleepAvg">--</div>
            <div class="sleep-stat-lbl">7-day avg</div>
          </div>
        </div>
        <div class="sleep-log-list" id="sleepLogList"></div>
      </div>
      <div class="mood-sect">
        <div class="sect-title">Mood & Energy</div>
        <div class="mood-grid">
          <div>
            <div class="mood-label">Mood</div>
            <div class="mood-emojis" id="moodEmojis">
              <span class="mood-e" onclick="app.setMood('mood',1)">:(</span>
              <span class="mood-e" onclick="app.setMood('mood',2)">:|</span>
              <span class="mood-e" onclick="app.setMood('mood',3)">:)</span>
              <span class="mood-e" onclick="app.setMood('mood',4)">:D</span>
              <span class="mood-e" onclick="app.setMood('mood',5)">^_^</span>
            </div>
          </div>
          <div>
            <div class="mood-label">Energy</div>
            <div class="mood-emojis" id="energyEmojis">
              <span class="mood-e" onclick="app.setMood('energy',1)">0%</span>
              <span class="mood-e" onclick="app.setMood('energy',2)">25%</span>
              <span class="mood-e" onclick="app.setMood('energy',3)">50%</span>
              <span class="mood-e" onclick="app.setMood('energy',4)">75%</span>
              <span class="mood-e" onclick="app.setMood('energy',5)">100%</span>
            </div>
          </div>
        </div>
        <button class="btn-log-mood" onclick="app.logMood()">Log Mood</button>
        <div class="mood-log-list" id="moodLogList"></div>
      </div>
    `;
  },

  // Render AI tab
  renderAI() {
    const tab = document.getElementById('tab-ai');
    tab.innerHTML = `
      <div class="ai-sect">
        <div class="sect-title">AI Health Coach</div>
        <p style="font-size:.8rem;color:var(--muted);margin-bottom:12px;">Get personalized advice based on your data</p>
        <div class="ai-btn-row">
          <button class="ai-btn" onclick="app.aiAction('meals')">Meal Ideas</button>
          <button class="ai-btn" onclick="app.aiAction('summary')">Weekly Summary</button>
          <button class="ai-btn" onclick="app.aiAction('workout')">Workout Tips</button>
          <button class="ai-btn" onclick="app.aiAction('motivation')">Motivate Me!</button>
        </div>
        <div class="ai-loading" id="aiLoading">
          <div class="spinner"></div>
          <span>AI thinking...</span>
        </div>
        <div class="ai-output" id="aiOutput"></div>
      </div>
    `;
  }
};

window.UI = UI;