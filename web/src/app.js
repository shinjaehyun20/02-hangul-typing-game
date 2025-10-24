// ===== Application Entry Point =====
import { Router } from './router.js';
import { StorageManager } from './utils/storage.js';
import { SoundManager } from './utils/sound.js';

// Initialize app
class App {
  constructor() {
    this.router = new Router();
    this.storage = new StorageManager();
    this.sound = new SoundManager();
    
    // Make utilities globally available
    window.appStorage = this.storage;
    window.appSound = this.sound;
    
    this.init();
  }
  
  init() {
    // Apply saved settings
    this.applySettings();
    
    // Initialize router
    this.router.init();
    
    // Listen for settings changes
    window.addEventListener('settingsChanged', () => {
      this.applySettings();
    });
  }
  
  applySettings() {
    const settings = this.storage.getSettings();
    
    // Apply font size
    document.body.className = `font-${settings.fontSize}`;
    
    // Apply sound setting (handled by SoundManager)
    this.sound.setEnabled(settings.soundEnabled);
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
