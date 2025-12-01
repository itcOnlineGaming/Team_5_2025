# Mood Tracker App

> A wellness application for tracking mood, managing tasks, and accessing mindfulness exercises.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Component Documentation](#component-documentation)
- [Store Documentation](#store-documentation)

---

## Overview

The Mood Tracker App is a comprehensive wellness application designed to help users:
- Track their emotional state throughout the day
- Manage daily tasks and monitor productivity
- Visualize progress through interactive charts
- Access guided breathing and yoga exercises

The app combines mood tracking with task management to provide a holistic view of daily well-being, helping users identify patterns between their emotional state and productivity.

### Key Highlights
- **Real-time visualizations** - See your progress with beautiful interactive graphs
- **Automatic data persistence** - All data saved to localStorage, no backend required
- **Fully responsive** - Works seamlessly on mobile, tablet, and desktop
- **Accessible** - WCAG 2.1 Level AA compliant
- **Fast & lightweight** - Built with modern web technologies

---

## Features

### Mood Tracking
- Log mood on a 1-5 scale throughout the day
- View mood progression on 24-hour timeline graph
- Emoji indicators for each mood level
- Filter moods by current day

### Task Management
- Create, edit, and delete daily tasks
- Toggle task completion with checkboxes
- Visual progress indicators
- Persistent task data across sessions

### Progress Visualization
- **Progress Journey**: Combined view of task completion and mood scores
- **Mood Tracker Graph**: Smooth line graph showing mood changes over 24 hours
- **Task Progress Bar**: Simple percentage indicator of daily completion
- Real-time updates as data changes

### Mindfulness Exercises
- Guided breathing techniques
- Yoga exercise routines
- Visual animations and instructions

### Data Persistence
- Automatic saving to browser localStorage
- No account or backend required
- Privacy-focused (all data stays on device)

---

## 🛠 Tech Stack

### Frontend Framework
- **SvelteKit** 2.x - Meta-framework for Svelte
- **Svelte** 5.x - Reactive UI component framework
- **TypeScript** 5.x - Type-safe JavaScript

### Styling
- **CSS3** - Custom styling with CSS variables
- **Tailwind CSS** (optional/partial) - Utility-first CSS framework

### Data Management
- **Svelte Stores** - Reactive state management
- **localStorage API** - Client-side data persistence

### Build Tools
- **Vite** - Fast build tool and dev server
- **SvelteKit Adapter** - Deployment adapter
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Testing
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

---

## 🏗 Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────┐
│           User Interface (Svelte)           │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐ │
│  │Homescreen │  │MoodScreen│  │Breathing │ │
│  └─────┬─────┘  └────┬─────┘  └────┬─────┘ │
│        │             │              │       │
└────────┼─────────────┼──────────────┼───────┘
         │             │              │
         └─────────────┴──────────────┘
                       │
         ┌─────────────┴─────────────┐
         │    Svelte Stores (State)  │
         │  ┌──────────────────────┐ │
         │  │  moodEntries Store   │ │
         │  │  tasksStore          │ │
         │  └──────────────────────┘ │
         └─────────────┬─────────────┘
                       │
         ┌─────────────┴─────────────┐
         │  localStorage (Persistence)│
         │  ┌──────────────────────┐ │
         │  │  'moodEntries': []   │ │
         │  │  'tasks': []         │ │
         │  └──────────────────────┘ │
         └───────────────────────────┘
```

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   └── Navigation
├── Homescreen (Route: /)
│   ├── ProgressJourney
│   ├── ProgressIndicator
│   ├── MoodTracker
│   ├── TodoList
│   │   └── TasksModal
│   └── MindfulnessCards
├── MoodScreen (Route: /MoodScreen)
│   └── MoodSelector
├── BreathingScreen (Route: /Breathingscreen)
│   └── BreathingExercise
└── YogaScreen (Route: /YogaScreen)
    └── YogaExercise
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **pnpm** (v8.x or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mood-tracker.git
cd mood-tracker
```

2. **Install dependencies**

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

3. **Set up environment variables** (if needed)

```bash
cp .env.example .env
```

Edit `.env` with your configuration (if applicable).

### Running Locally

Start the development server:

```bash
npm run dev
```

Or with custom port:

```bash
npm run dev -- --port 3000
```

The app will be available at:
- **Local**: http://localhost:5173
- **Network**: http://192.168.x.x:5173

### Building for Production

1. **Create production build**

```bash
npm run build
```

2. **Preview production build**

```bash
npm run preview
```

3. **Run linting**

```bash
npm run lint
```

4. **Format code**

```bash
npm run format
```

---

## 📁 Project Structure

```
mood-tracker/
├── src/
│   ├── lib/
│   │   ├── assets/          # Images, icons, SVGs
│   │   │   ├── GreenMood.png
│   │   │   ├── RedMood.png
│   │   │   └── ...
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.svelte
│   │   │   └── Navigation.svelte
│   │   └── stores/          # Svelte stores
│   │       ├── moods.ts     # Mood entries store
│   │       └── tasks.ts     # Tasks store
│   ├── routes/              # SvelteKit routes
│   │   ├── +layout.svelte   # Root layout
│   │   ├── +page.svelte     # Homescreen (/)
│   │   ├── Homescreen/      # Homescreen components
│   │   │   ├── ProgressJourney.svelte
│   │   │   ├── ProgressIndicator.svelte
│   │   │   ├── MoodTracker.svelte
│   │   │   ├── TodoList.svelte
│   │   │   └── TasksModal.svelte
│   │   ├── MoodScreen/
│   │   │   └── +page.svelte
│   │   ├── Breathingscreen/
│   │   │   └── +page.svelte
│   │   └── YogaScreen/
│   │       └── +page.svelte
│   ├── app.html             # HTML template
│   ├── app.css              # Global styles
│   └── app.d.ts             # TypeScript declarations
├── static/                  # Static assets
│   ├── favicon.png
│   └── ...
├── tests/                   # Test files
│   ├── unit/
│   └── e2e/
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── svelte.config.js         # SvelteKit configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md
```

### Key Directories

- **`src/lib/stores/`** - Centralized state management with Svelte stores
- **`src/routes/`** - File-based routing (SvelteKit convention)
- **`src/lib/assets/`** - Images and static assets imported in components
- **`static/`** - Public files served as-is (favicon, robots.txt, etc.)

---

## 🔄 Data Flow

### Overview

The app uses a **unidirectional data flow** pattern with Svelte stores as the single source of truth.

```
User Action → Component Event Handler → Store Update → localStorage Save → Component Re-render
```

### Detailed Flow

#### 1. Mood Tracking Flow

```
┌────────────────────────────────────────────────────────────┐
│ User logs mood on MoodScreen                               │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ MoodSelector.on:click → moodEntries.update()               │
│   - Adds: { mood: number, timestamp: Date.now() }         │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ moodEntries store triggers subscribers                     │
│   - Saves to localStorage('moodEntries')                   │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ Components reactively update:                              │
│   - MoodTracker (graph updates)                            │
│   - ProgressJourney (combined score recalculates)          │
│   - ProgressIndicator (encouragement message updates)      │
└────────────────────────────────────────────────────────────┘
```

#### 2. Task Management Flow

```
┌────────────────────────────────────────────────────────────┐
│ User adds/edits/deletes task in TasksModal                 │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ Modal calls tasksStore.update()                            │
│   - Add: [...tasks, { id, text, completed: false }]       │
│   - Edit: tasks.map(t => t.id === id ? {...t, text} : t)  │
│   - Delete: tasks.filter(t => t.id !== id)                │
│   - Toggle: tasks.map(t => t.id === id ?                  │
│              {...t, completed: !t.completed} : t)          │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ tasksStore triggers subscribers                            │
│   - Saves to localStorage('tasks')                         │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ Components reactively update:                              │
│   - TodoList (task list updates)                           │
│   - TaskProgressBar (percentage recalculates)              │
│   - ProgressJourney (combined score recalculates)          │
└────────────────────────────────────────────────────────────┘
```

#### 3. Combined Progress Calculation

```typescript
// ProgressJourney combines both stores
const journeyData = derived(
  [moodEntries, tasksStore],
  ([$moods, $tasks]) => {
    // Get today's moods
    const todaysMoods = getTodaysMoods($moods);
    
    // Calculate average mood (1-5 → 0-100%)
    const avgMood = todaysMoods.length > 0
      ? todaysMoods.reduce((sum, entry) => sum + entry.mood, 0) / todaysMoods.length
      : 1;
    const moodScore = ((avgMood - 1) / 4) * 100;
    
    // Calculate task completion
    const taskProgress = $tasks.length > 0
      ? ($tasks.filter(t => t.completed).length / $tasks.length) * 100
      : 0;
    
    return { taskProgress, moodScore };
  }
);
```

### State Persistence

All state automatically persists to localStorage:

```typescript
// Automatic persistence in store
moodEntries.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('moodEntries', JSON.stringify(value));
  }
});

// Load on initialization
const stored = typeof window !== 'undefined' 
  ? localStorage.getItem('moodEntries')
  : null;
const initial = stored ? JSON.parse(stored) : [];
```

---

## 📦 Component Documentation

### Core Components

#### ProgressJourney
**Location:** `src/routes/Homescreen/ProgressJourney.svelte`

**Purpose:** Visualizes combined mood and task progress as a journey from start to goal.

**Props:** None (reads from stores)

**Features:**
- Smooth Bézier curve animation
- Dynamic color based on progress (red/orange/blue/green)
- "You Are Here" indicator with pulsing animation
- Encouragement messages based on score

**Dependencies:**
- `moodEntries` store
- `tasksStore` store

**Example Usage:**
```svelte
<ProgressJourney />
```

---

#### MoodTracker
**Location:** `src/routes/Homescreen/MoodTracker.svelte`

**Purpose:** Displays 24-hour timeline graph of mood entries.

**Props:**
```typescript
export let onEditClick: () => void = () => {};
```

**Features:**
- Smooth curve connecting mood points
- Time labels on each data point
- Emoji scale on Y-axis
- "ADD MOOD" button navigation

**Dependencies:**
- `moodEntries` store
- `getTodaysMoods()` helper

**Example Usage:**
```svelte
<MoodTracker onEditClick={() => goto('/MoodScreen')} />
```

---

#### TodoList
**Location:** `src/routes/Homescreen/TodoList.svelte`

**Purpose:** Displays task list with completion checkboxes.

**Props:** None

**Features:**
- Interactive checkboxes
- Strikethrough for completed tasks
- Opens TasksModal for editing

**Dependencies:**
- `tasksStore` store
- `TasksModal` component

**Example Usage:**
```svelte
<TodoList />
```

---

#### TasksModal
**Location:** `src/routes/Homescreen/TasksModal.svelte`

**Purpose:** Full CRUD interface for task management.

**Props:**
```typescript
export let isOpen: boolean = $bindable(false);
```

**Features:**
- Add new tasks
- Edit task text inline
- Delete tasks with confirmation
- Toggle completion
- Auto-saves all changes

**Dependencies:**
- `tasksStore` store

**Example Usage:**
```svelte
<script>
  let modalOpen = false;
</script>

<button on:click={() => modalOpen = true}>EDIT TASKS</button>
<TasksModal bind:isOpen={modalOpen} />
```

---

## 🗄 Store Documentation

### moodEntries Store
**Location:** `src/lib/stores/moods.ts`

**Type Definition:**
```typescript
interface MoodEntry {
  mood: number;      // 1-5 scale
  timestamp: number; // Unix timestamp in milliseconds
}

const moodEntries: Writable<MoodEntry[]>;
```

**Methods:**
```typescript
// Add a mood entry
moodEntries.update(entries => [...entries, {
  mood: 4,
  timestamp: Date.now()
}]);

// Get today's moods
const todaysMoods = getTodaysMoods($moodEntries);
```

**Helper Functions:**
```typescript
function getTodaysMoods(entries: MoodEntry[]): MoodEntry[] {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfDay = startOfDay + 86400000; // +24 hours
  
  return entries.filter(entry => 
    entry.timestamp >= startOfDay && entry.timestamp < endOfDay
  );
}
```

**localStorage Key:** `'moodEntries'`

---

### tasksStore
**Location:** `src/lib/stores/tasks.ts`

**Type Definition:**
```typescript
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const tasksStore: Writable<Task[]>;
```

**Methods:**
```typescript
// Add task
tasksStore.update(tasks => [...tasks, {
  id: Date.now(),
  text: 'New task',
  completed: false
}]);

// Toggle task
tasksStore.update(tasks => 
  tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t)
);

// Delete task
tasksStore.update(tasks => tasks.filter(t => t.id !== id));

// Edit task text
tasksStore.update(tasks =>
  tasks.map(t => t.id === id ? {...t, text: newText} : t)
);
```

**localStorage Key:** `'tasks'` (or similar)

---