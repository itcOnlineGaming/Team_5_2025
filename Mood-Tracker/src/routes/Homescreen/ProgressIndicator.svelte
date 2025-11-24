<script lang="ts">
  import { tasksStore } from '$lib/stores/tasks';
  import { mood } from '$lib/stores/moods';
  import { derived } from 'svelte/store';

  // Calculate task completion percentage
  const taskProgress = derived(tasksStore, ($tasks) => {
    if ($tasks.length === 0) return 0;
    const completedTasks = $tasks.filter(task => task.completed).length;
    return (completedTasks / $tasks.length) * 100;
  });

  // Calculate average mood for the day (1-5 scale converted to percentage)
  const moodProgress = derived(mood, ($mood) => {
    const validMoods = $mood.filter((m: number | null) => m !== null) as number[];
    if (validMoods.length === 0) return 0;
    
    const avgMood = validMoods.reduce((sum: number, m: number) => sum + m, 0) / validMoods.length;
    // Convert mood (1-5) to percentage (0-100)
    return ((avgMood - 1) / 4) * 100;
  });

  // Combined progress: average of task completion and mood
  const combinedProgress = derived(
    [taskProgress, moodProgress],
    ([$taskProgress, $moodProgress]) => {
      return ($taskProgress + $moodProgress) / 2;
    }
  );

  // Generate path for the progress line
  function generateProgressPath(progress: number): string {
    const width = 600;
    const height = 300;
    const segments = 5; // Number of segments in the line
    
    // Calculate target height based on progress
    const targetY = height - (progress / 100) * (height - 50);
    
    // Create waypoints with natural curve progression
    const points: [number, number][] = [];
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      // Create an S-curve-like progression
      const progressPoint = Math.pow(i / segments, 1.2) * progress;
      const y = height - (progressPoint / 100) * (height - 50);
      points.push([x, y]);
    }
    
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  }

  // Calculate flag position
  function getFlagPosition(progress: number): { x: number; y: number } {
    const width = 600;
    const height = 300;
    const progressPoint = Math.pow(1, 1.2) * progress;
    return {
      x: width,
      y: height - (progressPoint / 100) * (height - 50)
    };
  }
</script>

<div class="progress-container">
  <div class="progress-card">
    <svg viewBox="0 0 600 300" class="progress-svg">
      <!-- Background gradient -->
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#E0E7FF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F8FAFC;stop-opacity:1" />
        </linearGradient>
        
        <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#6366F1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="600" height="300" fill="url(#skyGradient)" />
      
      <!-- Grid lines (subtle) -->
      {#each [0, 1, 2, 3, 4] as i}
        <line 
          x1="0" 
          y1={60 + i * 60} 
          x2="600" 
          y2={60 + i * 60} 
          stroke="#CBD5E1" 
          stroke-width="1" 
          stroke-dasharray="4,4"
          opacity="0.4"
        />
      {/each}
      
      <!-- Progress line -->
      <polyline
        points={generateProgressPath($combinedProgress)}
        fill="none"
        stroke="url(#lineGradient)"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="progress-line"
      />
      
      <!-- Flag at the end -->
      <g transform="translate({getFlagPosition($combinedProgress).x}, {getFlagPosition($combinedProgress).y})">
        <!-- Flag pole -->
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#DC2626" stroke-width="3" />
        
        <!-- Flag -->
        <path 
          d="M 0,-40 L 35,-35 L 35,-25 L 0,-20 Z" 
          fill="#DC2626"
          class="flag"
        />
      </g>
      
      <!-- "You Are Here" text with background -->
      <g transform="translate({getFlagPosition($combinedProgress).x - 90}, {getFlagPosition($combinedProgress).y - 70})">
        <!-- Background box -->
        <rect 
          x="0" 
          y="0" 
          width="140" 
          height="35" 
          rx="8" 
          fill="#6366F1" 
          opacity="0.95"
        />
        
        <!-- Text -->
        <text 
          x="70" 
          y="23" 
          text-anchor="middle" 
          fill="white" 
          font-size="16" 
          font-weight="600"
          font-family="system-ui, -apple-system, sans-serif"
        >
          You Are Here
        </text>
      </g>
      
      <!-- Arrow pointing to flag -->
      <g transform="translate({getFlagPosition($combinedProgress).x - 50}, {getFlagPosition($combinedProgress).y - 40})">
        <path 
          d="M 0,0 L 35,20 L 30,15 L 40,20 L 35,10 L 30,15 Z" 
          fill="#6366F1" 
          opacity="0.9"
        />
      </g>
      
      <!-- Starting point marker -->
      <circle cx="0" cy="300" r="8" fill="#8B5CF6" stroke="white" stroke-width="3" />
    </svg>
    
    <!-- Progress stats -->
    <div class="stats-container">
      <div class="stat-item">
        <span class="stat-label">Tasks Complete:</span>
        <span class="stat-value">{Math.round($taskProgress)}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Average Mood:</span>
        <span class="stat-value">{Math.round($moodProgress)}%</span>
      </div>
      <div class="stat-item highlight">
        <span class="stat-label">Overall Progress:</span>
        <span class="stat-value">{Math.round($combinedProgress)}%</span>
      </div>
    </div>
  </div>
</div>

<style>
  .progress-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 2rem;
  }

  .progress-card {
    background: white;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .progress-svg {
    width: 100%;
    height: auto;
    border-radius: 12px;
    overflow: visible;
  }

  .progress-line {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .flag {
    animation: wave 2s ease-in-out infinite;
    transform-origin: left center;
  }

  @keyframes wave {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    75% {
      transform: rotate(5deg);
    }
  }

  .stats-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 2px solid #E5E7EB;
    gap: 16px;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: #6B7280;
    font-weight: 500;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #6366F1;
  }

  .stat-item.highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 12px 24px;
    border-radius: 12px;
  }

  .stat-item.highlight .stat-label {
    color: rgba(255, 255, 255, 0.9);
  }

  .stat-item.highlight .stat-value {
    color: white;
    font-size: 28px;
  }

  @media (max-width: 640px) {
    .progress-card {
      padding: 16px;
    }

    .stats-container {
      flex-direction: column;
      gap: 12px;
    }

    .stat-item {
      width: 100%;
      padding: 12px;
      background: #F9FAFB;
      border-radius: 8px;
    }

    .stat-item.highlight {
      order: -1;
    }
  }
</style>