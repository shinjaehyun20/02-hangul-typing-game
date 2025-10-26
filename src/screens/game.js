// ===== Game Screen =====
export class GameScreen {
  constructor(router, state) {
    this.router = router;
    this.state = state;
    this.level = state.level || 'beginner';
    this.words = [];
    this.wordIndex = 0;
    this.currentWord = '';
    this.userInput = '';
    this.score = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.isLoading = true;
    this.feedback = ''; // 💡 피드백 상태 추가
  this.isProcessing = false; // 정답 처리 중 여부
  this.loadWords();
  }

  async loadWords() {
    try {
      const response = await fetch('./data/words.json');
      const data = await response.json();
      this.words = data[this.level] || [];
      const settings = window.appStorage.getSettings();
      this.words = this.words.slice(0, settings.wordsPerGame);
      this.currentWord = this.words[0];
      this.isLoading = false;
      document.getElementById('app').innerHTML = this.render();
      this.attachEvents();
    } catch (error) {
      console.error('Error loading words:', error);
      this.words = ['오류', '발생'];
      this.currentWord = this.words[0];
      this.isLoading = false;
      document.getElementById('app').innerHTML = this.render();
      this.attachEvents();
    }
  }

  render() {
    if (this.isLoading) {
      return `
        <div class="game-container">
          <div class="loading">
            <h2>🎮 게임 준비 중...</h2>
            <p>단어를 불러오고 있어요!</p>
          </div>
        </div>
      `;
    }

    const progress = ((this.wordIndex) / this.words.length) * 100;
    return `
      <div class="game-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
          <span class="progress-text">${this.wordIndex + 1} / ${this.words.length}</span>
        </div>
        <div class="word-display">
          <h2 class="current-word">${this.currentWord}</h2>
        </div>
        <div class="input-section">
          <input 
            type="text" 
            id="wordInput" 
            placeholder="여기에 입력하세요"
            autocomplete="off"
            autofocus
          >
          <div class="feedback">
            ${this.feedback ? `<span>${this.feedback}</span>` : ''}
          </div>
        </div>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">점수</span>
            <span class="stat-value">${this.score}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">✅ 정답</span>
            <span class="stat-value">${this.correctCount}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">❌ 오답</span>
            <span class="stat-value">${this.wrongCount}</span>
          </div>
        </div>
        <button id="quitGame" class="btn-secondary">게임 종료</button>
      </div>
    `;
  }

  attachEvents() {
    const input = document.getElementById('wordInput');
    if (input) {
      input.value = '';
      input.focus();
      // 중복 바인딩 방지: 기존 이벤트 제거 후 바인딩
      input.oninput = null;
      input.oninput = (e) => this.handleInput(e);
    }

    const quitBtn = document.getElementById('quitGame');
    if (quitBtn) {
      quitBtn.addEventListener('click', () => {
        this.router.navigate('home');
      });
    }
  }

  handleInput(e) {
    if (this.isProcessing) return; // 정답 처리 중이면 무시
    this.userInput = e.target.value;
    if (this.userInput === this.currentWord) {
      this.isProcessing = true;
      this.feedback = '정답!';
      document.getElementById('app').innerHTML = this.render();
      this.attachEvents();
      setTimeout(() => {
        this.feedback = '';
        this.handleCorrect();
        this.isProcessing = false;
      }, 700);
      return;
    }
    // 오답 피드백이 필요하면 아래 else 블록 참고
    // else {
    //   this.feedback = '오답!';
    //   document.getElementById('app').innerHTML = this.render();
    //   this.attachEvents();
    //   setTimeout(() => {
    //     this.feedback = '';
    //     this.handleWrong();
    //   }, 700);
    // }
  }

  handleCorrect() {
  window.appSound.playCorrect();
  this.correctCount++;
  this.score += 10;
  this.nextWord();
  }

  handleWrong() {
    window.appSound.playWrong();
    this.wrongCount++;
    this.nextWord();
  }

  nextWord() {
    this.wordIndex++;
    if (this.wordIndex >= this.words.length) {
      this.endGame();
      return;
    }
    this.currentWord = this.words[this.wordIndex];
    this.userInput = '';
    document.getElementById('app').innerHTML = this.render();
    this.attachEvents();
  }

  endGame() {
    window.appSound.playComplete();
    const result = {
      level: this.level,
      score: this.score,
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      totalWords: this.words.length,
      accuracy: Math.round((this.correctCount / this.words.length) * 100),
      grade: this.calculateGrade()
    };
    window.appStorage.saveProgress(this.level, result);
    this.router.navigate('result', result);
  }

  calculateGrade() {
    const accuracy = (this.correctCount / this.words.length) * 100;
    if (accuracy === 100) return 'S';
    if (accuracy >= 90) return 'A';
    if (accuracy >= 80) return 'B';
    if (accuracy >= 70) return 'C';
    return 'D';
  }
}
