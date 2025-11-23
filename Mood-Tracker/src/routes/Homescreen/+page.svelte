<script lang="ts">
	import PopupEnd from "../popupEnd.svelte";
	import MoodTracker from "./MoodTracker.svelte";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { tasksStore } from "$lib/stores/tasks.js";

	type Todo = {
		id: number;
		text: string;
		completed: boolean;
	};

	function OnClickNavigateMoodScreen() {
		goto(`${base}/MoodScreen`, { noScroll: false });
	}

	function OnClickNavigateTasksScreen() {
		goto(`${base}/TasksScreen`, { noScroll: false });
	}

	function OnClickNavigateBreathingScreen() {
		goto(`${base}/Breathingscreen`, { noScroll: false });
	}

	function OnClickNavigateYogaScreen() {
		goto(`${base}/YogaScreen`, {noScroll: false});
	}

	let todos = $state<Todo[]>([]);

	// Subscribe to the tasks store
	tasksStore.subscribe((value) => {
		todos = value;
	});

	function toggleTodo(id: number) {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo,
		);
		tasksStore.set(updatedTodos);
	}
</script>

<div class="page-container">
	<header class="page-header">
		<h1 class="page-title">Current Goal Project</h1>
	</header>

	<div class="content">
		<!-- Progress Bar Section -->
		<section class="progress-section">
			<div class="progress-header">
				<span class="progress-label">Total Progress</span>
				<span class="progress-percentage">75%</span>
			</div>
			<div class="progress-bar-wrapper">
				<div class="progress-bar" style="width: 75%"></div>
			</div>
		</section>

		<!-- Todo List Section -->
		<section class="todo-section">
			<h2 class="section-title">Today's To-do List</h2>
			<div class="todo-card">
				<ul class="todo-list">
					{#each todos as todo (todo.id)}
						<li class="todo-item">
							<span class:completed={todo.completed}
								>{todo.text}</span
							>
							<input
								type="checkbox"
								checked={todo.completed}
								onchange={() => toggleTodo(todo.id)}
								aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
							/>
						</li>
					{/each}
				</ul>
				<button onclick={OnClickNavigateTasksScreen} class="edit-btn" style="margin-top: 1.5rem;">
                EDIT
            </button>
			</div>
		</section>

		<!-- NEW: Simplified Daily Mood Tracker Component -->
		<MoodTracker onEditClick={OnClickNavigateMoodScreen}/>

		<!-- Mindfulness Exercises Section -->
		<section class="mindfulness-section">
			<h2 class="section-title">Mindfulness Exercises</h2>

			<button
				onclick={OnClickNavigateBreathingScreen}
				class="exercise-card breathing-card"
			>
				<div class="exercise-icon"></div>
				<span class="exercise-text">BREATHING TECHNIQUES</span>
				<div class="exercise-arrow">➜</div>
			</button>

			<button onclick={OnClickNavigateYogaScreen} class="exercise-card yoga-card">
				<div class="exercise-icon"></div>
				<span class="exercise-text">YOGA EXERCISES</span>
				<div class="exercise-arrow">➜</div>
			</button>
		</section>
	</div>

	<PopupEnd></PopupEnd>
</div>

<style>
	.page-container {
		background: linear-gradient(180deg, #6366f1 0%, #818cf8 100%);
		padding-bottom: var(--spacing-xl);
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md);
		color: white;
	}

	.page-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: white;
		margin: 0;
	}

	.content {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--spacing-md);
	}

	/* Progress Section */
	.progress-section {
		margin-bottom: var(--spacing-lg);
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-sm);
		color: white;
	}

	.progress-label {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	.progress-percentage {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
	}

	.progress-bar-wrapper {
		background: rgba(255, 255, 255, 0.3);
		height: 60px;
		border-radius: var(--radius-sm);
		position: relative;
		overflow: hidden;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
	}

	.progress-bar {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.5) 0%,
			rgba(255, 255, 255, 0.8) 100%
		);
		height: 100%;
		transition: width 0.3s ease;
	}

	/* Todo Section */
	.todo-section {
		background: white;
		border-radius: var(--radius-xl);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-lg);
		margin-bottom: var(--spacing-lg);
	}

	.section-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		text-align: center;
		margin-bottom: var(--spacing-md);
		color: var(--color-text);
	}

	.todo-card {
		background: var(--color-card-bg);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
	}

	.todo-list {
		list-style: none;
		margin-bottom: var(--spacing-md);
	}

	.todo-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md) 0;
		border-bottom: 2px dotted var(--color-border);
		font-size: var(--font-size-lg);
	}

	.todo-item:last-child {
		border-bottom: none;
	}

	.todo-item span {
		flex: 1;
		color: var(--color-text);
	}

	.todo-item span.completed {
		text-decoration: line-through;
		color: var(--color-text-muted);
	}

	.todo-item input[type="checkbox"] {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}

	.edit-btn {
		background: var(--color-edit-btn);
		color: white;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		padding: var(--spacing-md) var(--spacing-xl);
		border-radius: var(--radius-md);
		width: 100%;
		box-shadow: var(--shadow-md);
		border: none;
		cursor: pointer;
	}

	.edit-btn:hover {
		background: #38bdf8;
	}

	/* Mindfulness Section */
	.mindfulness-section {
		background: white;
		border-radius: var(--radius-xl);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-lg);
	}

	.exercise-card {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		margin-bottom: var(--spacing-md);
		color: white;
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-base);
		border: none;
		cursor: pointer;
	}

	.exercise-card:last-child {
		margin-bottom: 0;
	}

	.breathing-card {
		background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
	}

	.breathing-card:hover {
		background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
	}

	.yoga-card {
		background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
	}

	.yoga-card:hover {
		background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
	}

	.exercise-icon {
		font-size: 2.5rem;
	}

	.exercise-text {
		flex: 1;
		text-align: center;
		letter-spacing: 1px;
	}

	.exercise-arrow {
		font-size: 1.5rem;
	}
</style>