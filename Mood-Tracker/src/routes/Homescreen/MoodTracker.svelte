<script lang="ts">
  import { mood } from "$lib/stores/moods"; // your store
  import { derived } from "svelte/store";
  import red from "$lib/assets/RedMood.png";
  import orange from "$lib/assets/OrangeMood.png";
  import yellow from "$lib/assets/YellowMood.png";
  import lime from "$lib/assets/LimeMood.png";
  import green from "$lib/assets/GreenMood.png";

  const moodColors = [red, orange, yellow, lime, green];
  let selectedMood = 2; // example: 0–4

  export let onEditClick: () => void = () => {};

  const periods = ["MORNING", "AFTERNOON", "EVENING", "NIGHT"];

 
  const moodData = derived(mood, ($mood) => {
    // If mood is null, initialize 4 slots as null
    if ($mood === null) return [null, null, null, null];

    return [$mood, null, null, null];
  });
</script>

<section class="mood-graph-card">
  <div class="mood-header">
    <h2 class="mood-title">TODAY'S MOOD TRACKER</h2>
  </div>

  <div class="graph-container">
    <div class="graph-main"> 
      <div class="mood-scale-left">
        {#each [5, 4, 3, 2, 1] as value}
          <div class="mood-emoji">
            <img src={moodColors[value - 1]} alt="Mood Icon" />
          </div>
        {/each}
      </div>

      <svg class="mood-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
        <!-- Dashed grid -->
        {#each [0,1,2,3,4] as i}
          <line x1="0" y1={i * 100 + 50} x2="600" y2={i * 100 + 50} stroke="#E5E7EB" stroke-width="1" stroke-dasharray="8,8"/>
        {/each}

        <!-- Axes -->
        <line x1="0" y1="0" x2="0" y2="400" stroke="#9CA3AF" stroke-width="2" />
        <line x1="0" y1="400" x2="600" y2="400" stroke="#9CA3AF" stroke-width="2" />

        <!-- Mood line -->
        <polyline
          fill="none"
          stroke="#A78BFA"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          points={$mood
            .map((value, i, arr) => {
              if (value === null) return null;
              const x = (i / (arr.length - 1)) * 600; // evenly spaced across 4 slots
              const y = 400 - ((value - 1) / 4) * 350 - 25;
              return `${x},${y}`;
            })
            .filter(Boolean)
            .join(" ")
          }
        />

        <!-- Data points -->
        {#each $mood as value, i}
          {#if value !== null}
            <circle
              cx={(i / ($mood.length - 1)) * 600}
              cy={400 - ((value - 1) / 4) * 350 - 25}
              r="8"
              fill="#A78BFA"
              stroke="white"
              stroke-width="3"
            />
          {/if}
        {/each}
      </svg>
    </div>

     <div class="time-labels-bottom">
      {#each periods as period, i}
        <div class="time-label" style="left: {(i / (periods.length - 1)) * 100}%">
          {period}
        </div>
      {/each}
    
    </div>

  </div>

    <button on:click={onEditClick} class="edit-btn">EDIT</button>
</section>

<style>
  .mood-graph-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  max-width: 750px;
  margin: 0 auto 2rem auto;
}

.mood-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.mood-title {
  font-size: 22px;
  font-weight: 700;
  color: #6366f1;
}

.edit-btn {
		background: var(--color-edit-btn);
		color: white;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		padding: var(--spacing-md) var(--spacing-xl);
		border-radius: var(--radius-md);
		width: 100%;
		box-shadow: var(--shadow-md);
		border: none;
		cursor: pointer;
	}

.edit-btn:hover {
  background: #38bdf8;
}

.graph-container {
  position: relative;
  min-height: 320px;
  background: #fafafa;
  border-radius: 12px;
  padding: 8px;
}

/* SVG graph full width */
.mood-svg {
    flex: 1;
    width: 100%;
    height: 100%;
  }

/* LEFT SCALE: mood images/emojis */
.mood-scale-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60px;
    height: 100%;
    padding: 8px 0;
  }

.mood-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

 .mood-emoji img {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }

  .graph-main {
    display: flex;
    gap: 12px;
    height: 320px; /* match the graph height */
  }

  .graph-container {
    position: relative;
    min-height: 320px;
    background: #fafafa;
    border-radius: 12px;
    padding: 8px;
  }

  .time-labels-bottom {
  position: relative;
  margin-top: 12px;
  height: 24px;
  width: 85%;
}

.time-label {
  position: absolute;
  margin-left: 11%;
  font-size: 13px;
  font-weight: 600;
  color: #8b5cf6;
  white-space: nowrap;
}
</style>