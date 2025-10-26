// ===== Sound Manager (Pure JS Audio API) =====
export class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.loadSounds();
  }
  
  loadSounds() {
    // We'll use Web Audio API to generate simple tones
    // since we don't have actual audio files yet
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  
  // Play success sound
  playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, 0.1, 'sine'); // C5 note
  }
  
  // Play error sound
  playWrong() {
    if (!this.enabled) return;
    this.playTone(196.00, 0.2, 'sawtooth'); // G3 note
  }
  
  // Play completion sound
  playComplete() {
    if (!this.enabled) return;
    // Play a sequence of notes
    setTimeout(() => this.playTone(523.25, 0.1, 'sine'), 0);
    setTimeout(() => this.playTone(659.25, 0.1, 'sine'), 150);
    setTimeout(() => this.playTone(783.99, 0.2, 'sine'), 300);
  }
  
  // Generate and play a tone
  playTone(frequency, duration, type = 'sine') {
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration
      );
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }
}
