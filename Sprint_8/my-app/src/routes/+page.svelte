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

<button class="confirmButtonID" on:click={sendFeedback}>
    {label}
</button>

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

	.confirmButtonID {
        background: rgba(50, 50, 250, 0.507);
    }
</style>
