// Workout Routines
const WorkoutRoutines = {
  gym: {
    lose: [
      {day:'Mon',focus:'Upper Body',muscles:['chest','back'],type:'work'},
      {day:'Tue',focus:'Legs',muscles:['legs','core'],type:'work'},
      {day:'Wed',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Thu',focus:'Push',muscles:['chest','shoulders'],type:'work'},
      {day:'Fri',focus:'Pull',muscles:['back','arms'],type:'work'},
      {day:'Sat',focus:'Legs + Core',muscles:['legs','core'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ],
    gain: [
      {day:'Mon',focus:'Chest & Triceps',muscles:['chest','arms'],type:'work'},
      {day:'Tue',focus:'Back & Biceps',muscles:['back','arms'],type:'work'},
      {day:'Wed',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Thu',focus:'Legs',muscles:['legs'],type:'work'},
      {day:'Fri',focus:'Shoulders',muscles:['shoulders','core'],type:'work'},
      {day:'Sat',focus:'Full Body',muscles:['chest','back','legs'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ],
    maintain: [
      {day:'Mon',focus:'Push Day',muscles:['chest','shoulders'],type:'work'},
      {day:'Tue',focus:'Pull Day',muscles:['back','arms'],type:'work'},
      {day:'Wed',focus:'Leg Day',muscles:['legs','core'],type:'work'},
      {day:'Thu',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Fri',focus:'Upper Body',muscles:['chest','back'],type:'work'},
      {day:'Sat',focus:'Core',muscles:['core'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ]
  },
  home: {
    lose: [
      {day:'Mon',focus:'HIIT Upper',muscles:['chest','arms'],type:'work'},
      {day:'Tue',focus:'Legs',muscles:['legs','core'],type:'work'},
      {day:'Wed',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Thu',focus:'Push + Core',muscles:['chest','shoulders'],type:'work'},
      {day:'Fri',focus:'Pull + Abs',muscles:['back','core'],type:'work'},
      {day:'Sat',focus:'Full Body',muscles:['legs','chest'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ],
    gain: [
      {day:'Mon',focus:'Push',muscles:['chest','shoulders'],type:'work'},
      {day:'Tue',focus:'Pull',muscles:['back','arms'],type:'work'},
      {day:'Wed',focus:'Legs',muscles:['legs'],type:'work'},
      {day:'Thu',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Fri',focus:'Arms + Core',muscles:['arms','core'],type:'work'},
      {day:'Sat',focus:'Full Body',muscles:['chest','legs'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ],
    maintain: [
      {day:'Mon',focus:'Push',muscles:['chest','shoulders'],type:'work'},
      {day:'Tue',focus:'Lower Body',muscles:['legs'],type:'work'},
      {day:'Wed',focus:'Rest Day',muscles:[],type:'rest'},
      {day:'Thu',focus:'Pull',muscles:['back','arms'],type:'work'},
      {day:'Fri',focus:'Core',muscles:['core'],type:'work'},
      {day:'Sat',focus:'Full Body',muscles:['chest','legs'],type:'work'},
      {day:'Sun',focus:'Rest Day',muscles:[],type:'rest'}
    ]
  }
};

// Rest day tips
const RestTips = {
  gain: {i:'!',t:'Recovery Day',p:'Muscles grow during rest. Hit protein target, sleep 8 hrs.'},
  lose: {i:'>',t:'Active Recovery',p:'30 min walk, light yoga. Keep moving.'},
  maintain: {i:'O',t:'Rest & Mobility',p:'Stretch, light walk, reduce stress.'}
};

// No workout tips
const NoWorkoutTips = [
  {i:'>',t:'Daily 30-Min Walks',p:'Burns 150-200 kcal, improves mood.'},
  {i:'^',t:'Maximize NEAT',p:'Take stairs, park farther, stand more.'},
  {i:'O',t:'Daily Yoga',p:'20 min lowers cortisol, improves flexibility.'},
  {i:'Z',t:'Sleep is Exercise',p:'7-9 hrs increases growth hormone.'}
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WorkoutRoutines, RestTips, NoWorkoutTips };
}