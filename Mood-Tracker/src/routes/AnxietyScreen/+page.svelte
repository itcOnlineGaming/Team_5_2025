<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getRecentAnxietyLevel, markAnxietyFlowShown } from '$lib/stores/anxiety';
    import '../styles.css';

    let currentScreen = $state(0);
    let anxietyLevel = $state(0);

    const screens = [
        {
            message: "We've noticed you've been anxious more often recently",
            showNext: true
        },
        {
            message: "How about we try some grounding exercises?",
            subtitle: "Research shows grounding exercises effectively reduce test anxiety by 40%",
            showNext: true
        },
        {
            message: "Here's what we recommend",
            showRecommendation: true
        }
    ];

    onMount(() => {
        anxietyLevel = getRecentAnxietyLevel();
    });

    function nextScreen() {
        if (currentScreen < screens.length - 1) {
            currentScreen++;
        }
    }

    function startExercise() {
        markAnxietyFlowShown();
        goto('/BreathingExercise');
    }

    function skipForNow() {
        markAnxietyFlowShown();
        goto('/Homescreen');
    }
</script>

<div class="anxiety-flow-container">
    <div class="anxiety-screen">
        <div class="cloud cloud-top"></div>
        
        <div class="content-box">
            {#if screens[currentScreen].showRecommendation}
                <div class="recommendation-card">
                    <div class="exercise-header">
                        <div class="cloud-mascot">☁️</div>
                        <div class="exercise-title">5 Minute Breathing Exercise</div>
                    </div>
                    
                    <h3>Match your breathing to the pulse of the circles.</h3>
                    
                    <p class="exercise-description">
                        As it grows, breathe in, shrinks breathe out. 
                        This will help you ground yourself so you can take back 
                        control and get back on track to reach your goal!
                    </p>
                    
                    <button onclick={startExercise} class="btn-primary start-btn">
                        Start
                    </button>
                    <button onclick={skipForNow} class="btn-secondary skip-btn">
                        Skip for now
                    </button>
                </div>
            {:else}
                <h2 class="anxiety-message">{screens[currentScreen].message}</h2>
                
                {#if screens[currentScreen].subtitle}
                    <p class="anxiety-subtitle">{screens[currentScreen].subtitle}</p>
                {/if}
                
                {#if screens[currentScreen].showNext}
                    <button onclick={nextScreen} class="btn-primary next-btn">
                        Next
                    </button>
                {/if}
            {/if}
        </div>
        
        <div class="cloud cloud-bottom"></div>
    </div>
</div>

<style>
    .anxiety-flow-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .anxiety-screen {
        position: relative;
        max-width: 400px;
        width: 100%;
    }

    .content-box {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid white;
        border-radius: 16px;
        padding: 3rem 2rem;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    }

    .cloud {
        position: absolute;
        left: 0;
        width: 180px;
        height: 80px;
        background: white;
        border-radius: 100px;
    }

    .cloud::before,
    .cloud::after {
        content: '';
        position: absolute;
        background: white;
        border-radius: 50%;
    }

    .cloud::before {
        width: 100px;
        height: 100px;
        top: -50px;
        left: 20px;
    }

    .cloud::after {
        width: 120px;
        height: 120px;
        top: -60px;
        right: 20px;
    }

    .cloud-top {
        top: -40px;
    }

    .cloud-bottom {
        bottom: -40px;
        right: 0;
        left: auto;
    }

    .anxiety-message {
        color: white;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 300;
        margin: 0 0 2rem 0;
        line-height: 1.4;
    }

    .anxiety-subtitle {
        color: white;
        text-align: center;
        font-size: 1rem;
        margin: 0 0 2rem 0;
        opacity: 0.9;
    }

    .recommendation-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        width: 100%;
    }

    .exercise-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .cloud-mascot {
        font-size: 3rem;
    }

    .exercise-title {
        background: linear-gradient(to right, #F0ABFC, #DDD6FE);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        flex: 1;
    }

    .recommendation-card h3 {
        margin: 0 0 1rem 0;
        color: #1F2937;
    }

    .exercise-description {
        color: #6B7280;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .start-btn,
    .skip-btn,
    .next-btn {
        width: 100%;
        padding: 1rem;
        margin-bottom: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
    }

    .next-btn {
        max-width: 200px;
    }
</style>