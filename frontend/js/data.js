// Data Management Module
const DataManager = {
  // State
  state: {
    goal: 'lose',
    workoutType: 'gym',
    dailyTarget: 2000,
    totalLogged: 0,
    foodItems: [],
    waterGoal: 8,
    waterCount: 0,
    mealTemplates: [],
    weightLog: [],
    sleepLog: [],
    moodLog: [],
    moodValue: 0,
    energyValue: 0,
    measLog: [],
    workoutStreak: 0,
    workoutDays: new Set(),
    earnedBadges: new Set(),
    userProfile: {}
  },

  // Badges
  badges: [
    {id:'first_log',icon:'*',name:'First Meal'},
    {id:'week_streak',icon:'!',name:'7-Day Streak'},
    {id:'protein_hero',icon:'P',name:'Protein Hero'},
    {id:'hydrated',icon:'~',name:'Hydrated'},
    {id:'sleeper',icon:'Z',name:'Sleep Champ'},
    {id:'mood_tracker',icon:'M',name:'Mood Aware'},
    {id:'weight_watcher',icon:'W',name:'Weight Watcher'}
  ],

  // Challenges
  challenges: [
    {id:'c1',icon:'~',name:'Drink 8 glasses of water'},
    {id:'c2',icon:'>',name:'Walk 10,000 steps'},
    {id:'c3',icon:'P',name:'Hit protein target'},
    {id:'c4',icon:'Z',name:'Sleep 7+ hours'},
    {id:'c5',icon:'O',name:'5 min breathing'},
    {id:'c6',icon:'X',name:'No screen before bed'}
  ],

  // Goal selection
  setGoal(goal) {
    this.state.goal = goal;
    const accents = {
      gain: 'var(--gain)',
      lose: 'var(--lose)',
      maintain: 'var(--maintain)'
    };
    document.documentElement.style.setProperty('--accent', accents[goal]);
  },

  // Workout type selection
  setWorkoutType(type) {
    this.state.workoutType = type;
  },

  // Calculate all metrics
  calculate(age, gender, weight, height, activity) {
    const bmr = Utils.calculateBMR(weight, height, age, gender);
    const tdee = Math.round(bmr * activity);
    
    let target;
    if (this.state.goal === 'lose') target = tdee - 500;
    else if (this.state.goal === 'gain') target = tdee + 400;
    else target = tdee;
    
    target = Math.max(target, 1200);
    this.state.dailyTarget = target;
    this.state.userProfile = { age, gender, weight, height, activity, goal: this.state.goal, work: this.state.workoutType };

    const bmi = Utils.calculateBMI(weight, height);
    const idealRange = Utils.getIdealWeightRange(height);
    const macros = Utils.getMacroSplit(this.state.goal);
    const waterGoal = Utils.getWaterGoal(weight);
    this.state.waterGoal = waterGoal;

    const protein = Math.round(target * macros.protein / 4);
    const carbs = Math.round(target * macros.carbs / 4);
    const fat = Math.round(target * macros.fat / 9);

    return {
      bmr: Math.round(bmr),
      tdee,
      target,
      bmi,
      bmiCategory: Utils.getBMICategory(bmi),
      idealRange,
      macros: { protein, carbs, fat },
      macroSplit: macros,
      waterGoal
    };
  },

  // Food logging
  addFoodItem(item) {
    this.state.foodItems.push(item);
    this.state.totalLogged += item.cal;
    return this.state.foodItems.length - 1;
  },

  removeFoodItem(index) {
    if (!this.state.foodItems[index]) return;
    this.state.totalLogged -= this.state.foodItems[index].cal;
    this.state.foodItems[index] = null;
  },

  // Weight logging
  addWeightEntry(weight) {
    const entry = {
      date: Utils.formatDate(),
      val: weight
    };
    this.state.weightLog.push(entry);
    return entry;
  },

  removeWeightEntry(index) {
    this.state.weightLog.splice(index, 1);
  },

  // Sleep logging
  addSleepEntry(bedtime, waketime) {
    const [bh, bm] = bedtime.split(':').map(Number);
    const [wh, wm] = waketime.split(':').map(Number);
    let mins = (wh * 60 + wm) - (bh * 60 + bm);
    if (mins < 0) mins += 1440;
    const hrs = parseFloat((mins / 60).toFixed(1));
    
    const entry = {
      date: Utils.formatDate(),
      hrs,
      bed: bedtime,
      wake: waketime
    };
    this.state.sleepLog.push(entry);
    return entry;
  },

  // Mood logging
  addMoodEntry(mood, energy) {
    const entry = {
      date: Utils.formatDate(),
      mood,
      energy
    };
    this.state.moodLog.push(entry);
    return entry;
  },

  // Measurements logging
  addMeasurementEntry(measurements) {
    const entry = {
      date: Utils.formatDate(),
      ...measurements
    };
    this.state.measLog.push(entry);
    return entry;
  },

  // Streak tracking
  markWorkoutDay() {
    this.state.workoutDays.add(new Date().toDateString());
    this.state.workoutStreak = this.state.workoutDays.size;
  },

  // Badge checking
  checkBadge(id, condition) {
    if (condition && !this.state.earnedBadges.has(id)) {
      this.state.earnedBadges.add(id);
      return this.badges.find(b => b.id === id);
    }
    return null;
  },

  // Meal templates
  saveMealTemplate(name, items) {
    this.state.mealTemplates.push({ name, items: [...items] });
  },

  loadMealTemplate(index) {
    return this.state.mealTemplates[index]?.items || [];
  },

  // Get food suggestions
  searchFoods(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    const scored = FoodDB.map(food => {
      let score = 0;
      const nameLower = food.name.toLowerCase();
      
      if (nameLower.startsWith(q)) score = 100;
      else if (nameLower.includes(q)) score = 70;
      else {
        for (const alias of food.aliases) {
          if (alias.startsWith(q)) { score = Math.max(score, 90); break; }
          if (alias.includes(q)) { score = Math.max(score, 60); break; }
        }
      }
      
      return { ...food, score };
    });
    
    return scored
      .filter(f => f.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  },

  // Get exercises for a muscle group
  getExercises(workoutType, muscleGroup, count = 3) {
    const pool = ExerciseDB[workoutType]?.[muscleGroup] || [];
    return pool.slice(0, Math.min(count, pool.length));
  },

  // Get weekly routine
  getWeeklyRoutine() {
    return WorkoutRoutines[this.state.workoutType]?.[this.state.goal] || [];
  }
};

window.DataManager = DataManager;