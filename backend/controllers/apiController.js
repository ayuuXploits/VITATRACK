exports.calculateMetrics = (req, res) => {
  try {
    const { age, gender, weight, height, activity, goal } = req.body;

    // Validate input
    if (!age || !gender || !weight || !height) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate BMR
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);
    
    // Calculate target based on goal
    let target;
    if (goal === 'lose') target = tdee - 500;
    else if (goal === 'gain') target = tdee + 400;
    else target = tdee;
    
    target = Math.max(target, 1200);

    // Calculate macros
    let proteinPct, carbsPct, fatPct;
    if (goal === 'gain') { proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; }
    else if (goal === 'lose') { proteinPct = 0.35; carbsPct = 0.35; fatPct = 0.30; }
    else { proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; }

    const protein = Math.round(target * proteinPct / 4);
    const carbs = Math.round(target * carbsPct / 4);
    const fat = Math.round(target * fatPct / 9);

    // Calculate BMI
    const hM = height / 100;
    const bmi = (weight / (hM * hM)).toFixed(1);

    res.json({
      success: true,
      data: {
        bmr: Math.round(bmr),
        tdee,
        target,
        bmi,
        macros: { protein, carbs, fat },
        waterGoal: Math.min(12, Math.max(6, Math.round(weight * 0.033)))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Calculation failed' });
  }
};

exports.logFood = (req, res) => {
  try {
    const { name, calories, quantity } = req.body;
    // Here you would save to database
    res.json({ success: true, message: 'Food logged' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log food' });
  }
};

exports.logWeight = (req, res) => {
  try {
    const { weight } = req.body;
    // Here you would save to database
    res.json({ success: true, message: 'Weight logged' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log weight' });
  }
};

exports.logSleep = (req, res) => {
  try {
    const { bedtime, waketime } = req.body;
    // Here you would save to database
    res.json({ success: true, message: 'Sleep logged' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log sleep' });
  }
};