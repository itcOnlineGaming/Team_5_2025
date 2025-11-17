<script lang="ts">
	import PopupEnd from "../popupEnd.svelte";
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

	let todos = $state<Todo[]>([]);

	// Subscribe to the tasks store
	tasksStore.subscribe((value) => {
		todos = value;
	});

	let moodData = $state([
		{ day: "MON", value: 3 },
		{ day: "TUE", value: 1 },
		{ day: "WED", value: 4 },
		{ day: "THU", value: 2 },
		{ day: "FRI", value: 5 },
		{ day: "SAT", value: 4 },
		{ day: "SUN", value: 5 },
	]);

	function toggleTodo(id: number) {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo,
		);
		tasksStore.set(updatedTodos);
	}

	// Get SVG for mood face based on value
	function getMoodFaceSVG(value: number): string {
		const faces = {
			1: `<svg viewBox="0 0 48 48" class="mood-face">
                    <circle cx="24" cy="24" r="22" fill="#EF4444" stroke="#DC2626" stroke-width="2"/>
                    <circle cx="16" cy="20" r="2.5" fill="#7F1D1D"/>
                    <circle cx="32" cy="20" r="2.5" fill="#7F1D1D"/>
                    <path d="M 14 32 Q 24 28 34 32" stroke="#7F1D1D" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 12 20 L 16 18" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M 36 20 L 32 18" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`,
			2: `<svg viewBox="0 0 48 48" class="mood-face">
                    <circle cx="24" cy="24" r="22" fill="#FB923C" stroke="#F97316" stroke-width="2"/>
                    <circle cx="16" cy="20" r="2.5" fill="#7C2D12"/>
                    <circle cx="32" cy="20" r="2.5" fill="#7C2D12"/>
                    <path d="M 14 30 Q 24 28 34 30" stroke="#7C2D12" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </svg>`,
			3: `<svg viewBox="0 0 48 48" class="mood-face">
                    <circle cx="24" cy="24" r="22" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
                    <circle cx="16" cy="20" r="2.5" fill="#78350F"/>
                    <circle cx="32" cy="20" r="2.5" fill="#78350F"/>
                    <line x1="14" y1="30" x2="34" y2="30" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
                </svg>`,
			4: `<svg viewBox="0 0 48 48" class="mood-face">
                    <circle cx="24" cy="24" r="22" fill="#A3E635" stroke="#84CC16" stroke-width="2"/>
                    <circle cx="16" cy="20" r="2.5" fill="#365314"/>
                    <circle cx="32" cy="20" r="2.5" fill="#365314"/>
                    <path d="M 14 28 Q 24 32 34 28" stroke="#365314" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </svg>`,
			5: `<svg viewBox="0 0 48 48" class="mood-face">
                    <circle cx="24" cy="24" r="22" fill="#4ADE80" stroke="#22C55E" stroke-width="2"/>
                    <circle cx="16" cy="18" r="3" fill="#14532D"/>
                    <circle cx="32" cy="18" r="3" fill="#14532D"/>
                    <path d="M 12 26 Q 24 34 36 26" stroke="#14532D" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 14 18 Q 12 14 10 16" stroke="#14532D" stroke-width="2" fill="none" stroke-linecap="round"/>
                    <path d="M 34 18 Q 36 14 38 16" stroke="#14532D" stroke-width="2" fill="none" stroke-linecap="round"/>
                </svg>`,
		};
		return faces[value as keyof typeof faces] || faces[3];
	}

	// Calculate SVG path for mood graph
	function getMoodPath(): string {
		const width = 150;
		const height = 80;
		const paddingLeft = 0;
		const paddingRight = 0;
		const paddingTop = 5;
		const paddingBottom = 10;
		const maxMood = 5;
		const n = moodData.length;

		const points = moodData.map((data, i) => {
			const x =
				paddingLeft +
				(i * (width - paddingLeft - paddingRight)) / (n - 1);
			const y =
				paddingTop +
				((maxMood - data.value) / maxMood) *
					(height - paddingTop - paddingBottom);
			return `${x},${y}`;
		});

		return `M ${points.join(" L ")}`;
	}
</script>

<div class="page-container">
	<header class="page-header">
		<button class="back-btn" aria-label="Go back">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path
					d="M15 18L9 12L15 6"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<h1 class="page-title">Current Goal Project</h1>
		<button class="search-btn" aria-label="Search">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="11" cy="11" r="8" stroke="white" stroke-width="2" />
				<path
					d="M21 21L16.5 16.5"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</button>
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
				<button onclick={OnClickNavigateTasksScreen} class="edit-btn">
					EDIT ✏️
				</button>
			</div>
		</section>

		<!-- Mood Graph Section -->
		<section class="mood-graph-section">
			<div class="mood-header">
				<div class="mood-icon"></div>
				<h2 class="section-title">This Week's Mood Graph</h2>
				<button
					onclick={OnClickNavigateMoodScreen}
					class="add-mood-btn"
					aria-label="Add mood entry"
				>
				</button>
			</div>

			<div class="mood-chart">
				<!-- Emotion scale on the left -->
				<div class="mood-scale">
					{#each [5, 4, 3, 2, 1] as value}
						<div class="mood-emoji">
							{@html getMoodFaceSVG(value)}
						</div>
					{/each}
				</div>

				<!-- Graph area -->
				<div class="graph-area">
					<div class="svg-wrapper">
						<svg viewBox="0 0 100 60" class="mood-svg">
							<polyline
								fill="none"
								stroke="#8B5CF6"
								stroke-width="2"
								points={moodData
									.map((data, i) => {
										const x =
											(i * 100) / (moodData.length - 1);
										const y =
											10 + ((5 - data.value) / 4) * 40;
										return `${x},${y}`;
									})
									.join(" ")}
							/>
							{#each moodData as data, i}
								<circle
									cx={(i * 100) / (moodData.length - 1)}
									cy={10 + ((5 - data.value) / 4) * 40}
									r="5"
									fill="#8B5CF6"
									stroke="#fff"
									stroke-width="2"
								/>
							{/each}
						</svg>
						<div class="day-labels-grid">
							{#each moodData as data, i}
								<span
									class="day-label"
									style="grid-column: {i + 1}"
									>{data.day}</span
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>

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

			<button class="exercise-card yoga-card">
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
		min-height: 100vh;
		background: linear-gradient(180deg, #6366f1 0%, #818cf8 100%);
		padding-bottom: var(--spacing-xl);
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md);
		color: white;
	}

	.back-btn,
	.search-btn {
		background: transparent;
		padding: var(--spacing-xs);
		display: flex;
		align-items: center;
		justify-content: center;
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
	}

	.edit-btn:hover {
		background: #38bdf8;
	}

	/* Mood Graph Section */
	.mood-graph-section {
		background: white;
		border-radius: var(--radius-xl);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-lg);
		margin-bottom: var(--spacing-lg);
	}

	.mood-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-md);
	}

	.mood-icon {
		font-size: 2rem;
	}

	.add-mood-btn {
		background: transparent;
		font-size: 1.5rem;
		padding: var(--spacing-xs);
	}

	.mood-chart {
		display: flex;
		gap: var(--spacing-md);
	}

	.mood-scale {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: var(--spacing-sm) 0;
	}

	.mood-emoji {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.mood-face) {
		width: 36px;
		height: 36px;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.graph-area {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.mood-svg {
		width: 100%;
		height: 150px;
	}

	.day-label {
		font-size: var(--font-size-sm);
		color: #8b5cf6;
		font-weight: var(--font-weight-semibold);
		text-align: center;
		flex: 1;
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

	.svg-wrapper {
		position: relative;
		width: 100%;
		overflow: visible;
		margin: 0;
		padding: 0;
	}

	.mood-svg {
		width: 100%;
		height: 150px;
		display: block;
		margin: 0;
		padding: 0;
	}

	.day-labels-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		padding: 0;
		pointer-events: none;
	}

	.day-label {
		text-align: center;
		color: #8b5cf6;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		padding-top: 8px;
		margin: 0;
	}
</style>
