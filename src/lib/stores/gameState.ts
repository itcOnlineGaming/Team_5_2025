import { writable, derived } from 'svelte/store';
import type { GameState, PetStats, Room, PetStage, PetMood } from '$lib/types/game';

// Initialize with default values
const defaultGameState: GameState = {
  dailyStreak: 0,
  totalWordsTyped: 0,
  dailyWordsTyped: 0,
  dailyTarget: 300,
  lastPlayDate: new Date().toDateString(),
  currentRoom: 'living-room'
};

const defaultPetStats: PetStats = {
  hunger: 75,
  sleep: 75,
  hygiene: 75,
  entertainment: 75,
  growth: 0,
  stage: 'egg',
  mood: 'neutral'
};

// Create stores
export const gameState = writable<GameState>(defaultGameState);
export const petStats = writable<PetStats>(defaultPetStats);

// Derived stores
export const dailyProgress = derived(
  gameState,
  ($gameState) => Math.min(($gameState.dailyWordsTyped / $gameState.dailyTarget) * 100, 100)
);

export const petGrowthProgress = derived(
  petStats,
  ($petStats) => {
    const stageThresholds = { egg: 0, first: 25, second: 50, third: 75, dead: 0 };
    return ($petStats.growth / 100) * 100;
  }
);

// Actions
export const gameActions = {
  updateDailyProgress: (wordsTyped: number) => {
    gameState.update(state => ({
      ...state,
      dailyWordsTyped: state.dailyWordsTyped + wordsTyped,
      totalWordsTyped: state.totalWordsTyped + wordsTyped
    }));
  },
  
  changeRoom: (room: Room) => {
    gameState.update(state => ({ ...state, currentRoom: room }));
  },
  
  checkDailyReset: () => {
    const today = new Date().toDateString();
    gameState.update(state => {
      if (state.lastPlayDate !== today) {
        return {
          ...state,
          dailyWordsTyped: 0,
          lastPlayDate: today,
          dailyStreak: state.dailyWordsTyped >= state.dailyTarget 
            ? state.dailyStreak + 1 
            : 0
        };
      }
      return state;
    });
  }
};

export const petActions = {
  updateStats: (statType: keyof Omit<PetStats, 'stage' | 'mood'>, value: number) => {
    petStats.update(stats => ({
      ...stats,
      [statType]: Math.max(0, Math.min(100, stats[statType] + value))
    }));
  },
  
  evolve: () => {
    petStats.update(stats => {
      const stages: PetStage[] = ['egg', 'first', 'second', 'third'];
      const currentIndex = stages.indexOf(stats.stage);
      
      if (stats.growth >= 25 && currentIndex < stages.length - 1) {
        return { ...stats, stage: stages[currentIndex + 1] };
      }
      
      return stats;
    });
  },
  
  updateMood: () => {
    petStats.update(stats => {
      const avgStats = (stats.hunger + stats.sleep + stats.hygiene + stats.entertainment) / 4;
      let mood: PetMood = 'neutral';
      
      if (avgStats >= 80) mood = 'happy';
      else if (avgStats <= 30) mood = 'sad';
      else if (avgStats <= 15) mood = 'angry';
      
      return { ...stats, mood };
    });
  }
};