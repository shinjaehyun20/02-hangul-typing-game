// ===== Settings Screen =====
export class SettingsScreen {
  constructor(router, state) {
    this.router = router;
    this.state = state;
    this.settings = window.appStorage.getSettings();
  }
  
  render() {
    return `
      <div class="card container">
        <h1>⚙️ 설정</h1>
        
        <div class="settings-group">
          <label class="settings-label">
            효과음
          </label>
          <label class="toggle-switch">
            <input type="checkbox" id="sound-toggle" ${this.settings.soundEnabled ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="settings-group">
          <label class="settings-label">
            글꼴 크기
          </label>
          <div class="button-options">
            <button class="option-button ${this.settings.fontSize === 'small' ? 'active' : ''}" data-size="small">
              작게
            </button>
            <button class="option-button ${this.settings.fontSize === 'medium' ? 'active' : ''}" data-size="medium">
              보통
            </button>
            <button class="option-button ${this.settings.fontSize === 'large' ? 'active' : ''}" data-size="large">
              크게
            </button>
          </div>
        </div>
        
        <div class="settings-group">
          <label class="settings-label">
            단어 개수
          </label>
          <div class="button-options">
            <button class="option-button ${this.settings.wordsPerGame === 10 ? 'active' : ''}" data-words="10">
              10개
            </button>
            <button class="option-button ${this.settings.wordsPerGame === 20 ? 'active' : ''}" data-words="20">
              20개
            </button>
            <button class="option-button ${this.settings.wordsPerGame === 30 ? 'active' : ''}" data-words="30">
              30개
            </button>
          </div>
        </div>
        
        <div class="settings-group">
          <button id="reset-btn" class="secondary" style="width: 100%;">
            🔄 모든 기록 초기화
          </button>
        </div>
        
        <div class="button-group">
          <button id="back-btn" class="primary">
            ← 돌아가기
          </button>
        </div>
      </div>
    `;
  }
  
  afterRender() {
    // Sound toggle
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
      this.settings.soundEnabled = e.target.checked;
      this.saveSettings();
    });
    
    // Font size buttons
    document.querySelectorAll('[data-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        this.settings.fontSize = size;
        this.saveSettings();
        this.updateButtonStates();
      });
    });
    
    // Words per game buttons
    document.querySelectorAll('[data-words]').forEach(btn => {
      btn.addEventListener('click', () => {
        const words = parseInt(btn.dataset.words);
        this.settings.wordsPerGame = words;
        this.saveSettings();
        this.updateButtonStates();
      });
    });
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('정말로 모든 기록을 지우시겠습니까?')) {
        window.appStorage.clearAll();
        alert('모든 기록이 초기화되었습니다.');
        this.settings = window.appStorage.getSettings();
      }
    });
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
      this.router.navigate('home');
    });
  }
  
  saveSettings() {
    window.appStorage.saveSettings(this.settings);
  }
  
  updateButtonStates() {
    // Update font size buttons
    document.querySelectorAll('[data-size]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === this.settings.fontSize);
    });
    
    // Update words buttons
    document.querySelectorAll('[data-words]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.words) === this.settings.wordsPerGame);
    });
  }
  
  destroy() {
    // Cleanup
  }
}
