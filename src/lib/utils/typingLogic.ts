import type { TypingResult, TypingChallenge, Room } from '$lib/types/game';

export class TypingTest {
  private challenge: TypingChallenge;
  private startTime: number | null = null;
  private currentInput = '';
  private errors = 0;
  private isComplete = false;

  constructor(challenge: TypingChallenge) {
    this.challenge = challenge;
  }

  start() {
    this.startTime = Date.now();
  }

  updateInput(input: string): { errors: number; progress: number } {
    this.currentInput = input;
    
    // Calculate errors
    this.errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== this.challenge.text[i]) {
        this.errors++;
      }
    }

    const progress = (input.length / this.challenge.text.length) * 100;
    
    if (input === this.challenge.text) {
      this.isComplete = true;
    }

    return { errors: this.errors, progress };
  }

  getResult(): TypingResult {
    if (!this.startTime || !this.isComplete) {
      throw new Error('Test not completed');
    }

    const timeSpent = (Date.now() - this.startTime) / 1000; // seconds
    const words = this.challenge.text.split(' ').length;
    const wpm = Math.round((words / timeSpent) * 60);
    const accuracy = Math.round(((this.challenge.text.length - this.errors) / this.challenge.text.length) * 100);

    return {
      wpm,
      accuracy,
      wordsTyped: words,
      timeSpent,
      errors: this.errors
    };
  }
}

export const calculateRewards = (result: TypingResult, room: Room) => {
  const baseReward = result.wordsTyped;
  const accuracyBonus = result.accuracy > 90 ? baseReward * 0.2 : 0;
  const speedBonus = result.wpm > 40 ? baseReward * 0.1 : 0;
  
  const totalReward = baseReward + accuracyBonus + speedBonus;
  
  // Room-specific stat increases
  const statIncreases = {
    kitchen: { hunger: totalReward * 0.3 },
    bedroom: { sleep: totalReward * 0.3 },
    bathroom: { hygiene: totalReward * 0.3 },
    'living-room': { entertainment: totalReward * 0.3 },
    outside: { entertainment: totalReward * 0.2, hunger: totalReward * 0.1 }
  };
  
  return {
    totalReward,
    statIncreases: statIncreases[room] || {}
  };
};