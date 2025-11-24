<script lang="ts">
  import { mood } from "$lib/stores/moods"; // your store
  import { derived } from "svelte/store";


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
    <button on:click={onEditClick} class="edit-btn">EDIT</button>
  </div>

  <div class="graph-container">
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
      {#each $moodData as value, i}
        {#if value !== null}
          <circle
            cx={(i / ($moodData.length - 1)) * 600}
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
    background: #7dd3fc;
    color: white;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
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

  .mood-svg {
    width: 100%;
    height: 100%;
  }
</style>