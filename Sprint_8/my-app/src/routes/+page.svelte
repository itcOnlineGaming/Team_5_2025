<script lang="ts">
	const colors: string[] = ['red', 'orange', 'yellow', 'green', 'lightgreen'];
	let selectedIndex: number | null = null;

	function handleClick(index: number) {
		selectedIndex = index;
	}

	let label: string = "Confirm";

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
</style>
