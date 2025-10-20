<!-- Needs a position input from another function (where to be under Emotion Icon?)-->
<!-- Needs a Emotion State input from another function (changes what the message string will be)-->
<!-- Needs a Visible input from another function (where the message is set to visible or not)-->

<h1>Speech Bubbles</h1>

<script lang="ts">
    //type SpeechVisible = {
      //  label:
    //}

    // 1 = most stressed, 5 = least stressed
    let message_1 = "I'm feeling overwhelmed";
    let message_2 = "Might need a break";
    let message_3 = "I'm indifferent";
    let message_4 = "I'm feeling good";
    let message_5 = "I'm very confident in making progress";

    let message_selection = "";

    //message_selection = message_1; // for testing display

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

    }

    // Message Visibility (add export in front for testing later)
    let b_isMessageVisible = true;
    function messageVisToggle()
    {
        b_isMessageVisible = !b_isMessageVisible;
    }

	function handleClick(index: number) {
		selectedIndex = index;
	}

	let label: string = "Confirm";

    function sendFeedback() {
        label = "You are feeling quite great currently!";
    };
</script>


<!--- Test Button -->
<button class="testButton" on:click={sendFeedback}>
    {label}
</button>

<!-- Check if we are able to show the message with a bool -->
<!-- Needed to put the box and triangle into a container they sit under one another-->
{#if b_isMessageVisible == true}
    <div class="speech-bubble">
        <div class="box">
            {message_selection}
        </div>
	<div class="speech-arrow"></div>
</div>
{/if}


<!-- Speech bubble container -->
<button class="confirmButton" on:click={sendFeedback}>
    {label}
</button>

<style>
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
</style>

