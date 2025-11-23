<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { derived } from "svelte/store";

    // Assets
    import cloud from "$lib/assets/Cloud.png";
    import red from "$lib/assets/RedMood.png";
    import orange from "$lib/assets/OrangeMood.png";
    import yellow from "$lib/assets/YellowMood.png";
    import lime from "$lib/assets/LimeMood.png";
    import green from "$lib/assets/GreenMood.png";

    // Arrays for moods
    const moodColors = [red, orange, yellow, lime, green];
    const moodTexts = [
        "Oh No!",
        "You might need a break.",
        "Good to Know!",
        "Wonderful!",
        "Thats great to hear!"
    ];

    const taskTexts = [
        "Lets try adjusting the schedule today to better suit your needs",
        "lets ease the workload today",
        "Let's balance out our progress today",
        "Time to start another productive day",
        "Let's calculate what tasks we can focus on today"
    ];

    // Get selected mood index from query params
    const selectedMood = derived(page, $page => {
        const moodIndex = Number($page.url.searchParams.get("mood"));
        if (!isNaN(moodIndex) && moodIndex >= 0 && moodIndex < moodColors.length) {
            return moodIndex;
        }
        return null;
    });

    function ToHomeScreen()
    {
        console.log("Confirm Button Clicked");
        goto(`${base}/Homescreen`, { noScroll: false });
    }
</script>

<div class="result-wrapper">
    <!-- Cloud background -->
    <div class="cloud-bg" style="background-image: url({cloud});"></div>

    {#if $selectedMood !== null}
        <img class="mood-image" src={moodColors[$selectedMood]} alt="Selected Mood" />
        <div class="mood-text">{moodTexts[$selectedMood]}</div>
        <div class="task-text">{taskTexts[$selectedMood]}</div>
        <button class="continueButton" on:click={ToHomeScreen}>Continue</button>
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
    background-color: transparent; /* allow cloud to show */
}

.cloud-bg {
    position: absolute;
    top: 10%;  
    left: 50%;
    transform: translateX(-52%) translateY(-30%);
    width: 570px;
    height: 550px;
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
    z-index: 1;     /* ensure above cloud */
}

.mood-text {
    color: rgba(50, 50, 250, 0.8);
    font-size: 1.5rem;
    font-weight: 700;
    max-width: 80%;
    transform: translateY(-350%);
    z-index: 1;
}

.task-text
{
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    max-width: 80%;
    z-index: 1;
}

.continueButton {
        margin-top: 10px;
        padding: 0.6em 2em;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 0.4em;
        cursor: pointer;
        font-size: 1.1em;
    }
</style>