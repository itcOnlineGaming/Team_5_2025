<script lang="ts">
    import { goto } from "$app/navigation";
    import { tasksBreathingStore } from '$lib/stores/tasks.js';

    // Temp value
    let timer = 100;
    // Get the timer value from the tasks.js file
    $: timer_number = $tasksBreathingStore.timer_number;
    timer = timer_number;

    // Bool for the timer running
    let b_isTimerCounting = false;

    // Countdown timer
    function start_counting()
    {
        // Check if the timer is over
        if (b_isTimerCounting == true || timer <0 == true)
        {
            // Stop
            return;
        }

        // Set the counting bool to true
        b_isTimerCounting = true;

    }

    function OnClickNavigateToHomescreen()
    {
        goto("/Homescreen", {noScroll:false});
        console.log("Confirm Button Clicked");
    }

</script>

<h1> Breathing Exercise Screen </h1>
<p>Timer: {timer_number}</p>

<button on:click={OnClickNavigateToHomescreen}>Go back to Homescreen</button>

<style>
/*
Circle base, scaling circle
*/

</style>