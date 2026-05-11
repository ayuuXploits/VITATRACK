export interface FoodItem {
  name: string;
  emoji: string;
  cal: number;
  unit: string;
  aliases: string[];
}

export const FOOD_DB: FoodItem[] = [
  { name: "Cooked White Rice", emoji: "🍚", cal: 206, unit: "bowl (1 cup)", aliases: ["rice", "white rice", "chawal", "boiled rice", "steamed rice"] },
  { name: "Cooked Brown Rice", emoji: "🍚", cal: 216, unit: "bowl (1 cup)", aliases: ["brown rice", "whole grain rice"] },
  { name: "Roti / Chapati", emoji: "🫓", cal: 71, unit: "roti", aliases: ["roti", "chapati", "chapatti", "flatbread", "wheat roti"] },
  { name: "Paratha (Plain)", emoji: "🫓", cal: 180, unit: "paratha", aliases: ["paratha", "parantha", "plain paratha"] },
  { name: "Naan", emoji: "🫓", cal: 262, unit: "piece", aliases: ["naan", "nan", "naan bread"] },
  { name: "Bread (White Slice)", emoji: "🍞", cal: 79, unit: "slice", aliases: ["bread", "white bread", "toast", "slice of bread"] },
  { name: "Bread (Brown/Whole Wheat)", emoji: "🍞", cal: 69, unit: "slice", aliases: ["brown bread", "whole wheat bread", "whole grain bread", "multigrain"] },
  { name: "Oats (Cooked)", emoji: "🥣", cal: 166, unit: "bowl (1 cup)", aliases: ["oats", "oatmeal", "porridge", "daliya oats"] },
  { name: "Poha (Cooked)", emoji: "🍚", cal: 250, unit: "plate", aliases: ["poha", "flattened rice", "beaten rice", "pohe"] },
  { name: "Upma", emoji: "🥣", cal: 190, unit: "bowl", aliases: ["upma", "rava upma", "semolina upma"] },
  { name: "Idli", emoji: "⚪", cal: 58, unit: "piece", aliases: ["idli", "idly", "rice cake"] },
  { name: "Dosa (Plain)", emoji: "🥞", cal: 168, unit: "dosa", aliases: ["dosa", "plain dosa", "rice crepe"] },
  { name: "Pasta (Cooked)", emoji: "🍝", cal: 220, unit: "bowl (1 cup)", aliases: ["pasta", "spaghetti", "noodles", "macaroni", "penne"] },
  { name: "Maggi / Instant Noodles", emoji: "🍜", cal: 350, unit: "packet", aliases: ["maggi", "instant noodles", "2-minute noodles", "cup noodles"] },
  { name: "Biryani (Chicken)", emoji: "🍛", cal: 380, unit: "plate", aliases: ["chicken biryani", "biryani", "hyderabadi biryani"] },
  { name: "Dal (Cooked)", emoji: "🥣", cal: 115, unit: "bowl", aliases: ["dal", "daal", "lentil soup", "toor dal", "moong dal", "masoor dal"] },
  { name: "Rajma (Kidney Beans)", emoji: "🫘", cal: 180, unit: "bowl", aliases: ["rajma", "kidney beans", "rajma chawal"] },
  { name: "Chole (Chickpeas)", emoji: "🫘", cal: 210, unit: "bowl", aliases: ["chole", "chana", "chickpeas", "chhole"] },
  { name: "Full Fat Milk", emoji: "🥛", cal: 150, unit: "glass (250ml)", aliases: ["milk", "whole milk", "doodh", "cow milk"] },
  { name: "Curd / Dahi", emoji: "🥛", cal: 98, unit: "bowl (200g)", aliases: ["curd", "dahi", "yogurt", "plain yogurt", "set curd"] },
  { name: "Paneer (Cottage Cheese)", emoji: "🧀", cal: 265, unit: "100g serving", aliases: ["paneer", "cottage cheese"] },
  { name: "Paneer Butter Masala", emoji: "🧆", cal: 320, unit: "bowl", aliases: ["paneer butter masala", "paneer makhani", "butter paneer"] },
  { name: "Butter", emoji: "🧈", cal: 102, unit: "tablespoon (14g)", aliases: ["butter", "makhan", "white butter"] },
  { name: "Ghee", emoji: "🫙", cal: 112, unit: "tablespoon (14g)", aliases: ["ghee", "clarified butter", "desi ghee"] },
  { name: "Boiled Egg", emoji: "🥚", cal: 78, unit: "egg", aliases: ["boiled egg", "egg", "anda", "hard boiled egg"] },
  { name: "Scrambled Eggs (2)", emoji: "🍳", cal: 182, unit: "serving (2 eggs)", aliases: ["scrambled egg", "anda bhurji", "egg bhurji"] },
  { name: "Omelette (2 eggs)", emoji: "🍳", cal: 190, unit: "omelette", aliases: ["omelette", "omelet", "egg omelette"] },
  { name: "Boiled Chicken Breast", emoji: "🍗", cal: 165, unit: "100g serving", aliases: ["chicken breast", "boiled chicken", "plain chicken", "grilled chicken"] },
  { name: "Chicken Curry", emoji: "🍛", cal: 250, unit: "bowl", aliases: ["chicken curry", "murgh curry", "chicken gravy"] },
  { name: "Butter Chicken", emoji: "🍛", cal: 290, unit: "bowl", aliases: ["butter chicken", "murgh makhani", "chicken makhani"] },
  { name: "Fish Fry", emoji: "🐟", cal: 200, unit: "piece (100g)", aliases: ["fish", "fish fry", "fried fish", "grilled fish", "machli"] },
  { name: "Banana", emoji: "🍌", cal: 105, unit: "medium banana", aliases: ["banana", "kela", "ripe banana"] },
  { name: "Apple", emoji: "🍎", cal: 95, unit: "medium apple", aliases: ["apple", "seb", "green apple", "red apple"] },
  { name: "Mango", emoji: "🥭", cal: 99, unit: "medium mango", aliases: ["mango", "aam", "raw mango"] },
  { name: "Orange", emoji: "🍊", cal: 62, unit: "medium orange", aliases: ["orange", "santra", "narangi"] },
  { name: "Samosa", emoji: "🥟", cal: 262, unit: "piece", aliases: ["samosa", "aloo samosa", "punjabi samosa"] },
  { name: "Pakora / Bhajiya", emoji: "🧆", cal: 300, unit: "plate (6 pieces)", aliases: ["pakora", "pakoda", "bhajiya", "veg pakora"] },
  { name: "Vada Pav", emoji: "🍔", cal: 290, unit: "piece", aliases: ["vada pav", "wada pav", "mumbai burger"] },
  { name: "Pav Bhaji", emoji: "🍛", cal: 320, unit: "plate (2 pav)", aliases: ["pav bhaji", "pavbhaji"] },
  { name: "Chips / Crisps", emoji: "🫙", cal: 150, unit: "small packet", aliases: ["chips", "crisps", "potato chips", "lays", "bingo", "wafers"] },
  { name: "Burger (Chicken)", emoji: "🍔", cal: 390, unit: "burger", aliases: ["chicken burger", "mcchicken", "spicy chicken burger"] },
  { name: "Pizza Slice", emoji: "🍕", cal: 285, unit: "slice", aliases: ["pizza", "pizza slice", "veg pizza", "cheese pizza"] },
  { name: "French Fries (Medium)", emoji: "🍟", cal: 365, unit: "medium serving", aliases: ["fries", "french fries", "potato fries"] },
  { name: "Chai (Milk Tea)", emoji: "☕", cal: 55, unit: "cup (150ml)", aliases: ["chai", "tea", "milk tea", "adrak chai", "masala chai"] },
  { name: "Black Coffee", emoji: "☕", cal: 5, unit: "cup", aliases: ["black coffee", "coffee", "americano", "filter coffee"] },
  { name: "Lassi (Sweet)", emoji: "🥛", cal: 220, unit: "glass", aliases: ["lassi", "sweet lassi", "mango lassi"] },
  { name: "Cold Drink / Soda", emoji: "🥤", cal: 140, unit: "can (330ml)", aliases: ["cold drink", "soda", "cola", "pepsi", "coke", "coca cola", "sprite"] },
  { name: "Protein Shake", emoji: "💪", cal: 150, unit: "scoop in water", aliases: ["protein shake", "whey", "protein powder", "protein drink"] },
  { name: "Almonds", emoji: "🌰", cal: 164, unit: "handful (28g)", aliases: ["almonds", "badam", "almond"] },
  { name: "Peanuts", emoji: "🥜", cal: 166, unit: "handful (28g)", aliases: ["peanuts", "moongfali", "groundnuts"] },
  { name: "Dates", emoji: "🫒", cal: 110, unit: "3 dates", aliases: ["dates", "khajoor", "dried dates"] },
  { name: "Gulab Jamun", emoji: "🍮", cal: 150, unit: "piece (2 medium)", aliases: ["gulab jamun", "jamun"] },
  { name: "Kheer", emoji: "🍚", cal: 180, unit: "bowl", aliases: ["kheer", "rice pudding", "payasam"] },
  { name: "Ice Cream (1 scoop)", emoji: "🍦", cal: 137, unit: "scoop", aliases: ["ice cream", "icecream", "kulfi", "gelato"] },
];

export function searchFoods(query: string): (FoodItem & { score: number })[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: (FoodItem & { score: number })[] = [];
  for (const f of FOOD_DB) {
    let s = 0;
    const nl = f.name.toLowerCase();
    if (nl.startsWith(q)) s = 100;
    else if (nl.includes(q)) s = 70;
    else {
      for (const a of f.aliases) {
        if (a.startsWith(q)) { s = Math.max(s, 90); break; }
        if (a.includes(q)) { s = Math.max(s, 60); break; }
      }
    }
    if (s > 0) scored.push({ ...f, score: s });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 8);
}
