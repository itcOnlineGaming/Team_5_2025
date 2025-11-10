<script lang="ts">
    import { goto } from "$app/navigation";
    import { tasksBreathingStore } from '$lib/stores/tasks.js';

    let number_input = 0;
    let b_isTriggerSet = false;

    function OnClickNavigateToBreathExerciseScreen()
    {
        // Check if the time has been inputted
        if (b_isTriggerSet == true)
        {
            goto("/BreathingExerciseScreen", {noScroll:false});
        }
        else
        {
            console.log("Bool NOT set");
        }

        //tasksBreathingStore.subscribe
        console.log("Confirm Button Clicked");
    }

    // Add timers
    function OnClickAdd3Minutes()
    {
        // Change number and bool
        number_input = 3;
        b_isTriggerSet = true;

        tasksBreathingStore.set({timer_number: number_input, b_isTriggered: b_isTriggerSet});
      //  tasksBreathingStore.update(current => ({
        //    number: number_input,
          //  b_isTriggered: b_isTriggerSet
        //}));
    }

    function OnClickAdd2Minutes()
    {
        // Change number and bool
        number_input = 2;
        b_isTriggerSet = true;

        tasksBreathingStore.set({timer_number: number_input, b_isTriggered: b_isTriggerSet});
        console.log("Confirm Button Clicked");
    }

    function OnClickAdd5Minutes()
    {
        // Change number and bool
        number_input = 5;
        b_isTriggerSet = true;

        tasksBreathingStore.set({timer_number: number_input, b_isTriggered: b_isTriggerSet});
        console.log("Confirm Button Clicked");
    }

</script>

<h1> Breathing Selection Screen </h1>

<button on:click={OnClickAdd3Minutes}>3 minute exercise (recomended)</button>

<button on:click={OnClickAdd2Minutes}>2 minute exercise</button>

<button on:click={OnClickAdd5Minutes}>5 minute exercise</button>

<button on:click={OnClickNavigateToBreathExerciseScreen}>Start Exercise</button>