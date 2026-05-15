// Utility Functions
const Utils = {
  // Parse rest seconds from string like "90s" or "2min"
  parseRestSecs(rst) {
    if (rst.includes('min')) return Math.round(parseFloat(rst) * 60);
    return parseInt(rst) || 90;
  },

  // Calculate BMI
  calculateBMI(weight, heightCm) {
    const hM = heightCm / 100;
    return (weight / (hM * hM)).toFixed(1);
  },

  // Get BMI category
  getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  },

  // Calculate BMR using Mifflin-St Jeor equation
  calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    return 10 * weight + 6.25 * height - 5 * age - 161;
  },

  // Calculate ideal weight range
  getIdealWeightRange(heightCm) {
    const hM = heightCm / 100;
    return {
      low: Math.round(18.5 * hM * hM),
      high: Math.round(24.9 * hM * hM)
    };
  },

  // Get macro split based on goal
  getMacroSplit(goal) {
    if (goal === 'gain') return { protein: 0.30, carbs: 0.45, fat: 0.25 };
    if (goal === 'lose') return { protein: 0.35, carbs: 0.35, fat: 0.30 };
    return { protein: 0.25, carbs: 0.50, fat: 0.25 };
  },

  // Calculate water intake goal
  getWaterGoal(weightKg) {
    return Math.min(12, Math.max(6, Math.round(weightKg * 0.033)));
  },

  // Format date for display
  formatDate() {
    return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  },

  // Highlight search text
  highlightText(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:rgba(99,102,241,.3);color:var(--text);border-radius:2px">$1</mark>');
  },

  // Download file
  downloadFile(filename, content, type = 'text/csv') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Generate CSV from 2D array
  generateCSV(rows) {
    return rows.map(row => row.join(',')).join('\n');
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show toast notification
  showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }
};

// Make available globally
window.Utils = Utils;