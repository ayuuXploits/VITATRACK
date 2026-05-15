// Main Application Controller
const app = {
  // Initialize
  init() {
    this.selectedFood = null;
    this.foodQty = 1;
    this.dropdownFocusIdx = -1;
    this.currentDropdownItems = [];
    this.manualOpen = false;
    this.timerInterval = null;
    this.timerRemaining = 0;
    this.timerTotal = 0;
    this.timerRunning = false;
    this.guidedExercises = [];
    this.guidedIdx = 0;
    this.completedChallenges = new Set();
    this.weightChartInst = null;

    // Load initial data
    document.getElementById('results').style.display = 'none';
  },

  // Goal selection
  selGoal(goal) {
    document.querySelectorAll('[data-goal]').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-goal="${goal}"]`).classList.add('active');
    DataManager.setGoal(goal);
  },

  // Workout type selection
  selWork(type) {
    document.querySelectorAll('[data-work]').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-work="${type}"]`).classList.add('active');
    DataManager.setWorkoutType(type);
  },

  // Tab switching
  switchTab(id) {
    const tabs = ['overview', 'workout', 'nutrition', 'tracking', 'wellness', 'ai'];
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', tabs[i] === id);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    document.getElementById('tab-' + id).classList.add('active');

    // Render tab content
    switch(id) {
      case 'overview': break;
      case 'workout': UI.renderWorkout(); break;
      case 'nutrition': UI.renderNutrition(); break;
      case 'tracking': UI.renderTracking(); break;
      case 'wellness': UI.renderWellness(); break;
      case 'ai': UI.renderAI(); break;
    }
  },

  // Calculate and generate plan
  calculate() {
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (!age || !weight || !height || age < 10 || weight < 20 || height < 100) {
      Utils.showToast('Please fill all fields correctly');
      return;
    }

    const data = DataManager.calculate(age, gender, weight, height, activity);
    
    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Render overview
    UI.renderOverview(data);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    Utils.showToast('Plan generated successfully!');
  },

  // Timer functions
  openTimer(secs, exName) {
    this.timerTotal = secs;
    this.timerRemaining = secs;
    this.timerRunning = true;
    document.getElementById('timerEx').textContent = exName || 'Rest';
    document.getElementById('timerOverlay').classList.add('open');
    this.updateTimerDisplay();
    this.startTimerInterval();
  },

  startTimerInterval() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.timerRunning) return;
      this.timerRemaining--;
      this.updateTimerDisplay();
      if (this.timerRemaining <= 0) {
        clearInterval(this.timerInterval);
        document.getElementById('timerDisplay').textContent = 'Done!';
        document.getElementById('timerProgFill').style.width = '0%';
        Utils.showToast('Rest complete!');
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const m = Math.floor(this.timerRemaining / 60);
    const s = this.timerRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
      String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    const pct = this.timerTotal > 0 ? (this.timerRemaining / this.timerTotal * 100) : 0;
    document.getElementById('timerProgFill').style.width = pct + '%';
    document.getElementById('timerToggleBtn').textContent = this.timerRunning ? 'Pause' : 'Resume';
  },

  toggleTimer() {
    this.timerRunning = !this.timerRunning;
    document.getElementById('timerToggleBtn').textContent = this.timerRunning ? 'Pause' : 'Resume';
  },

  resetTimer() {
    this.timerRemaining = this.timerTotal;
    this.timerRunning = true;
    this.updateTimerDisplay();
  },

  closeTimer() {
    clearInterval(this.timerInterval);
    document.getElementById('timerOverlay').classList.remove('open');
  },

  // Food search
  onFoodInput(value) {
    this.dropdownFocusIdx = -1;
    if (value.trim().length < 1) {
      this.closeDropdown();
      return;
    }
    this.currentDropdownItems = DataManager.searchFoods(value);
    this.renderDropdown(value);
  },

  renderDropdown(query) {
    const dd = document.getElementById('foodDropdown');
    if (!dd) return;
    
    if (!this.currentDropdownItems.length) {
      dd.classList.remove('open');
      return;
    }

    dd.innerHTML = this.currentDropdownItems.map((food, i) => `
      <div class="fd-item" data-idx="${i}" onmousedown="event.preventDefault();app.selectFood(${i})">
        <span class="fd-emoji">${food.icon}</span>
        <div class="fd-info">
          <div class="fd-name">${Utils.highlightText(food.name, query)}</div>
          <div class="fd-meta">per ${food.unit}</div>
        </div>
        <span class="fd-cal">${food.cal} kcal</span>
      </div>
    `).join('');
    
    dd.classList.add('open');
  },

  onFoodKey(e) {
    const items = document.querySelectorAll('#foodDropdown .fd-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.dropdownFocusIdx = Math.min(this.dropdownFocusIdx + 1, items.length - 1);
      this.highlightDropdown(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.dropdownFocusIdx = Math.max(this.dropdownFocusIdx - 1, 0);
      this.highlightDropdown(items);
    } else if (e.key === 'Enter' && this.dropdownFocusIdx >= 0) {
      e.preventDefault();
      this.selectFood(this.dropdownFocusIdx);
    } else if (e.key === 'Escape') {
      this.closeDropdown();
    }
  },

  highlightDropdown(items) {
    items.forEach((el, i) => el.classList.toggle('focused', i === this.dropdownFocusIdx));
    if (items[this.dropdownFocusIdx]) {
      items[this.dropdownFocusIdx].scrollIntoView({ block: 'nearest' });
    }
  },

  closeDropdown() {
    const dd = document.getElementById('foodDropdown');
    if (dd) {
      dd.classList.remove('open');
      dd.innerHTML = '';
    }
  },

  selectFood(idx) {
    const food = this.currentDropdownItems[idx];
    if (!food) return;

    this.selectedFood = food;
    this.foodQty = 1;
    document.getElementById('foodSearch').value = food.name;
    this.closeDropdown();
    document.getElementById('pillEmoji').textContent = food.icon;
    document.getElementById('pillName').textContent = food.name;
    this.updatePillCalPreview();
    document.getElementById('foodPill').classList.add('show');
    document.getElementById('qtyRow').style.display = 'flex';
    document.getElementById('qtyUnit').textContent = food.unit;
    document.getElementById('qtyVal').textContent = '1';
    document.getElementById('btnLog').style.display = 'block';
  },

  updatePillCalPreview() {
    if (!this.selectedFood) return;
    const total = Math.round(this.selectedFood.cal * this.foodQty);
    document.getElementById('pillCalPreview').textContent = total + ' kcal - ' + this.foodQty + 'x';
    document.getElementById('btnLog').textContent = '+ Add ' + total + ' kcal';
  },

  changeQty(delta) {
    if (!this.selectedFood) return;
    this.foodQty = Math.max(0.5, Math.round((this.foodQty + delta) * 2) / 2);
    document.getElementById('qtyVal').textContent = this.foodQty % 1 === 0 ? this.foodQty : this.foodQty.toFixed(1);
    this.updatePillCalPreview();
  },

  clearSelected() {
    this.selectedFood = null;
    this.foodQty = 1;
    document.getElementById('foodSearch').value = '';
    document.getElementById('foodPill').classList.remove('show');
    document.getElementById('qtyRow').style.display = 'none';
    document.getElementById('btnLog').style.display = 'none';
    this.closeDropdown();
  },

  logSelectedFood() {
    if (!this.selectedFood) return;
    const cal = Math.round(this.selectedFood.cal * this.foodQty);
    const qtyLabel = this.foodQty !== 1 ? (this.foodQty % 1 === 0 ? this.foodQty : this.foodQty.toFixed(1)) + ' x ' : '';
    this.pushFoodEntry(this.selectedFood.icon, this.selectedFood.name, qtyLabel + this.selectedFood.unit, cal);
    this.clearSelected();
  },

  toggleManual() {
    this.manualOpen = !this.manualOpen;
    document.getElementById('manualRow').classList.toggle('show', this.manualOpen);
  },

  addManual() {
    const name = document.getElementById('manualName').value.trim();
    const cal = parseInt(document.getElementById('manualCal').value);
    if (!name || !cal || cal < 1) {
      Utils.showToast('Enter name and calories');
      return;
    }
    this.pushFoodEntry('*', name, 'manual', cal);
    document.getElementById('manualName').value = '';
    document.getElementById('manualCal').value = '';
  },

  pushFoodEntry(icon, name, qty, cal) {
    const log = document.getElementById('foodLog');
    const empty = log.querySelector('.food-empty');
    if (empty) empty.remove();

    const item = { icon, name, qty, cal };
    const idx = DataManager.addFoodItem(item);

    const entry = document.createElement('div');
    entry.className = 'food-entry';
    entry.innerHTML = `
      <span class="fe-emoji">${icon}</span>
      <div class="fe-info">
        <div class="fe-name">${name}</div>
        <div class="fe-qty">${qty}</div>
      </div>
      <span class="fe-cal">${cal} kcal</span>
      <button class="fe-del" onclick="app.removeFood(${idx},this)">X</button>
    `;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    
    this.updateFoodSummary();
    Utils.showToast('+ ' + cal + ' kcal');
  },

  removeFood(idx, btn) {
    DataManager.removeFoodItem(idx);
    btn.closest('.food-entry').remove();
    const log = document.getElementById('foodLog');
    if (!log.querySelector('.food-entry')) {
      log.innerHTML = '<div class="food-empty"><div>+</div>Search foods above</div>';
    }
    this.updateFoodSummary();
  },

  updateFoodSummary() {
    const summary = document.getElementById('foodSummary');
    if (DataManager.state.totalLogged > 0) {
      summary.style.display = 'flex';
      document.getElementById('foodTotalDisp').textContent = DataManager.state.totalLogged + ' kcal';
      const remaining = DataManager.state.dailyTarget - DataManager.state.totalLogged;
      const remEl = document.getElementById('foodRemainDisp');
      if (remaining > 0) {
        remEl.textContent = remaining + ' kcal left';
        remEl.style.color = 'var(--muted)';
      } else {
        remEl.textContent = Math.abs(remaining) + ' over';
        remEl.style.color = '#ef4444';
      }
    } else {
      summary.style.display = 'none';
    }
  },

  // Weight logging
  logWeight() {
    const val = parseFloat(document.getElementById('wtInput').value);
    if (!val || val < 20 || val > 300) {
      Utils.showToast('Enter valid weight');
      return;
    }
    DataManager.addWeightEntry(val);
    document.getElementById('wtInput').value = '';
    this.renderWeightList();
    Utils.showToast(val + ' kg logged');
  },

  renderWeightList() {
    const list = document.getElementById('wtLogList');
    if (!list) return;
    list.innerHTML = DataManager.state.weightLog.slice().reverse().map((entry, i) => `
      <div class="wt-entry">
        <span class="wt-entry-date">${entry.date}</span>
        <span class="wt-entry-val">${entry.val} kg</span>
        <button class="wt-entry-del" onclick="app.removeWeight(${DataManager.state.weightLog.length - 1 - i})">X</button>
      </div>
    `).join('');
  },

  removeWeight(idx) {
    DataManager.removeWeightEntry(idx);
    this.renderWeightList();
  },

  // Sleep logging
  logSleep() {
    const bed = document.getElementById('sleepBed').value;
    const wake = document.getElementById('sleepWake').value;
    if (!bed || !wake) {
      Utils.showToast('Set both times');
      return;
    }
    DataManager.addSleepEntry(bed, wake);
    Utils.showToast('Sleep logged!');
  },

  // Mood
  setMood(type, val) {
    if (type === 'mood') {
      DataManager.state.moodValue = val;
      document.querySelectorAll('#moodEmojis .mood-e').forEach((e, i) => {
        e.classList.toggle('selected', i + 1 === val);
      });
    } else {
      DataManager.state.energyValue = val;
      document.querySelectorAll('#energyEmojis .mood-e').forEach((e, i) => {
        e.classList.toggle('selected', i + 1 === val);
      });
    }
  },

  logMood() {
    if (!DataManager.state.moodValue || !DataManager.state.energyValue) {
      Utils.showToast('Select both mood and energy');
      return;
    }
    DataManager.addMoodEntry(DataManager.state.moodValue, DataManager.state.energyValue);
    Utils.showToast('Mood logged!');
  },

  // Measurements
  logMeasurements() {
    const measurements = {
      chest: document.getElementById('measChest').value,
      waist: document.getElementById('measWaist').value,
      hips: document.getElementById('measHips').value,
      arms: document.getElementById('measArms').value
    };

    if (!Object.values(measurements).some(v => v)) {
      Utils.showToast('Enter at least one measurement');
      return;
    }

    DataManager.addMeasurementEntry(measurements);
    Utils.showToast('Measurements saved!');
  },

  // Guided workout
  startGuidedWorkout() {
    const activeDay = document.querySelector('.day-pane.active');
    if (!activeDay) {
      Utils.showToast('Select a workout day first');
      return;
    }

    const items = activeDay.querySelectorAll('.ex-item');
    if (!items.length) {
      Utils.showToast('This is a rest day!');
      return;
    }

    this.guidedExercises = [];
    items.forEach(el => {
      this.guidedExercises.push({
        name: el.querySelector('.ex-name').childNodes[0].textContent.trim(),
        small: el.querySelector('small').textContent,
        sets: el.querySelector('.ex-tag.sets').textContent,
        reps: el.querySelector('.ex-tag.reps').textContent,
        rst: el.querySelector('.ex-tag.rest').textContent
      });
    });

    this.guidedIdx = 0;
    this.renderGuided();
    document.getElementById('guidedOverlay').classList.add('open');
    DataManager.markWorkoutDay();
  },

  renderGuided() {
    const ex = this.guidedExercises[this.guidedIdx];
    const total = this.guidedExercises.length;

    document.getElementById('guidedStep').textContent = 'Exercise ' + (this.guidedIdx + 1) + '/' + total;
    document.getElementById('guidedName').textContent = ex.name;
    document.getElementById('guidedMuscle').textContent = ex.small;
    document.getElementById('guidedDesc').textContent = ex.small;
    document.getElementById('guidedSets').textContent = ex.sets;
    document.getElementById('guidedReps').textContent = ex.reps;
    document.getElementById('guidedRest').textContent = ex.rst;
    document.getElementById('guidedProgFill').style.width = (this.guidedIdx / total * 100) + '%';
    document.getElementById('guidedPrevBtn').style.opacity = this.guidedIdx === 0 ? '0.3' : '1';
    document.getElementById('guidedNextBtn').textContent = this.guidedIdx === total - 1 ? 'Finish' : 'Next';
  },

  guidedNav(dir) {
    this.guidedIdx += dir;
    if (this.guidedIdx < 0) this.guidedIdx = 0;
    if (this.guidedIdx >= this.guidedExercises.length) {
      this.closeGuided();
      Utils.showToast('Workout complete!');
      return;
    }
    this.renderGuided();
  },

  startRestFromGuided() {
    const ex = this.guidedExercises[this.guidedIdx];
    this.closeGuided();
    this.openTimer(Utils.parseRestSecs(ex.rst), ex.name);
  },

  closeGuided() {
    document.getElementById('guidedOverlay').classList.remove('open');
  },

  // AI Coach
  async aiAction(type) {
    const loading = document.getElementById('aiLoading');
    const output = document.getElementById('aiOutput');
    
    loading.classList.add('show');
    output.classList.remove('show');
    output.textContent = '';

    const profile = DataManager.state.userProfile;
    const prompts = {
      meals: `Suggest 3 practical Indian meal ideas for a ${profile.age}yo ${profile.gender}, ${profile.weight}kg, goal: ${profile.goal}. Be concise.`,
      summary: `Give a brief health summary for ${profile.age}yo ${profile.gender}, ${profile.weight}kg.`,
      workout: `Give 3 fitness tips for ${profile.age}yo ${profile.gender} using ${profile.work} workouts.`,
      motivation: `Motivate a ${profile.age}yo ${profile.gender} working toward ${profile.goal} goal.`
    };

    try {
      // For demo, use simulated response
      const response = this.getSimulatedResponse(type, profile);
      output.textContent = response;
      output.classList.add('show');
    } catch (err) {
      output.textContent = 'Unable to connect. Please try again.';
      output.classList.add('show');
    }
    
    loading.classList.remove('show');
  },

  getSimulatedResponse(type, profile) {
    const responses = {
      meals: `Here are 3 meal suggestions for your ${profile.goal} goal:

1. Breakfast: Oats with milk and banana (350 kcal)
2. Lunch: 2 rotis with dal and grilled chicken (500 kcal)
3. Dinner: Brown rice with fish curry and vegetables (450 kcal)

Total: ~1300 kcal. Adjust portions based on your ${DataManager.state.dailyTarget} kcal target.`,
      
      summary: `Based on your profile (${profile.age}yo ${profile.gender}, ${profile.weight}kg), you're making progress toward your ${profile.goal} goal. Your current daily target is ${DataManager.state.dailyTarget} kcal. Keep tracking consistently for best results!`,
      
      workout: `Here are 3 key tips for your ${profile.work} workouts:

1. Focus on progressive overload - increase weight/reps weekly
2. Maintain proper form over heavy weights
3. Get 7-8 hours of sleep for optimal recovery`,
      
      motivation: `You're doing great! Every workout and healthy meal brings you closer to your ${profile.goal} goal. Remember, consistency beats perfection. Stay focused and keep pushing forward!`
    };
    
    return responses[type] || 'Keep up the great work!';
  },

  // Meal templates
  saveMealTemplate() {
    const items = DataManager.state.foodItems.filter(Boolean);
    if (!items.length) {
      Utils.showToast('Log some foods first');
      return;
    }
    const name = prompt('Template name:', 'My Meal');
    if (!name) return;
    DataManager.saveMealTemplate(name, items);
    Utils.showToast('Template saved: ' + name);
  }
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  
  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.food-search-wrap')) {
      app.closeDropdown();
    }
  });
});