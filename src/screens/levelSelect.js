// ===== Level Select Screen =====
export class LevelSelectScreen {
  constructor(router, state) {
    this.router = router;
    this.state = state;
    this.progress = window.appStorage.getProgress();
  }
  
  render() {
    const levels = [
      {
        id: 'beginner',
        icon: '🌱',
        title: '초급',
        description: '쉬운 글자와 짧은 단어'
      },
      {
        id: 'intermediate',
        icon: '🌿',
        title: '중급',
        description: '2~3글자 일상 단어'
      },
      {
        id: 'advanced',
        icon: '🌳',
        title: '고급',
        description: '긴 단어와 어려운 낱말'
      }
    ];
    
    const levelCards = levels.map(level => {
      const stats = this.progress[level.id];
      return `
        <div class="level-card" data-level="${level.id}">
          <div class="level-icon">${level.icon}</div>
          <div class="level-title">${level.title}</div>
          <div class="level-description">${level.description}</div>
          <div class="level-stats">
            ${stats.bestGrade !== '-' ? `최고 기록: ${stats.bestGrade}등급 (${stats.bestScore}점)` : '아직 기록이 없어요'}
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="card container">
        <h1>레벨을 선택하세요</h1>
        
        <div class="level-grid">
          ${levelCards}
        </div>
        
        <div class="button-group">
          <button id="back-btn" class="secondary">
            ← 돌아가기
          </button>
        </div>
      </div>
    `;
  }
  
  afterRender() {
    // Add click handlers to level cards
    document.querySelectorAll('.level-card').forEach(card => {
      card.addEventListener('click', () => {
        const level = card.dataset.level;
        this.router.navigate('game', { level });
      });
    });
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
      this.router.navigate('home');
    });
  }
  
  destroy() {
    // Cleanup
  }
}
