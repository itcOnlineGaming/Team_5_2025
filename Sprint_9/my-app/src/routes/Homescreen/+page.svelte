<script lang="ts">
	import { onMount } from 'svelte';
	import PopupEnd from '../popupEnd.svelte';
	import { goto } from "$app/navigation";

	function OnClickNavigateMoodScreen()
    {
        goto("/MoodScreen", {noScroll:false});
    }
	
	let todos = $state([
		{ id: 1, text: 'Finish Concepts', completed: false },
		{ id: 2, text: 'Finish Concepts', completed: false },
		{ id: 3, text: 'Finish Concepts', completed: false }
	]);
	let moodData = $state([
		{ day: 'MON', value: 3 },
		{ day: 'TUE', value: 1 },
		{ day: 'WED', value: 4 },
		{ day: 'THU', value: 2 },
		{ day: 'FRI', value: 5 },
		{ day: 'SAT', value: 5 },
		{ day: 'SUN', value: 5 }
	]);

	function toggleTodo(id: number) {
		const todo = todos.find(t => t.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
	}

	function editTodoList() {
		console.log('Edit todo list');
	}

	function editMoodGraph() {
		console.log('Edit mood graph');
	}

	function addIcon() {
		console.log('Add icon');
	}

	// Calculate SVG path for mood graph
	function getMoodPath() {
		const width = 280;
		const height = 150;
		const padding = 20;
		const maxMood = 5;
		
		const points = moodData.map((data, i) => {
			const x = padding + (i * (width - 2 * padding)) / (moodData.length - 1);
			const y = height - padding - ((data.value / maxMood) * (height - 2 * padding));
			return `${x},${y}`;
		});
		
		return `M ${points.join(' L ')}`;
	}
</script>

<div class="container">
	<h1 class="title">Home Screen</h1>

	<!-- Todo List Section -->
	<section class="todo-section">
		<h2>Today's To-do List</h2>
		<ul class="todo-list">
			{#each todos as todo (todo.id)}
				<li class="todo-item">
					<span class:completed={todo.completed}>{todo.text}</span>
					<input 
						type="checkbox" 
						checked={todo.completed}
						onchange={() => toggleTodo(todo.id)}
						aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
					/>
				</li>
			{/each}
		</ul>
		<button onclick={editTodoList} class="edit-btn">
			EDIT ✏️
		</button>
	</section>

	<!-- Mood Graph Section -->
	<section class="mood-section">
		<div class="mood-header">
			<h2>THIS WEEKS MOOD GRAPH</h2>
			<button onclick={addIcon} class="add-icon-btn" aria-label="Add icon">
				ADD ICON
			</button>
		</div>
		
		<div class="mood-graph">
			<!-- Mood emoji scale -->
			<div class="mood-scale">
				<div class="mood-emoji" title="Very Happy">😊</div>
				<div class="mood-emoji" title="Happy">🙂</div>
				<div class="mood-emoji" title="Neutral">😐</div>
				<div class="mood-emoji" title="Sad">🙁</div>
				<div class="mood-emoji" title="Very Sad">😢</div>
			</div>

			<!-- Graph -->
			<svg viewBox="0 0 300 170" class="graph-svg">
				<!-- Day labels -->
				{#each moodData as data, i}
					<text 
						x={20 + (i * 260) / (moodData.length - 1)} 
						y="165" 
						class="day-label"
						text-anchor="middle"
					>
						{data.day}
					</text>
				{/each}

				<!-- Mood line -->
				<path 
					d={getMoodPath()} 
					class="mood-line"
					fill="none"
					stroke="#8B5CF6"
					stroke-width="3"
				/>

				<!-- Data points -->
				{#each moodData as data, i}
					<circle 
						cx={20 + (i * 260) / (moodData.length - 1)} 
						cy={150 - 20 - ((data.value / 5) * 110)}
						r="5" 
						class="mood-point"
						fill="#8B5CF6"
					/>
				{/each}
			</svg>
		</div>

		<button onclick={OnClickNavigateMoodScreen} class="edit-btn">
			EDIT ✏️
		</button>
	</section>
	<PopupEnd></PopupEnd>
</div>