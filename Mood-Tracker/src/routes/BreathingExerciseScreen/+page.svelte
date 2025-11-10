<script lang="ts">
    import { goto } from "$app/navigation";
    import { tasksBreathingStore } from '$lib/stores/tasks.js';
    import { get } from 'svelte/store';


    // Get the timer value from the tasks.js file
    const { timer_number, b_isTriggered } = get(tasksBreathingStore);
    //$: timer_number = $tasksBreathingStore.timer_number;
    let timer = timer_number;


    // Bool for the timer running
    let b_isTimerCounting = false;

    // Countdown timer
    function start_counting()
    {
        console.log("Start Timer Button Clicked");

        // Check if the timer is over
        if (b_isTimerCounting || timer <0)
        {
            // Stop
             console.log("Time is finished");
            return;
        }

        // If we haven't finished
        if (timer >= 0)
        {
            timer--;
            console.log("Time is: " + timer);
            setTimeout(start_counting, 1000);
        }
        else
        {
            b_isTimerCounting = false;
        }

        // Set the counting bool to true
        //b_isTimerCounting = true;

    }
    start_counting();

    function OnClickNavigateToHomescreen()
    {
        goto("/Homescreen", {noScroll:false});
        console.log("Confirm Button Clicked");
    }

</script>

<h1> Breathing Exercise Screen </h1>
<p>Timer: {timer_number}</p>

<!-- <button on:click={start_counting} disabled={b_isTimerCounting}>Start</button>  -->
<button on:click={OnClickNavigateToHomescreen}>Go back to Homescreen</button>

<style>
/*
Circle base, scaling circle
*/

</style>