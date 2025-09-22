export interface GameState {
  dailyStreak: number;
  totalWordsTyped: number;
  dailyWordsTyped: number;
  dailyTarget: number;
  lastPlayDate: string;
  currentRoom: Room;
}

export interface PetStats {
  hunger: number;
  sleep: number;
  hygiene: number;
  entertainment: number;
  growth: number;
  stage: PetStage;
  mood: PetMood;
}

export type Room = 'kitchen' | 'living-room' | 'bathroom' | 'bedroom' | 'outside';

export type PetStage = 'egg' | 'first' | 'second' | 'third' | 'dead';

export type PetMood = 'happy' | 'neutral' | 'sad' | 'angry' | 'sleeping';

export interface TypingChallenge {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  room: Room;
}

export interface TypingResult {
  wpm: number;
  accuracy: number;
  wordsTyped: number;
  timeSpent: number;
  errors: number;
}