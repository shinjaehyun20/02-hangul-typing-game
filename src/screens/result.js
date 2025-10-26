// ===== Result Screen =====
import { getGradeEmoji, getGradeMessage } from '../utils/grade.js';

export class ResultScreen {
  constructor(router, state) {
    this.router = router;
    this.result = state;
  }
  
  render() {
    const emoji = getGradeEmoji(this.result.grade);
    const message = getGradeMessage(this.result.grade);
    
    const newBestBadge = this.result.isNewBest 
      ? '<div style="color: #7ED321; font-weight: 700; margin: 16px 0;">🎊 새로운 최고 기록! 🎊</div>'
      : '';
    
    const levelNames = {
      'beginner': '초급',
      'intermediate': '중급',
      'advanced': '고급'
    };
    
    return `
      <div class="card container result-container">
        <h1>게임 완료!</h1>
        
        <div class="result-emoji">${emoji}</div>
        
        <div class="result-grade">${this.result.grade}등급</div>
        
        ${newBestBadge}
        
        <div class="result-stats">
          <div class="stat-item">
            <div class="stat-label">점수</div>
            <div class="stat-value">${this.result.score}</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-label">정확도</div>
            <div class="stat-value">${this.result.accuracy}%</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-label">정답</div>
            <div class="stat-value">${this.result.correctCount}개</div>
          </div>
        </div>
        
        <div class="result-message">
          ${message}
        </div>
        
        <div class="button-group">
          <button id="retry-btn" class="primary">
            다시 하기
          </button>
          <button id="level-select-btn" class="secondary">
            레벨 선택
          </button>
          <button id="home-btn" class="secondary">
            홈으로
          </button>
        </div>
      </div>
    `;
  }
  
  afterRender() {
    document.getElementById('retry-btn').addEventListener('click', () => {
      this.router.navigate('game', { level: this.result.level });
    });
    
    document.getElementById('level-select-btn').addEventListener('click', () => {
      this.router.navigate('level-select');
    });
    
    document.getElementById('home-btn').addEventListener('click', () => {
      this.router.navigate('home');
    });
  }
  
  destroy() {
    // Cleanup
  }
}
