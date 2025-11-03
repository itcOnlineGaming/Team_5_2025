<script lang="ts">
    import { onMount } from "svelte";

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

	const colors: string[] = ['red', 'orange', 'yellow', 'green', 'lightgreen'];
	let selectedIndex: number | null = null;
	let sliderValue = 0;

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

    import { goto } from "$app/navigation";


	let label: string = "Confirm";
    let showContinueButton: boolean = false;

      function ToHomeScreen()
    {
        showContinueButton = false;
        console.log("Confirm Button Clicked");
        goto("/Homescreen", {noScroll:false});
    }

    function sendFeedback() {
        label = "You are feeling quite great currently!";
    };

	// Speech Bubble
	// 1 = most stressed, 5 = least stressed
    let message_1 = "I'm feeling overwhelmed";
    let message_2 = "Might need a break";
    let message_3 = "I'm indifferent";
    let message_4 = "I'm feeling good";
    let message_5 = "I'm very confident in making progress";

    let message_selection = "";

	let num: number = 1;
    // Change what output text will  be 
    export function messageChanger(num: number)
    {
        switch (num)
        {
            case 1:
                message_selection = message_1;
                break;
            case 2:
                message_selection = message_2;
                break;
            case 3:
                message_selection = message_3;
                break;
            case 4:
                message_selection = message_4;
                break;
            case 5:
                message_selection = message_5;
                break;
        }
    }

	// Message Position (add export in front for testing later)
    function message_position()
    {
		// Place under what Icon was selected
    }

    // Message Visibility (add export in front for testing later)
    let b_isMessageVisible = true;
    function messageVisToggle()
    {
        b_isMessageVisible = !b_isMessageVisible;
    }

	// Function to handle slider input from user
	function handleSlide(event: Event) {
    const slider = event.target as HTMLInputElement;
    const value = Number(slider.value);

	// Uncomment the line below to sync slider with selected circle
    selectedIndex = Math.floor((value / 100) * colors.length);
}
</script>

<div class="wrapper">
	<div class="text">How are you feeling today?</div>
	<div class="circle-container">
		{#each colors as color, index}
			<div
				class="circle {selectedIndex === index ? 'selected' : ''}"
				style="--hover-color: {color};"
				on:click={() => handleClick(index)}
			></div>
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

    <button class="continueButton" on:click={ToHomeScreen}>Continue</button>
</div>

<button class="confirmButton" on:click={sendFeedback}>
    {label}
</button>




<!-- Speech Bubble -->
{#if b_isMessageVisible == true}
    <div class="speech-bubble">
        <div class="box">
            {message_selection}
        </div>
	<div class="speech-arrow"></div>
</div>
{/if}

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
	}

	.text {
		font-size: 2rem;
		margin-bottom: 20px;
	}

	.circle-container {
		display: flex;
		gap: 16px;
	}

	.circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: grey;
		transition: background-color 0.3s ease;
		cursor: pointer;
	}

	.circle:not(.selected):hover {
		background-color: var(--hover-color);
	}

	.circle.selected {
		background-color: var(--hover-color);
	}

	.confirmButton {
        background: rgba(50, 50, 250, 0.507);
    }

	/* Container to hold triangle and box */
	.speech-bubble 
    {
		display: flex;
		flex-direction: column; /* puts triangle under the box */
		align-items: center;
	}

	/* Triangle below the box */
	.speech-arrow 
    {
		width: 0;
		height: 0;
		border-left: 1em solid transparent;
		border-right: 1em solid transparent;
		border-top: 1em solid #5964c9; 
	}

	/* Speech bubble box */
	.box 
    {
        display:none;
		width: 15em;
		min-height: 5em;
		border-radius: 0.5em;
		padding: 1em;
		background-color: #5964c9;
		color: white;
		font-family: Arial, sans-serif;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
	}

	.slider-container {
    width: 328px; /* Matches 5 circles (60px each) + 4 gaps (16px each) */
    margin-top: 20px;
}

.slider {
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, 
        red 0%, 
        red 20%, 
        orange 20%, 
        orange 40%, 
        yellow 40%, 
        yellow 60%,
        green 60%,
        green 80%,
        lightgreen 80%,
        lightgreen 100%
    );
    border-radius: 5px;
    outline: none;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #888;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #888;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}


.continueButton {
	margin-top: 1em;
	padding: 0.5em 1.5em;
	background-color: #4CAF50;
	color: white;
	border: none;
	border-radius: 0.3em;
	cursor: pointer;
	font-size: 1em;
}

.continueButton:hover {
	background-color: #45a049;
}
</style>
