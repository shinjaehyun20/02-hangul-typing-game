// ===== Simple Router =====
import { HomeScreen } from './screens/home.js';
import { LevelSelectScreen } from './screens/levelSelect.js';
import { GameScreen } from './screens/game.js';
import { ResultScreen } from './screens/result.js';
import { SettingsScreen } from './screens/settings.js';

export class Router {
  constructor() {
    this.routes = {
      'home': HomeScreen,
      'level-select': LevelSelectScreen,
      'game': GameScreen,
      'result': ResultScreen,
      'settings': SettingsScreen
    };
    
    this.currentScreen = null;
    this.state = {};
  }
  
  init() {
    // Listen for route changes
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
    
    // Initial route
    this.navigate('home');
  }
  
  navigate(route, state = {}) {
    this.state = state;
    window.history.pushState({ route, state }, '', `#${route}`);
    this.handleRoute();
  }
  
  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const route = hash.split('?')[0];
    
    const ScreenClass = this.routes[route] || this.routes['home'];
    
    if (this.currentScreen && this.currentScreen.destroy) {
      this.currentScreen.destroy();
    }
    
    this.currentScreen = new ScreenClass(this, this.state);
    this.render();
  }
  
  render() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    if (this.currentScreen && this.currentScreen.render) {
      const content = this.currentScreen.render();
      app.innerHTML = content;
      
      if (this.currentScreen.afterRender) {
        this.currentScreen.afterRender();
      }
    }
  }
}
