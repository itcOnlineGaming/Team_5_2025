<script lang="ts">
    import { goto } from "$app/navigation";
    import { tasksBreathingStore } from '$lib/stores/tasks.js';

    let number_input = 0;
    let b_isTriggerSet = false;

    // Which timer button was selected
    let selectedTime: number | null = null;

   function OnClickNavigateToBreathExerciseScreen() {
        if (b_isTriggerSet) {
            goto("/BreathingExerciseScreen", { noScroll: false });
        } else {
            console.log("Please select a timer first");
        }
        console.log("Start Exercise Clicked");
    }

    // Helper function to set timer and highlight button
    function setBreathingTime(minutes: number) {
        number_input = minutes;
        b_isTriggerSet = true;
        selectedTime = minutes;

        tasksBreathingStore.set({
            timer_number: minutes,
            b_isTriggered: true
        });
        console.log(`Selected ${minutes} minute timer`);
    }

    function OnClickAdd3Minutes()
    { 
        setBreathingTime(3);
    }
    function OnClickAdd2Minutes() 
    { 
        setBreathingTime(2); 
    }
    function OnClickAdd5Minutes() 
    { 
        setBreathingTime(5); 
    }
</script>

<!--HTML stuff -->
<h1 class="title">Breathing Selection Screen</h1>

<section class="breathing-screen-section">
    <button 
        class="breathing-timer-btn {selectedTime === 3 ? 'selected' : ''}" 
        on:click={OnClickAdd3Minutes}>
        3 Minute Exercise (recommended)
    </button>

    <button 
        class="breathing-timer-btn {selectedTime === 2 ? 'selected' : ''}" 
        on:click={OnClickAdd2Minutes}>
        2 Minute Exercise
    </button>

    <button 
        class="breathing-timer-btn {selectedTime === 5 ? 'selected' : ''}" 
        on:click={OnClickAdd5Minutes}>
        5 Minute Exercise
    </button>
</section>

<section class="breathing-screen-section">
    <button class="breathing-start-btn" on:click={OnClickNavigateToBreathExerciseScreen}>
        START EXERCISE 😮‍💨
    </button>
</section>


<p class="instruction-text">Please select the duration to start</p>
