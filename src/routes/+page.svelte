<script lang="ts">
  import { onMount } from 'svelte';
  import { gameState, petStats, gameActions, petActions, dailyProgress } from '$lib/stores/gameState';
  import ProgressBars from '$lib/components/GameUI/ProgressBars.svelte';
  import NavigationButtons from '$lib/components/GameUI/NavigationButtons.svelte';
  import PetDisplay from '$lib/components/GameUI/PetDisplay.svelte';
  import TypingInterface from '$lib/components/GameUI/TypingInterface.svelte';
  import { loadGameData, saveGameData } from '$lib/utils/storage';
  import { getRandomChallenge } from '$lib/data/typingChallenge'; // Remove .ts extension
  import { calculateRewards } from '$lib/utils/typingLogic';
  import type { TypingChallenge, TypingResult, Room } from '$lib/types/game';
  import { get } from 'svelte/store';

  let currentChallenge: TypingChallenge | null = null;
  let showTypingInterface = false;
  let gameLoaded = false;

  onMount(() => {
    // Load saved game data
    const savedData = loadGameData();
    if (savedData.gameState) {
      gameState.set(savedData.gameState);
    }
    if (savedData.petStats) {
      petStats.set(savedData.petStats);
    }

    // Check for daily reset
    gameActions.checkDailyReset();
    
    // Start stat decay timer
    startStatDecay();
    
    gameLoaded = true;

    // Auto-save every 30 seconds
    setInterval(() => {
      saveGameData(get(gameState), get(petStats));
    }, 30000);
  });

  function startStatDecay() {
    // Decrease stats every 5 minutes (realistic Tamagotchi-like decay)
    setInterval(() => {
      petActions.updateStats('hunger', -2);
      petActions.updateStats('sleep', -1.5);
      petActions.updateStats('hygiene', -1);
      petActions.updateStats('entertainment', -2.5);
      petActions.updateMood();
      
      // Save after stat changes
      saveGameData(get(gameState), get(petStats));
    }, 300000); // 5 minutes
  }

  function handleRoomChange(event: CustomEvent<Room>) {
    const room = event.detail;
    gameActions.changeRoom(room);
    
    // Load a challenge for this room
    currentChallenge = getRandomChallenge(room);
    showTypingInterface = true;
  }

  function handleTypingComplete(event: CustomEvent<TypingResult>) {
    const result = event.detail;
    
    // Update daily progress
    gameActions.updateDailyProgress(result.wordsTyped);
    
    // Calculate and apply rewards
    const rewards = calculateRewards(result, get(gameState).currentRoom);
    
    Object.entries(rewards.statIncreases).forEach(([stat, increase]) => {
      petActions.updateStats(stat as keyof typeof rewards.statIncreases, increase);
    });
    
    // Update pet growth based on overall care
    const avgStats = (get(petStats).hunger + get(petStats).sleep + get(petStats).hygiene + get(petStats).entertainment) / 4;
    const growthIncrease = Math.max(1, avgStats / 25); // Better care = faster growth
    petActions.updateStats('growth', growthIncrease);
    
    // Check for evolution
    petActions.evolve();
    petActions.updateMood();
    
    // Hide typing interface and show results
    showTypingInterface = false;
    showResults(result, rewards);
    
    // Save progress
    saveGameData(get(gameState), get(petStats));
  }

  function showResults(result: TypingResult, rewards: any) {
    // You can implement a results modal here
    console.log('Typing completed!', { result, rewards });
    alert(`Great job! ${result.wordsTyped} words at ${result.wpm} WPM with ${result.accuracy}% accuracy!`);
  }

  function handleTypingProgress(event: CustomEvent<{progress: number; errors: number}>) {
    // Update UI with real-time progress if needed
    const { progress, errors } = event.detail;
  }

  // Reactive statements for pet care warnings
  $: if (gameLoaded) {
    if ($petStats.hunger < 20 || $petStats.sleep < 20 || $petStats.hygiene < 20 || $petStats.entertainment < 20) {
      // Pet needs attention!
      petActions.updateMood();
    }
  }
</script>

<svelte:head>
  <title>TypeT - Your Typing Pet</title>
</svelte:head>

{#if !gameLoaded}
  <div class="loading-screen">
    <h1>Loading TypeT...</h1>
    <div class="spinner"></div>
  </div>
{:else}
  <main class="game-container">
    <!-- Header with title -->
    <header class="game-header">
      <h1 class="game-title">TypeT</h1>
      <div class="daily-progress">
        <span>Daily Progress: {$gameState.dailyWordsTyped}/{$gameState.dailyTarget} words</span>
        <div class="progress-bar-small">
          <div class="progress-fill" style="width: {$dailyProgress}%"></div>
        </div>
        {#if $gameState.dailyStreak > 0}
          <span class="streak">🔥 {$gameState.dailyStreak} day streak!</span>
        {/if}
      </div>
    </header>

    <div class="game-layout">
      <!-- Left sidebar with progress bars -->
      <aside class="sidebar-left">
        <ProgressBars />
      </aside>

      <!-- Main game area -->
      <section class="main-game-area">
        <div class="pet-container">
          <PetDisplay 
            stage={$petStats.stage}
            mood={$petStats.mood}
            currentRoom={$gameState.currentRoom}
          />
        </div>

        {#if showTypingInterface && currentChallenge}
          <div class="typing-container">
            <TypingInterface 
              {currentChallenge}
              on:complete={handleTypingComplete}
              on:progress={handleTypingProgress}
            />
          </div>
        {:else}
          <div class="room-prompt">
            <h2>Choose a room to practice typing!</h2>
            <p>Each room helps improve different aspects of your pet's wellbeing.</p>
          </div>
        {/if}
      </section>

      <!-- Right sidebar (future expansion) -->
      <aside class="sidebar-right">
        <div class="pet-info">
          <h3>Pet Status</h3>
          <p>Stage: {$petStats.stage}</p>
          <p>Mood: {$petStats.mood}</p>
          <p>Growth: {$petStats.growth}%</p>
        </div>
        
        {#if $petStats.hunger < 25}
          <div class="alert hunger-alert">
            <span>🍽️</span>
            <p>Your pet is hungry! Visit the kitchen.</p>
          </div>
        {/if}
        
        {#if $petStats.sleep < 25}
          <div class="alert sleep-alert">
            <span>😴</span>
            <p>Your pet is tired! Visit the bedroom.</p>
          </div>
        {/if}
        
        {#if $petStats.hygiene < 25}
          <div class="alert hygiene-alert">
            <span>🛁</span>
            <p>Your pet needs cleaning! Visit the bathroom.</p>
          </div>
        {/if}
        
        {#if $petStats.entertainment < 25}
          <div class="alert entertainment-alert">
            <span>📺</span>
            <p>Your pet is bored! Visit the living room.</p>
          </div>
        {/if}
      </aside>
    </div>

    <!-- Navigation buttons at bottom -->
    <footer class="game-footer">
      <NavigationButtons 
        currentRoom={$gameState.currentRoom}
        on:roomChange={handleRoomChange}
      />
    </footer>
  </main>
{/if}

<style>
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #ffffff;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-top: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .game-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    flex-direction: column;
  }

  .game-header {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-bottom: 3px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(10px);
  }

  .game-title {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4);
    background-size: 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease-in-out infinite;
    margin: 0;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .daily-progress {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    font-weight: 600;
  }

  .progress-bar-small {
    width: 200px;
    height: 10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    transition: width 0.3s ease;
  }

  .streak {
    color: #FF6B35;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .game-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 300px 1fr 250px;
    gap: 20px;
    padding: 20px;
  }

  .main-game-area {
    background: rgba(139, 69, 19, 0.8);
    border-radius: 15px;
    border: 4px solid #8B4513;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 500px;
  }

  .pet-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #B0E0E6 100%);
    border-radius: 10px;
    min-height: 300px;
    position: relative;
  }

  .typing-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .room-prompt {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    color: #333;
  }

  .room-prompt h2 {
    color: #4A90E2;
    margin-bottom: 10px;
  }

  .sidebar-left {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 20px;
    backdrop-filter: blur(10px);
  }

  .sidebar-right {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .pet-info {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 15px;
    backdrop-filter: blur(10px);
  }

  .pet-info h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  .pet-info p {
    margin: 5px 0;
    text-transform: capitalize;
  }

  .alert {
    background: rgba(255, 69, 58, 0.9);
    color: white;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    animation: pulse 2s infinite;
  }

  .alert span {
    font-size: 1.2rem;
  }

  .alert p {
    margin: 0;
    font-size: 0.9rem;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .game-footer {
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-top: 3px solid #ddd;
    backdrop-filter: blur(10px);
  }

  /* Responsive design */
  @media (max-width: 1200px) {
    .game-layout {
      grid-template-columns: 250px 1fr 200px;
    }
  }

  @media (max-width: 900px) {
    .game-layout {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }
    
    .sidebar-left, .sidebar-right {
      order: 3;
    }
    
    .main-game-area {
      order: 1;
    }
  }
</style>