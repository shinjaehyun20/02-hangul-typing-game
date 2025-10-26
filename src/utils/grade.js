// ===== Grade Calculator =====

export function calculateGrade(correctCount, totalCount) {
  const accuracy = (correctCount / totalCount) * 100;
  
  if (accuracy === 100) return 'S';
  if (accuracy >= 90) return 'A';
  if (accuracy >= 80) return 'B';
  if (accuracy >= 70) return 'C';
  return 'D';
}

export function calculateScore(correctCount) {
  return correctCount * 10;
}

export function calculateAccuracy(correctCount, totalCount) {
  return Math.round((correctCount / totalCount) * 100);
}

export function getGradeEmoji(grade) {
  const emojis = {
    'S': '🏆',
    'A': '🎉',
    'B': '👏',
    'C': '💪',
    'D': '📚'
  };
  return emojis[grade] || '⭐';
}

export function getGradeMessage(grade) {
  const messages = {
    'S': '완벽해요! 정말 대단해요! 🌟',
    'A': '훌륭해요! 조금만 더 연습하면 완벽해질 거예요!',
    'B': '잘했어요! 계속 연습하면 더 잘할 수 있어요!',
    'C': '좋아요! 조금만 더 집중하면 돼요!',
    'D': '괜찮아요! 다시 한번 도전해볼까요?'
  };
  return messages[grade] || '계속 연습해봐요!';
}
