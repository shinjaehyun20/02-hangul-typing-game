// ===== Home Screen =====
export class HomeScreen {
  constructor(router, state) {
    this.router = router;
    this.state = state;
  }
  
  render() {
    return `
      <div class="card container">
        <h1>장윤이의 타이핑 게임 🐘</h1>
        
        <div class="character-container">
          <div class="character">🐘</div>
        </div>
        
        <div class="button-group">
          <button id="start-btn" class="primary">
            시작하기
          </button>
          <button id="settings-btn" class="secondary">
            ⚙️ 설정
          </button>
        </div>
        
        <div style="text-align: center; margin-top: 32px; color: #999; font-size: 14px;">
          <p>즐겁게 한글 타이핑을 배워봐요!</p>
        </div>
      </div>
    `;
  }
  
  afterRender() {
    document.getElementById('start-btn').addEventListener('click', () => {
      this.router.navigate('level-select');
    });
    
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.router.navigate('settings');
    });
  }
  
  destroy() {
    // Cleanup if needed
  }
}
