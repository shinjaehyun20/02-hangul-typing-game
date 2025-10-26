// ===== Local Storage Manager =====
export class StorageManager {
  constructor() {
    this.PROGRESS_KEY = 'typingGameProgress';
    this.SETTINGS_KEY = 'typingGameSettings';
  }
  
  // Get progress for all levels
  getProgress() {
    try {
      const data = localStorage.getItem(this.PROGRESS_KEY);
      return data ? JSON.parse(data) : this.getDefaultProgress();
    } catch (error) {
      console.error('Error loading progress:', error);
      return this.getDefaultProgress();
    }
  }
  
  // Get default progress structure
  getDefaultProgress() {
    return {
      beginner: {
        bestScore: 0,
        bestGrade: '-',
        bestAccuracy: 0,
        lastPlayed: null,
        totalPlays: 0
      },
      intermediate: {
        bestScore: 0,
        bestGrade: '-',
        bestAccuracy: 0,
        lastPlayed: null,
        totalPlays: 0
      },
      advanced: {
        bestScore: 0,
        bestGrade: '-',
        bestAccuracy: 0,
        lastPlayed: null,
        totalPlays: 0
      }
    };
  }
  
  // Save progress for a specific level
  saveProgress(level, result) {
    const progress = this.getProgress();
    const current = progress[level];
    
    // Update if better than previous
    const isNewBest = result.score > current.bestScore;
    
    progress[level] = {
      bestScore: Math.max(result.score, current.bestScore),
      bestGrade: isNewBest ? result.grade : current.bestGrade,
      bestAccuracy: Math.max(result.accuracy, current.bestAccuracy),
      lastPlayed: new Date().toISOString(),
      totalPlays: current.totalPlays + 1
    };
    
    try {
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));
      return isNewBest;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }
  
  // Get settings
  getSettings() {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY);
      return data ? JSON.parse(data) : this.getDefaultSettings();
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.getDefaultSettings();
    }
  }
  
  // Get default settings
  getDefaultSettings() {
    return {
      soundEnabled: true,
      fontSize: 'medium',
      wordsPerGame: 20
    };
  }
  
  // Save settings
  saveSettings(settings) {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      
      // Dispatch event to notify app
      window.dispatchEvent(new Event('settingsChanged'));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }
  
  // Clear all data
  clearAll() {
    try {
      localStorage.removeItem(this.PROGRESS_KEY);
      localStorage.removeItem(this.SETTINGS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}
