<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { moodEntries } from "$lib/stores/moods";
  import { onMount } from "svelte";

  import cloud from "$lib/assets/Cloud.png";
  import red from "$lib/assets/RedMood.png";
  import orange from "$lib/assets/OrangeMood.png";
  import yellow from "$lib/assets/YellowMood.png";
  import lime from "$lib/assets/LimeMood.png";
  import green from "$lib/assets/GreenMood.png";

  const moodColors = [red, orange, yellow, lime, green];
  const moodTexts = [
    "Oh No!",
    "You might need a break.",
    "Good to Know!",
    "Wonderful!",
    "Thats great to hear!",
  ];

  const taskTexts = [
    "Lets try adjusting the schedule today to better suit your needs",
    "lets ease the workload today",
    "Let's balance out our progress today",
    "Time to start another productive day",
    "Let's calculate what tasks we can focus on today",
  ];

  let selectedMood: number | null = null;

  onMount(() => {
    const moodParam = $page.url.searchParams.get("mood");
    const moodIndex = Number(moodParam);
    if (!isNaN(moodIndex) && moodIndex >= 0 && moodIndex < moodColors.length) {
      selectedMood = moodIndex + 1; // store 1-5 instead of 0-4
    }
  });

  function ToHomeScreen() {
    console.log("Confirm Button Clicked");

    if (selectedMood !== null) {
      console.log("Saving mood:", selectedMood);
      const moodValue = selectedMood;
      moodEntries.update((entries) => {
        return [
          ...entries,
          {
            mood: moodValue,
            timestamp: Date.now(),
          },
        ];
      });
    } else {
      console.error("No mood selected");
    }

    goto(`${base}/Homescreen`, { noScroll: false });
  }
</script>

<div class="result-wrapper">
  <div class="cloud-bg" style="background-image: url({cloud});"></div>

  {#if selectedMood !== null}
    <img
      class="mood-image"
      src={moodColors[selectedMood - 1]}
      alt="Selected Mood"
    />
    <div class="mood-text">{moodTexts[selectedMood - 1]}</div>
    <div class="task-text">{taskTexts[selectedMood - 1]}</div>
    <button class="continueButton" on:click={ToHomeScreen}>Continue</button>
  {:else}
    <div class="mood-text">Loading...</div>
  {/if}
</div>

<style>
  .result-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;
    background-color: transparent;
  }

  .cloud-bg {
    position: absolute;
    top: clamp(20%, 32vh, 42%);
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(250px, 40vw, 600px);
    aspect-ratio: 1 / 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }

  .mood-image {
    width: 100px;
    height: 100px;
    transform: translateY(-110%);
    object-fit: cover;
    z-index: 1;
  }

  .mood-text {
    color: rgba(50, 50, 250, 0.8);
    font-size: 1.5rem;
    font-weight: 700;
    max-width: 80%;
    transform: translateY(-350%);
    z-index: 1;
  }

  .task-text {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    max-width: 80%;
    z-index: 1;
  }

  .continueButton {
    margin-top: 10px;
    padding: 0.6em 2em;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 0.4em;
    cursor: pointer;
    font-size: 1.1em;
  }
</style>
