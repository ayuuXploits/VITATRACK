export interface Exercise {
  n: string;
  m: string;
  d: string;
  sets: string;
  reps: string;
  rst: string;
  tags: string[];
}

export type MuscleGroup = "chest" | "back" | "legs" | "shoulders" | "arms" | "core";
export type WorkoutType = "gym" | "home";

export type ExerciseDB = Record<WorkoutType, Record<MuscleGroup, Exercise[]>>;

export const DB: ExerciseDB = {
  gym: {
    chest: [
      { n: "Barbell Bench Press", m: "Chest", d: "Lie on bench, lower bar to chest, press explosively. Keep shoulder blades pinched.", sets: "4", reps: "8–10", rst: "90s", tags: ["compound", "barbell", "push"] },
      { n: "Incline DB Press", m: "Upper Chest", d: "45° incline, dumbbells from shoulders up. Squeeze the stretch at top.", sets: "3", reps: "10–12", rst: "75s", tags: ["compound", "dumbbell"] },
      { n: "Cable Chest Fly", m: "Chest", d: "Cables at shoulder height, arc arms inward in a hugging motion.", sets: "3", reps: "12–15", rst: "60s", tags: ["isolation", "cables"] },
      { n: "Chest Dip", m: "Chest/Tricep", d: "Lean forward on dip bars, lower chest level, press back up.", sets: "3", reps: "10–12", rst: "75s", tags: ["compound", "bodyweight"] },
    ],
    back: [
      { n: "Deadlift", m: "Back/Glutes", d: "Hip-hinge with flat back, drive hips forward to stand. King of all lifts.", sets: "4", reps: "5–6", rst: "2min", tags: ["compound", "barbell", "hinge"] },
      { n: "Pull-Up / Lat Pulldown", m: "Lats", d: "Full ROM, chest to bar. Retract scapula at top for full lat contraction.", sets: "4", reps: "8–10", rst: "90s", tags: ["compound", "vertical pull"] },
      { n: "Barbell Bent-Over Row", m: "Mid-Back", d: "Hinge at hips, row bar to lower chest. Elbows close to body.", sets: "4", reps: "8–10", rst: "90s", tags: ["compound", "barbell"] },
      { n: "Seated Cable Row", m: "Mid-Back", d: "Upright torso, pull handle to navel. Squeeze shoulder blades together.", sets: "3", reps: "12", rst: "60s", tags: ["compound", "cables"] },
    ],
    legs: [
      { n: "Barbell Squat", m: "Quads/Glutes", d: "Bar on traps, squat to parallel or below. Knees track over toes.", sets: "4", reps: "8–10", rst: "2min", tags: ["compound", "barbell", "squat"] },
      { n: "Romanian Deadlift", m: "Hamstrings", d: "Soft knees, hinge at hips with flat back. Feel deep hamstring stretch.", sets: "3", reps: "10–12", rst: "90s", tags: ["compound", "barbell"] },
      { n: "Leg Press", m: "Quads/Glutes", d: "Feet shoulder-width, lower sled to 90°. Full extension without locking.", sets: "3", reps: "12–15", rst: "75s", tags: ["compound", "machine"] },
      { n: "Lying Leg Curl", m: "Hamstrings", d: "Curl heels toward glutes with control. Squeeze at top.", sets: "3", reps: "12–15", rst: "60s", tags: ["isolation", "machine"] },
      { n: "Calf Raise (Machine)", m: "Calves", d: "Deep stretch at bottom, full contraction at top. Full ROM.", sets: "4", reps: "15–20", rst: "45s", tags: ["isolation", "machine"] },
    ],
    shoulders: [
      { n: "Overhead Barbell Press", m: "Shoulders", d: "Bar from rack at chest, press overhead. Brace core throughout.", sets: "4", reps: "6–8", rst: "90s", tags: ["compound", "barbell"] },
      { n: "DB Lateral Raise", m: "Side Delts", d: "Raise to shoulder height, slight elbow bend. Control the eccentric.", sets: "3", reps: "12–15", rst: "60s", tags: ["isolation", "dumbbell"] },
      { n: "Face Pull", m: "Rear Delts", d: "Cable at head height, pull to face with elbows high. External rotate at end.", sets: "3", reps: "15", rst: "60s", tags: ["isolation", "cables"] },
      { n: "Arnold Press", m: "Full Delt", d: "Rotate from palms-facing to overhead press. 3D shoulder development.", sets: "3", reps: "10–12", rst: "75s", tags: ["compound", "dumbbell"] },
    ],
    arms: [
      { n: "Barbell Curl", m: "Biceps", d: "Elbows pinned to sides, curl to shoulder. Full supination at top.", sets: "3", reps: "10–12", rst: "60s", tags: ["isolation", "barbell"] },
      { n: "Skull Crusher", m: "Triceps", d: "EZ-bar lowered to forehead, extend to lockout. Keep elbows fixed.", sets: "3", reps: "10–12", rst: "60s", tags: ["isolation", "barbell"] },
      { n: "Hammer Curl", m: "Brachialis", d: "Neutral grip curl — builds arm thickness and peak.", sets: "3", reps: "12", rst: "45s", tags: ["isolation", "dumbbell"] },
      { n: "Tricep Rope Pushdown", m: "Triceps", d: "Push down and flare wrists at bottom. Full extension every rep.", sets: "3", reps: "12–15", rst: "45s", tags: ["isolation", "cables"] },
    ],
    core: [
      { n: "Cable Crunch", m: "Abs", d: "Kneel at cable, crunch elbows to knees. Resist on the way back up.", sets: "3", reps: "15", rst: "45s", tags: ["isolation", "cables"] },
      { n: "Ab Wheel Rollout", m: "Core", d: "Roll forward until back flat, pull back with core. Stay braced.", sets: "3", reps: "10–12", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Hanging Leg Raise", m: "Lower Abs", d: "Hang from bar, raise straight legs to hip height. Control descent.", sets: "3", reps: "12–15", rst: "60s", tags: ["isolation", "bodyweight"] },
      { n: "Plank", m: "Core", d: "Forearms on floor, body in straight line. Breathe steadily. Squeeze everything.", sets: "3", reps: "45–60s", rst: "45s", tags: ["isometric", "bodyweight"] },
    ],
  },
  home: {
    chest: [
      { n: "Standard Push-Up", m: "Chest/Tricep", d: "Hands shoulder-width, lower chest to floor, press up. Elbows at 45°.", sets: "4", reps: "15–20", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Wide Push-Up", m: "Outer Chest", d: "Hands wider than shoulders — stretches chest more at bottom.", sets: "3", reps: "15", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Diamond Push-Up", m: "Inner Chest", d: "Hands in diamond shape under chest — hits inner chest and triceps hard.", sets: "3", reps: "12", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Decline Push-Up", m: "Upper Chest", d: "Feet on chair, hands on floor — shifts load to upper chest.", sets: "3", reps: "12–15", rst: "60s", tags: ["compound", "bodyweight"] },
    ],
    back: [
      { n: "Doorframe Row", m: "Lats/Back", d: "Grip doorframe at waist, lean back, row your chest to it.", sets: "4", reps: "12–15", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Superman Hold", m: "Lower Back", d: "Face down, lift arms and legs simultaneously. Hold 2 seconds each rep.", sets: "3", reps: "15", rst: "45s", tags: ["isolation", "bodyweight"] },
      { n: "Band Seated Row", m: "Mid-Back", d: "Band anchored at door, row elbows back. Squeeze shoulder blades.", sets: "3", reps: "15", rst: "60s", tags: ["compound", "band"] },
      { n: "Inverted Row (Table)", m: "Upper Back", d: "Lie under table, grip edge and row chest up to it. Keep body straight.", sets: "3", reps: "12", rst: "60s", tags: ["compound", "bodyweight"] },
    ],
    legs: [
      { n: "Bodyweight Squat", m: "Quads/Glutes", d: "Feet shoulder-width, sit back and down. Full depth, chest tall.", sets: "4", reps: "20", rst: "45s", tags: ["compound", "bodyweight"] },
      { n: "Bulgarian Split Squat", m: "Quads/Glutes", d: "Back foot on chair, front foot forward. Lunge down. Single-leg king.", sets: "3", reps: "12 ea", rst: "75s", tags: ["compound", "unilateral"] },
      { n: "Glute Bridge", m: "Glutes/Hams", d: "Drive hips up, squeeze glutes at top. Hold 2 seconds each rep.", sets: "4", reps: "20", rst: "45s", tags: ["compound", "bodyweight"] },
      { n: "Jump Squat", m: "Quads/Power", d: "Squat down and explode up. Land softly with bent knees.", sets: "3", reps: "15", rst: "60s", tags: ["power", "cardio"] },
      { n: "Step-Up Calf Raise", m: "Calves", d: "Stand on step edge, full range raise. Use railing for balance.", sets: "4", reps: "20", rst: "30s", tags: ["isolation", "bodyweight"] },
    ],
    shoulders: [
      { n: "Pike Push-Up", m: "Shoulders", d: "Hips high in V, lower head toward floor. Progress to wall handstand.", sets: "4", reps: "10–12", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Wall Handstand Hold", m: "Full Shoulder", d: "Kick up against wall, hold. Builds strength and shoulder stability.", sets: "3", reps: "20–30s", rst: "60s", tags: ["isometric", "bodyweight"] },
      { n: "Band Lateral Raise", m: "Side Delts", d: "Stand on band, raise arms laterally. Control the lowering phase.", sets: "3", reps: "15", rst: "45s", tags: ["isolation", "band"] },
      { n: "Prone Y-Raise", m: "Rear Delts", d: "Face down, raise arms in Y shape. Builds posture and rear delts.", sets: "3", reps: "15", rst: "45s", tags: ["isolation", "bodyweight"] },
    ],
    arms: [
      { n: "Chin-Up", m: "Biceps/Back", d: "Underhand grip pull-up. Full hang to chin over bar.", sets: "4", reps: "8–12", rst: "75s", tags: ["compound", "bodyweight"] },
      { n: "Close-Grip Push-Up", m: "Triceps", d: "Hands close to chest, elbows tucked tight to body.", sets: "3", reps: "15", rst: "60s", tags: ["compound", "bodyweight"] },
      { n: "Band Bicep Curl", m: "Biceps", d: "Step on band, curl both arms. Squeeze at top for 1 second.", sets: "3", reps: "15", rst: "45s", tags: ["isolation", "band"] },
      { n: "Chair Tricep Dip", m: "Triceps", d: "Hands on chair behind you, lower hips to floor, press up.", sets: "3", reps: "15", rst: "60s", tags: ["compound", "bodyweight"] },
    ],
    core: [
      { n: "Plank", m: "Core", d: "Forearms on floor, straight line head to heels. Breathe steadily.", sets: "3", reps: "45–60s", rst: "45s", tags: ["isometric", "bodyweight"] },
      { n: "Mountain Climber", m: "Core/Cardio", d: "Drive knees alternately to chest in push-up position at a steady pace.", sets: "3", reps: "30 ea", rst: "45s", tags: ["dynamic", "cardio"] },
      { n: "Bicycle Crunch", m: "Obliques", d: "Alternate elbow to opposite knee while cycling legs. Controlled tempo.", sets: "3", reps: "20 ea", rst: "45s", tags: ["isolation", "bodyweight"] },
      { n: "Hollow Body Hold", m: "Deep Core", d: "Back flat, arms & legs raised. The gymnast foundation exercise.", sets: "3", reps: "30–40s", rst: "45s", tags: ["isometric", "bodyweight"] },
    ],
  },
};
