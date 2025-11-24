<script lang="ts">
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";

    import red from "$lib/assets/RedMood.png";
    import orange from "$lib/assets/OrangeMood.png";
    import yellow from "$lib/assets/YellowMood.png";
    import lime from "$lib/assets/LimeMood.png";
    import green from "$lib/assets/GreenMood.png";
    import cloud from "$lib/assets/Cloud.png";

    const moodColors = [red, orange, yellow, lime, green];

    let timeElapsed = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let timerRunning = false;

    onMount(() => {
        console.log("Timer started");
        timerRunning = true;

        timer = setInterval(() => {
            if (timerRunning) {
                timeElapsed += 1;
            }
        }, 1000);

        return () => {
            if (timer) clearInterval(timer);
        };
    });

    let selectedIndex = 0;
    let sliderValue = 0;
    let label: string = "Confirm";
    let showContinueButton: boolean = false;

    function handleClick(index: number) {
        selectedIndex = index;

        if (timerRunning) {
            timerRunning = false;
            if (timer) clearInterval(timer);
            console.log(`⏱️ Time taken: ${timeElapsed} seconds`);
        } else {
            console.warn("Timer was not running!");
        }

        showContinueButton = true;
    }

    function goToResult() {
    if (selectedIndex !== null) {
        goto(`${base}/MoodScreen/MoodResponse?mood=${selectedIndex}`);
    } else {
        alert("Please select a mood first.");
    }
}

    function sendFeedback() {
        label = "You are feeling quite great currently!";
    }

    // Speech bubble messages
    let messages = [
        "I'm feeling overwhelmed",
        "Might need a break",
        "I'm indifferent",
        "I'm feeling good",
        "I'm very confident in making progress"
    ];

    let message_selection = "";
    let b_isMessageVisible = false;

    export function messageChanger(num: number) {
        message_selection = messages[num - 1] || "";
        b_isMessageVisible = true;
    }

    function messageVisToggle() {
        b_isMessageVisible = !b_isMessageVisible;
    }

    function handleSlide(event: Event) {
    const slider = event.target as HTMLInputElement;
    const value = Number(slider.value);

    const newIndex = Math.min(
        Math.floor((value / 100) * moodColors.length),
        moodColors.length - 1
    );

    if (newIndex !== selectedIndex) {
        selectedIndex = newIndex;
    }
	
}
</script>

<div class="wrapper">
    <div class="text">How are you feeling today?</div>

    <div class="cloud-bg" style="background-image: url({cloud});"></div>

    <div class="circle-container">
    {#each moodColors as color, index}
        <div class="circle-wrapper">
            <div
                class="circle {selectedIndex === index ? 'selected' : ''}"
                style="--hover-image: url({color});"
                on:click={() => handleClick(index)}
            ></div>

            {#if selectedIndex === index}
                <div class="speech-bubble">
                    <div class="box">{messages[index]}</div>
                    <div class="speech-arrow"></div>
                </div>
            {/if}
        </div>
    {/each}
</div>

    <div class="slider-container">
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue}
            on:input={handleSlide}
            class="slider"
        />
    </div>

    <button class="continueButton" on:click={goToResult}>Continue</button>
</div>

<button class="confirmButton" on:click={sendFeedback}>{label}</button>
<style>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: clamp(16px, 4vh, 40px);
    min-height: 100dvh; /* better for mobile */
    text-align: center;
    position: relative;
    padding-top: clamp(20px, 6vh, 60px);
}

/* === TITLE TEXT === */
.text {
    font-size: clamp(1.5rem, 2.5vw, 2.5rem);
    color: white;
    font-weight: 700;
    position: relative;
    margin-bottom: clamp(40px, 8vh, 110px);
    z-index: 2;
}

/* === CLOUD BACKGROUND === */
.cloud-bg {
    position: absolute;
    top: clamp(20%, 32vh, 42%);
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(250px, 40vw, 600px);
    aspect-ratio: 1 / 1; /* or use the actual ratio if you know it */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
}

/* === CIRCLE CONTAINER === */
.circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(10px, 3vw, 25px);
    margin-top: clamp(20px, 8vh, 70px);
}

/* === EACH CIRCLE WRAPPER === */
.circle-wrapper {
    position: relative;
    display: inline-block;
}

/* === CIRCLES === */
.circle {
    width: clamp(45px, 6vw, 75px);
    height: clamp(45px, 6vw, 75px);
    border-radius: 50%;
    background-image: var(--hover-image);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    transition: transform 0.15s ease, outline 0.15s ease;
}

.circle:hover {
    transform: scale(1.1);
}

.circle.selected {
    outline: 4px solid #ffffff;
    transform: scale(1.15);
}

/* === SPEECH BUBBLE === */
.speech-bubble {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: clamp(6px, 1vh, 12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
}

.speech-bubble .box {
    background: rgba(50, 50, 250, 0.8);
    color: white;
    padding: 0.5em 1em;
    border-radius: 0.4em;
    font-size: clamp(0.7rem, 1.3vw, 1rem);
    text-align: center;
    white-space: nowrap;
}

.speech-bubble .speech-arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(50, 50, 250, 0.8);
}

/* === SLIDER === */
.slider-container {
    width: clamp(240px, 40vw, 400px);
    display: flex;
    justify-content: center;
}

.slider {
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, 
        red 0%, red 20%, 
        orange 20%, orange 40%, 
        yellow 40%, yellow 60%,
        green 60%, green 80%,
        lightgreen 80%, lightgreen 100%
    );
    border-radius: 5px;
    outline: none;
}

.slider::-webkit-slider-thumb,
.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #888;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* === BUTTONS === */
.continueButton {
    margin-top: clamp(10px, 2vh, 20px);
    padding: 0.6em 2em;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0.4em;
    cursor: pointer;
    font-size: clamp(0.9rem, 1.3vw, 1.2rem);
}

.continueButton:hover {
    background-color: #45a049;
}

.confirmButton {
    margin-top: clamp(15px, 3vh, 30px);
    background: rgba(50, 50, 250, 0.507);
    padding: 0.5em 1.5em;
    border-radius: 0.3em;
    color: white;
    border: none;
    cursor: pointer;
    font-size: clamp(0.9rem, 1.3vw, 1.1rem);
}
</style>