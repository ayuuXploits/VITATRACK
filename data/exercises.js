// Exercise Database
const ExerciseDB = {
  gym: {
    chest: [
      {n:'Barbell Bench Press',m:'Chest',d:'Lower bar to chest, press explosively',sets:'4',reps:'8-10',rst:'90s',tags:['compound','barbell']},
      {n:'Incline DB Press',m:'Upper Chest',d:'45 degree incline, squeeze at top',sets:'3',reps:'10-12',rst:'75s',tags:['compound','dumbbell']},
      {n:'Cable Fly',m:'Chest',d:'Arc arms inward in hugging motion',sets:'3',reps:'12-15',rst:'60s',tags:['isolation','cables']},
      {n:'Chest Dip',m:'Chest/Tricep',d:'Lean forward, lower chest level',sets:'3',reps:'10-12',rst:'75s',tags:['compound']}
    ],
    back: [
      {n:'Deadlift',m:'Back/Glutes',d:'Hip-hinge, drive hips forward',sets:'4',reps:'5-6',rst:'2min',tags:['compound','barbell']},
      {n:'Pull-Up',m:'Lats',d:'Full ROM, chest to bar',sets:'4',reps:'8-10',rst:'90s',tags:['compound']},
      {n:'Barbell Row',m:'Mid-Back',d:'Row bar to lower chest',sets:'4',reps:'8-10',rst:'90s',tags:['compound','barbell']},
      {n:'Seated Cable Row',m:'Mid-Back',d:'Pull handle to navel',sets:'3',reps:'12',rst:'60s',tags:['cables']}
    ],
    legs: [
      {n:'Barbell Squat',m:'Quads/Glutes',d:'Squat to parallel or below',sets:'4',reps:'8-10',rst:'2min',tags:['compound','barbell']},
      {n:'Romanian Deadlift',m:'Hamstrings',d:'Hinge at hips, flat back',sets:'3',reps:'10-12',rst:'90s',tags:['compound','barbell']},
      {n:'Leg Press',m:'Quads',d:'Lower sled to 90 degrees',sets:'3',reps:'12-15',rst:'75s',tags:['machine']},
      {n:'Leg Curl',m:'Hamstrings',d:'Curl heels to glutes',sets:'3',reps:'12-15',rst:'60s',tags:['machine']},
      {n:'Calf Raise',m:'Calves',d:'Full ROM stretch',sets:'4',reps:'15-20',rst:'45s',tags:['machine']}
    ],
    shoulders: [
      {n:'Overhead Press',m:'Shoulders',d:'Press bar overhead, brace core',sets:'4',reps:'6-8',rst:'90s',tags:['compound','barbell']},
      {n:'Lateral Raise',m:'Side Delts',d:'Raise to shoulder height',sets:'3',reps:'12-15',rst:'60s',tags:['isolation','dumbbell']},
      {n:'Face Pull',m:'Rear Delts',d:'Pull to face, elbows high',sets:'3',reps:'15',rst:'60s',tags:['cables']}
    ],
    arms: [
      {n:'Barbell Curl',m:'Biceps',d:'Elbows pinned, curl to shoulder',sets:'3',reps:'10-12',rst:'60s',tags:['barbell']},
      {n:'Skull Crusher',m:'Triceps',d:'Lower bar to forehead, extend',sets:'3',reps:'10-12',rst:'60s',tags:['barbell']},
      {n:'Tricep Pushdown',m:'Triceps',d:'Push down, flare at bottom',sets:'3',reps:'12-15',rst:'45s',tags:['cables']}
    ],
    core: [
      {n:'Cable Crunch',m:'Abs',d:'Crunch elbows to knees',sets:'3',reps:'15',rst:'45s',tags:['cables']},
      {n:'Hanging Leg Raise',m:'Lower Abs',d:'Raise straight legs to hip height',sets:'3',reps:'12-15',rst:'60s',tags:[]},
      {n:'Plank',m:'Core',d:'Forearms on floor, straight line',sets:'3',reps:'45-60s',rst:'45s',tags:[]}
    ]
  },
  home: {
    chest: [
      {n:'Standard Push-Up',m:'Chest',d:'Lower chest to floor',sets:'4',reps:'15-20',rst:'60s',tags:['bodyweight']},
      {n:'Wide Push-Up',m:'Outer Chest',d:'Hands wider than shoulders',sets:'3',reps:'15',rst:'60s',tags:['bodyweight']},
      {n:'Diamond Push-Up',m:'Inner Chest',d:'Hands in diamond shape',sets:'3',reps:'12',rst:'60s',tags:['bodyweight']},
      {n:'Decline Push-Up',m:'Upper Chest',d:'Feet on chair',sets:'3',reps:'12-15',rst:'60s',tags:['bodyweight']}
    ],
    back: [
      {n:'Doorframe Row',m:'Lats',d:'Grip doorframe, row chest to it',sets:'4',reps:'12-15',rst:'60s',tags:['bodyweight']},
      {n:'Superman Hold',m:'Lower Back',d:'Lift arms and legs',sets:'3',reps:'15',rst:'45s',tags:['bodyweight']},
      {n:'Band Seated Row',m:'Mid-Back',d:'Row elbows back',sets:'3',reps:'15',rst:'60s',tags:['band']}
    ],
    legs: [
      {n:'Bodyweight Squat',m:'Quads',d:'Sit back and down',sets:'4',reps:'20',rst:'45s',tags:['bodyweight']},
      {n:'Split Squat',m:'Quads/Glutes',d:'Back foot on chair',sets:'3',reps:'12 ea',rst:'75s',tags:['unilateral']},
      {n:'Glute Bridge',m:'Glutes',d:'Drive hips up, squeeze',sets:'4',reps:'20',rst:'45s',tags:['bodyweight']},
      {n:'Jump Squat',m:'Quads/Power',d:'Explode up, land soft',sets:'3',reps:'15',rst:'60s',tags:['power']},
      {n:'Calf Raise',m:'Calves',d:'Full range raise',sets:'4',reps:'20',rst:'30s',tags:['bodyweight']}
    ],
    shoulders: [
      {n:'Pike Push-Up',m:'Shoulders',d:'Hips high in V',sets:'4',reps:'10-12',rst:'60s',tags:['bodyweight']},
      {n:'Band Lateral Raise',m:'Side Delts',d:'Raise arms laterally',sets:'3',reps:'15',rst:'45s',tags:['band']},
      {n:'Prone Y-Raise',m:'Rear Delts',d:'Raise arms in Y shape',sets:'3',reps:'15',rst:'45s',tags:['bodyweight']}
    ],
    arms: [
      {n:'Chin-Up',m:'Biceps',d:'Underhand grip pull-up',sets:'4',reps:'8-12',rst:'75s',tags:['bodyweight']},
      {n:'Close-Grip Push-Up',m:'Triceps',d:'Elbows tucked tight',sets:'3',reps:'15',rst:'60s',tags:['bodyweight']},
      {n:'Chair Tricep Dip',m:'Triceps',d:'Lower hips to floor',sets:'3',reps:'15',rst:'60s',tags:['bodyweight']}
    ],
    core: [
      {n:'Plank',m:'Core',d:'Straight line, breathe',sets:'3',reps:'45-60s',rst:'45s',tags:[]},
      {n:'Mountain Climber',m:'Core',d:'Drive knees to chest',sets:'3',reps:'30 ea',rst:'45s',tags:['cardio']},
      {n:'Bicycle Crunch',m:'Obliques',d:'Elbow to opposite knee',sets:'3',reps:'20 ea',rst:'45s',tags:[]}
    ]
  }
};

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExerciseDB;
}