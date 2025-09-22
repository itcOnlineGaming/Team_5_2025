// src/lib/utils/storage.ts
import type { GameState, PetStats } from '$lib/types/game';

const GAME_STATE_KEY = 'typet-game-state';
const PET_STATS_KEY = 'typet-pet-stats';
const VERSION_KEY = 'typet-version';
const CURRENT_VERSION = '1.0.0';

interface SavedData {
  gameState: GameState | null;
  petStats: PetStats | null;
  version: string;
}

// Default states
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

/**
 * Save game state and pet stats to local storage
 */
export function saveGameData(gameState: GameState, petStats: PetStats): void {
  try {
    if (typeof window === 'undefined') return; // SSR safety
    
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    localStorage.setItem(PET_STATS_KEY, JSON.stringify(petStats));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    
    console.log('Game data saved successfully');
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
}

/**
 * Load game state and pet stats from local storage
 */
export function loadGameData(): SavedData {
  try {
    if (typeof window === 'undefined') {
      return {
        gameState: defaultGameState,
        petStats: defaultPetStats,
        version: CURRENT_VERSION
      };
    }

    const savedVersion = localStorage.getItem(VERSION_KEY);
    
    // Check for version compatibility
    if (savedVersion !== CURRENT_VERSION) {
      console.log('Version mismatch, starting fresh game');
      clearGameData();
      return {
        gameState: defaultGameState,
        petStats: defaultPetStats,
        version: CURRENT_VERSION
      };
    }

    const gameStateData = localStorage.getItem(GAME_STATE_KEY);
    const petStatsData = localStorage.getItem(PET_STATS_KEY);

    const gameState = gameStateData ? JSON.parse(gameStateData) as GameState : defaultGameState;
    const petStats = petStatsData ? JSON.parse(petStatsData) as PetStats : defaultPetStats;

    // Validate and clean up loaded data
    const cleanGameState = validateGameState(gameState);
    const cleanPetStats = validatePetStats(petStats);

    console.log('Game data loaded successfully');
    
    return {
      gameState: cleanGameState,
      petStats: cleanPetStats,
      version: CURRENT_VERSION
    };
  } catch (error) {
    console.error('Failed to load game data:', error);
    return {
      gameState: defaultGameState,
      petStats: defaultPetStats,
      version: CURRENT_VERSION
    };
  }
}

/**
 * Clear all saved game data
 */
export function clearGameData(): void {
  try {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(GAME_STATE_KEY);
    localStorage.removeItem(PET_STATS_KEY);
    localStorage.removeItem(VERSION_KEY);
    
    console.log('Game data cleared');
  } catch (error) {
    console.error('Failed to clear game data:', error);
  }
}

/**
 * Export game data as JSON for backup
 */
export function exportGameData(): string {
  const data = loadGameData();
  return JSON.stringify({
    ...data,
    exportDate: new Date().toISOString()
  }, null, 2);
}

/**
 * Import game data from JSON backup
 */
export function importGameData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.gameState && data.petStats) {
      const cleanGameState = validateGameState(data.gameState);
      const cleanPetStats = validatePetStats(data.petStats);
      
      saveGameData(cleanGameState, cleanPetStats);
      console.log('Game data imported successfully');
      return true;
    }
    
    throw new Error('Invalid data format');
  } catch (error) {
    console.error('Failed to import game data:', error);
    return false;
  }
}

/**
 * Validate and clean game state data
 */
function validateGameState(gameState: any): GameState {
  return {
    dailyStreak: Math.max(0, gameState.dailyStreak || 0),
    totalWordsTyped: Math.max(0, gameState.totalWordsTyped || 0),
    dailyWordsTyped: Math.max(0, gameState.dailyWordsTyped || 0),
    dailyTarget: Math.max(1, gameState.dailyTarget || 300),
    lastPlayDate: gameState.lastPlayDate || new Date().toDateString(),
    currentRoom: ['kitchen', 'living-room', 'bathroom', 'bedroom', 'outside'].includes(gameState.currentRoom) 
      ? gameState.currentRoom 
      : 'living-room'
  };
}

/**
 * Validate and clean pet stats data
 */
function validatePetStats(petStats: any): PetStats {
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value || 0));
  
  return {
    hunger: clamp(petStats.hunger, 0, 100),
    sleep: clamp(petStats.sleep, 0, 100),
    hygiene: clamp(petStats.hygiene, 0, 100),
    entertainment: clamp(petStats.entertainment, 0, 100),
    growth: clamp(petStats.growth, 0, 100),
    stage: ['egg', 'first', 'second', 'third', 'dead'].includes(petStats.stage) 
      ? petStats.stage 
      : 'egg',
    mood: ['happy', 'neutral', 'sad', 'angry', 'sleeping'].includes(petStats.mood) 
      ? petStats.mood 
      : 'neutral'
  };
}

/**
 * Check if it's a new day and reset daily stats if needed
 */
export function checkAndResetDaily(gameState: GameState): GameState {
  const today = new Date().toDateString();
  
  if (gameState.lastPlayDate !== today) {
    const metDailyGoal = gameState.dailyWordsTyped >= gameState.dailyTarget;
    
    return {
      ...gameState,
      dailyWordsTyped: 0,
      lastPlayDate: today,
      dailyStreak: metDailyGoal ? gameState.dailyStreak + 1 : 0
    };
  }
  
  return gameState;
}

/**
 * Get storage usage information
 */
export function getStorageInfo() {
  if (typeof window === 'undefined') return null;
  
  try {
    const gameStateSize = localStorage.getItem(GAME_STATE_KEY)?.length || 0;
    const petStatsSize = localStorage.getItem(PET_STATS_KEY)?.length || 0;
    const totalSize = gameStateSize + petStatsSize;
    
    return {
      gameStateSize,
      petStatsSize,
      totalSize,
      hasData: gameStateSize > 0 && petStatsSize > 0
    };
  } catch (error) {
    console.error('Failed to get storage info:', error);
    return null;
  }
}