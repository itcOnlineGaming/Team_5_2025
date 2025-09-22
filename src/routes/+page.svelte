<script lang="ts">
    import { onMount } from 'svelte';
    let prompt = "Type to eat!";
    let input = "";
    let started = false;
    let finished = false;
    let startTime = 0;
    let endTime = 0;
    let streak = 3;

    function startTest() {
        input = "";
        started = true;
        finished = false;
        startTime = Date.now();
    }

    function checkInput() {
        if (input === prompt) {
            finished = true;
            endTime = Date.now();
            streak += 1;
        }
    }
</script>

<div class="room-bg">
    <div class="pet-area">
        <div class="pet-face"></div>
        <div class="thought-bubble">
            🍔
        </div>
    </div>
    <div class="table">
        <div class="plate"></div>
        <div class="glass"></div>
    </div>
    <div class="plant"></div>
</div>

<div class="typing-test">
    <div class="streak">
        <span>🔥 {streak} DAY STREAK</span>
    </div>
    <label for="typing-input">TYPE...</label>
    <input
        id="typing-input"
        type="text"
        bind:value={input}
        disabled={!started || finished}
        on:input={checkInput}
        placeholder="Type to eat!"
        autocomplete="off"
    />
    {#if !started}
        <button on:click={startTest}>Start</button>
    {:else if finished}
        <p>Done! Time: {(endTime - startTime) / 1000}s</p>
        <button on:click={startTest}>Try Again</button>
    {/if}
</div>

<style>
.room-bg {
    position: relative;
    width: 700px;
    height: 400px;
    background: #ffe6b3;
    border-radius: 24px;
    margin-top: 2rem;
    box-shadow: 0 4px 24px #0002;
}
.fridge {
    position: absolute;
    left: 40px;
    top: 60px;
    width: 120px;
    height: 200px;
    background: #eafaff;
    border-radius: 16px;
    box-shadow: 0 2px 8px #0001;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
.note {
    margin-top: 24px;
    background: #f7f7a7;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
}
.pet-area {
    position: absolute;
    left: 220px;
    top: 80px;
    display: flex;
    align-items: center;
}
.pet-face {
    width: 120px;
    height: 120px;
    background: #e0e0e0;
    border-radius: 50%;
    border: 2px solid #888;
    position: relative;
}
.pet-face::before, .pet-face::after {
    content: '';
    position: absolute;
    background: #222;
    border-radius: 50%;
}
.pet-face::before {
    width: 24px; height: 24px; left: 28px; top: 38px;
}
.pet-face::after {
    width: 24px; height: 24px; left: 68px; top: 38px;
}
</style>