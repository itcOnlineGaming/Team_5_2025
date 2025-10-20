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

    let num: number = 1;
    // Change what output text will  be 
    function messageChanger(num: number)
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

    // Message Position
    function message_position()
    {

    }

    // Message Visibility
    let b_isMessageVisible = true;
    function messageVisToggle()
    {
        b_isMessageVisible = !b_isMessageVisible;
    }
</script>

<!-- Check if we are able to show the message with a bool -->
{#if b_isMessageVisible == true}
    <div class="box">{message_5}</div>
{/if}

<style>
	.box 
    {
		width: 10em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
        padding: 1em;
		background-color: #5964c9;
        font-family: arial;
        text-align: center;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: visible;
	}
</style>