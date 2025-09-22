<!-- src/lib/components/GameUI/TypingInterface.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { TypingTest } from '$lib/utils/typingLogic';
  import type { TypingChallenge, TypingResult } from '$lib/types/game';
  
  export let challenge: TypingChallenge;
  
  const dispatch = createEventDispatcher<{
    complete: TypingResult;
    progress: { progress: number; errors: number };
  }>();
  
  let typingTest: TypingTest;
  let userInput = '';
  let isStarted = false;
  let currentStreak = 0;
  let errors = 0;
  let progress = 0;
  
  $: if (challenge) {
    typingTest = new TypingTest(challenge);
    userInput = '';
    isStarted = false;
    progress = 0;
    errors = 0;
  }
  
  function handleInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    
    if (!isStarted) {
      typingTest.start();
      isStarted = true;
    }
    
    userInput = input;
    const result = typingTest.updateInput(input);
    errors = result.errors;
    progress = result.progress;
    
    dispatch('progress', { progress, errors });
    
    if (input === challenge.text) {
      const finalResult = typingTest.getResult();
      dispatch('complete', finalResult);
    }
  }
  
  function getCharClass(index: number): string {
    if (index >= userInput.length) return 'untyped';
    return userInput[index] === challenge.text[index] ? 'correct' : 'incorrect';
  }
</script>

<div class="typing-interface">
  <div class="challenge-text">
    {#each challenge.text.split('') as char, i}
      <span class="char {getCharClass(i)}">{char}</span>
    {/each}
  </div>
  
  <div class="input-container">
    <input
      type="text"
      bind:value={userInput}
      on:input={handleInput}
      placeholder="Start typing here..."
      class="typing-input"
    />
  </div>
  
  <div class="stats">
    <div class="streak-indicator">
      <span class="flame-icon">🔥</span>
      <span>{currentStreak} DAY STREAK</span>
    </div>
    
    <div class="progress-info">
      <span>Progress: {progress.toFixed(1)}%</span>
      <span>Errors: {errors}</span>
    </div>
  </div>
</div>

<style>
  .typing-interface {
    background: white;
    border-radius: 15px;
    padding: 20px;
    border: 3px solid #DDD;
    max-width: 600px;
    margin: 0 auto;
  }

  .challenge-text {
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 20px;
    font-family: 'Courier New', monospace;
  }

  .char {
    padding: 2px;
    border-radius: 3px;
  }

  .char.correct {
    background-color: #90EE90;
  }

  .char.incorrect {
    background-color: #FFB6C1;
  }

  .char.untyped {
    background-color: transparent;
  }

  .typing-input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 2px solid #DDD;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .typing-input:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .streak-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FF4500;
    font-weight: bold;
  }

  .flame-icon {
    font-size: 20px;
  }

  .progress-info {
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: #666;
  }
</style>