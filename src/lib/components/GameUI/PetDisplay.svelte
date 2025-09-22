<script lang="ts">
  import { onMount } from 'svelte';
  import type { PetStage, PetMood, Room } from '$lib/types/game';

  export let stage: PetStage;
  export let mood: PetMood;
  export let currentRoom: Room;

  let petElement: HTMLDivElement;
  let thoughtBubble = '';
  let isAnimating = false;

  // Pet stage configurations
  const petStages = {
    egg: {
      body: '🥚',
      size: '80px',
      description: 'Your pet is still developing!'
    },
    first: {
      body: '●●\n—\n/|\\',
      size: '60px',
      description: 'Your pet has hatched!'
    },
    second: {
      body: '◉◉\n ω \n/|\\',
      size: '70px',
      description: 'Your pet is growing stronger!'
    },
    third: {
      body: '🚀',
      size: '90px',
      description: 'Your pet has evolved to its final form!'
    },
    dead: {
      body: '💀',
      size: '60px',
      description: 'Your pet needs better care...'
    }
  };

  // Mood expressions for non-egg stages
  const moodFaces = {
    happy: { eyes: '◉◉', mouth: '‿' },
    neutral: { eyes: '●●', mouth: '—' },
    sad: { eyes: '◔◔', mouth: '︵' },
    angry: { eyes: '◣◢', mouth: '︿' },
    sleeping: { eyes: '- -', mouth: '‿' }
  };

  // Room-specific thoughts
  const roomThoughts = {
    kitchen: ['🍎', '🍕', '🍰', '🥪'],
    'living-room': ['📺', '🎮', '📚', '🎵'],
    bathroom: ['🧼', '🛁', '🪥', '💦'],
    bedroom: ['😴', '💤', '🛏️', '🌙'],
    outside: ['🌳', '🌞', '🌺', '🦋']
  };

  $: currentPet = petStages[stage];
  $: currentMood = moodFaces[mood] || moodFaces.neutral;

  onMount(() => {
    // Update thought bubble periodically
    updateThoughtBubble();
    const thoughtInterval = setInterval(updateThoughtBubble, 10000); // Every 10 seconds

    // Add bounce animation when pet appears
    setTimeout(() => {
      if (petElement) {
        petElement.classList.add('bounce');
        setTimeout(() => {
          petElement.classList.remove('bounce');
        }, 600);
      }
    }, 100);

    return () => clearInterval(thoughtInterval);
  });

  function updateThoughtBubble() {
    const thoughts = roomThoughts[currentRoom];
    thoughtBubble = thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  function handlePetClick() {
    if (!isAnimating) {
      isAnimating = true;
      petElement.classList.add('wiggle');
      setTimeout(() => {
        petElement.classList.remove('wiggle');
        isAnimating = false;
      }, 800);
    }
  }

  function getPetDisplay(): string {
    if (stage === 'egg' || stage === 'third' || stage === 'dead') {
      return currentPet.body;
    }
    
    // For first and second stage, construct face with current mood
    return `${currentMood.eyes}\n ${currentMood.mouth} \n/|\\`;
  }

  // Room-specific backgrounds
  function getRoomBackground(): string {
    switch (currentRoom) {
      case 'kitchen':
        return 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 100%)';
      case 'living-room':
        return 'linear-gradient(135deg, #F0E68C 0%, #DDA0DD 100%)';
      case 'bathroom':
        return 'linear-gradient(135deg, #E0F6FF 0%, #B0E0E6 100%)';
      case 'bedroom':
        return 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)';
      case 'outside':
        return 'linear-gradient(135deg, #98FB98 0%, #87CEEB 100%)';
      default:
        return 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)';
    }
  }
</script>

<div class="pet-container" style="background: {getRoomBackground()}">
  <!-- Room decorations -->
  <div class="room-decorations">
    {#if currentRoom === 'kitchen'}
      <div class="decoration fridge">📦</div>
      <div class="decoration stove">🔥</div>
    {:else if currentRoom === 'living-room'}
      <div class="decoration tv">📺</div>
      <div class="decoration couch">🛋️</div>
    {:else if currentRoom === 'bathroom'}
      <div class="decoration mirror">🪞</div>
      <div class="decoration plant">🪴</div>
    {:else if currentRoom === 'bedroom'}
      <div class="decoration bed">🛏️</div>
      <div class="decoration lamp">💡</div>
    {:else if currentRoom === 'outside'}
      <div class="decoration tree">🌳</div>
      <div class="decoration sun">☀️</div>
    {/if}
  </div>

  <!-- Pet display -->
  <div 
    class="pet-display {stage} {mood}" 
    bind:this={petElement}
    on:click={handlePetClick}
    on:keydown={(e) => e.key === 'Enter' && handlePetClick()}
    role="button"
    tabindex="0"
    aria-label="Click to interact with your pet"
    style="font-size: {currentPet.size}; cursor: pointer;"
  >
    {#if stage === 'egg' || stage === 'third' || stage === 'dead'}
      <span class="pet-emoji">{currentPet.body}</span>
    {:else}
      <div class="pet-ascii">
        <div class="eyes">{currentMood.eyes}</div>
        <div class="mouth">{currentMood.mouth}</div>
        <div class="body">/|\\</div>
      </div>
    {/if}
  </div>

  <!-- Thought bubble -->
  {#if thoughtBubble && stage !== 'dead'}
    <div class="thought-bubble">
      <div class="bubble-content">{thoughtBubble}</div>
      <div class="bubble-tail"></div>
    </div>
  {/if}

  <!-- Pet status indicator -->
  <div class="pet-status">
    <div class="status-text">{currentPet.description}</div>
    <div class="mood-indicator mood-{mood}">
      Mood: <span class="mood-name">{mood}</span>
    </div>
  </div>

  <!-- Interaction hints -->
  {#if !isAnimating}
    <div class="interaction-hint">
      Click me! 🖱️
    </div>
  {/if}
</div>

<style>
  .pet-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 300px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background 0.5s ease;
  }

  .room-decorations {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .decoration {
    position: absolute;
    font-size: 2rem;
    opacity: 0.7;
    animation: float 3s ease-in-out infinite;
  }

  .fridge { top: 20px; left: 20px; }
  .stove { bottom: 20px; right: 20px; }
  .tv { top: 20px; right: 20px; }
  .couch { bottom: 20px; left: 20px; }
  .mirror { top: 20px; left: 20px; }
  .plant { bottom: 20px; right: 20px; }
  .bed { bottom: 20px; left: 20px; }
  .lamp { top: 20px; right: 20px; }
  .tree { bottom: 20px; left: 20px; }
  .sun { top: 20px; right: 20px; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .pet-display {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: transform 0.3s ease;
    user-select: none;
  }

  .pet-display:hover {
    transform: scale(1.1);
  }

  .pet-emoji {
    font-size: inherit;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .pet-ascii {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    color: #333;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  }

  .eyes {
    font-size: 1.2em;
    margin-bottom: 0.1em;
  }

  .mouth {
    font-size: 0.8em;
    margin-bottom: 0.2em;
  }

  .body {
    font-size: 0.9em;
  }

  .thought-bubble {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 2px solid #333;
    border-radius: 20px;
    padding: 8px 12px;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: thoughtAppear 0.5s ease-out, thoughtFloat 2s ease-in-out infinite;
    z-index: 3;
  }

  .bubble-content {
    text-align: center;
  }

  .bubble-tail {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }

  .bubble-tail::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #333;
  }

  @keyframes thoughtAppear {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }

  @keyframes thoughtFloat {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50% { transform: translateX(-50%) translateY(-5px); }
  }

  .pet-status {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .status-text {
    font-weight: bold;
    color: #333;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .mood-indicator {
    font-size: 0.8rem;
    font-weight: 500;
  }

  .mood-name {
    text-transform: capitalize;
    font-weight: bold;
  }

  .mood-happy .mood-name { color: #4CAF50; }
  .mood-neutral .mood-name { color: #757575; }
  .mood-sad .mood-name { color: #2196F3; }
  .mood-angry .mood-name { color: #F44336; }
  .mood-sleeping .mood-name { color: #9C27B0; }

  .interaction-hint {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    opacity: 0.8;
    animation: hintPulse 2s infinite;
    z-index: 3;
  }

  @keyframes hintPulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.4; }
  }

  /* Pet animations */
  .bounce {
    animation: bounceIn 0.6s ease-out;
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .wiggle {
    animation: wiggleAnim 0.8s ease-in-out;
  }

  @keyframes wiggleAnim {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
  }

  /* Stage-specific styling */
  .pet-display.dead {
    filter: grayscale(100%);
    opacity: 0.7;
  }

  .pet-display.third {
    animation: finalFormGlow 2s ease-in-out infinite;
  }

  @keyframes finalFormGlow {
    0%, 100% { 
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }
    50% { 
      filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .pet-container {
      min-height: 250px;
    }
    
    .decoration {
      font-size: 1.5rem;
    }
    
    .pet-status {
      bottom: 10px;
      padding: 8px 12px;
    }
    
    .status-text {
      font-size: 0.8rem;
    }
    
    .mood-indicator {
      font-size: 0.7rem;
    }
    
    .interaction-hint {
      font-size: 0.7rem;
      padding: 4px 8px;
    }
  }
</style>