<script lang="ts">
    // Props to receive the onClick handler from parent
    let { onEditClick } = $props<{ onEditClick?: () => void }>();
    // Simplified mood data with 4 main periods of the day
    let moodData = $state([
        { time: "MORNING", value: 3 },
        { time: "AFTERNOON", value: 2 },
        { time: "EVENING", value: 4 },
        { time: "NIGHT", value: 5 },
    ]);
</script>

<section class="mood-graph-card">
    <!-- Header with icons and title -->
    <div class="mood-header">
        <div class="header-icon alarm-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                    cx="20"
                    cy="22"
                    r="14"
                    stroke="#5B6B9F"
                    stroke-width="2.5"
                    fill="none"
                />
                <path
                    d="M20 22V14"
                    stroke="#5B6B9F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />
                <path
                    d="M20 22L25 25"
                    stroke="#5B6B9F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />
                <!-- Alarm bells -->
                <circle
                    cx="8"
                    cy="10"
                    r="4"
                    stroke="#5B6B9F"
                    stroke-width="2"
                    fill="none"
                />
                <circle
                    cx="32"
                    cy="10"
                    r="4"
                    stroke="#5B6B9F"
                    stroke-width="2"
                    fill="none"
                />
                <path
                    d="M8 6 L10 4"
                    stroke="#5B6B9F"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M32 6 L30 4"
                    stroke="#5B6B9F"
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
        </div>

        <h2 class="mood-title">TODAY'S MOOD TRACKER</h2>

        <div class="header-icon heart-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="#EF4444"
                    stroke="#DC2626"
                    stroke-width="2"
                />
                <path
                    d="M20 14 C20 11 17 9 14.5 11 C12 13 12 17 20 24 C28 17 28 13 25.5 11 C23 9 20 11 20 14 Z"
                    fill="white"
                />
            </svg>
        </div>
    </div>

    <!-- Graph container -->
    <div class="graph-container">
        <!-- Time labels at top -->
        <div class="time-labels-top">
            <div class="time-spacer"></div>
            {#each moodData as data}
                <div class="time-label-top">{data.time}</div>
            {/each}
        </div>

        <!-- Main graph area -->
        <div class="graph-main">
            <!-- Mood emoji scale on left -->
            <div class="mood-scale-left">
                {#each [5, 4, 3, 2, 1] as value}
                    <div class="mood-emoji">
                        {#if value === 5}
                            <svg width="44" height="44" viewBox="0 0 44 44">
                                <circle cx="22" cy="22" r="21" fill="#4ADE80" />
                                <circle
                                    cx="15"
                                    cy="18"
                                    r="2.5"
                                    fill="#15803D"
                                />
                                <circle
                                    cx="29"
                                    cy="18"
                                    r="2.5"
                                    fill="#15803D"
                                />
                                <path
                                    d="M 12 25 Q 22 32 32 25"
                                    stroke="#15803D"
                                    stroke-width="2.5"
                                    fill="none"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 4}
                            <svg width="44" height="44" viewBox="0 0 44 44">
                                <circle cx="22" cy="22" r="21" fill="#A3E635" />
                                <circle
                                    cx="15"
                                    cy="18"
                                    r="2.5"
                                    fill="#3F6212"
                                />
                                <circle
                                    cx="29"
                                    cy="18"
                                    r="2.5"
                                    fill="#3F6212"
                                />
                                <path
                                    d="M 14 26 Q 22 29 30 26"
                                    stroke="#3F6212"
                                    stroke-width="2.5"
                                    fill="none"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 3}
                            <svg width="44" height="44" viewBox="0 0 44 44">
                                <circle cx="22" cy="22" r="21" fill="#FDE047" />
                                <circle
                                    cx="15"
                                    cy="18"
                                    r="2.5"
                                    fill="#713F12"
                                />
                                <circle
                                    cx="29"
                                    cy="18"
                                    r="2.5"
                                    fill="#713F12"
                                />
                                <line
                                    x1="14"
                                    y1="28"
                                    x2="30"
                                    y2="28"
                                    stroke="#713F12"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 2}
                            <svg width="44" height="44" viewBox="0 0 44 44">
                                <circle cx="22" cy="22" r="21" fill="#FB923C" />
                                <circle
                                    cx="15"
                                    cy="18"
                                    r="2.5"
                                    fill="#7C2D12"
                                />
                                <circle
                                    cx="29"
                                    cy="18"
                                    r="2.5"
                                    fill="#7C2D12"
                                />
                                <path
                                    d="M 14 29 Q 22 27 30 29"
                                    stroke="#7C2D12"
                                    stroke-width="2.5"
                                    fill="none"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else}
                            <svg width="44" height="44" viewBox="0 0 44 44">
                                <circle cx="22" cy="22" r="21" fill="#F87171" />
                                <circle
                                    cx="15"
                                    cy="18"
                                    r="2.5"
                                    fill="#7F1D1D"
                                />
                                <circle
                                    cx="29"
                                    cy="18"
                                    r="2.5"
                                    fill="#7F1D1D"
                                />
                                <path
                                    d="M 14 30 Q 22 27 30 30"
                                    stroke="#7F1D1D"
                                    stroke-width="2.5"
                                    fill="none"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- Graph area with grid and line -->
            <div class="graph-area">
                <svg
                    class="mood-svg"
                    viewBox="0 0 600 400"
                    preserveAspectRatio="none"
                >
                    <!-- Dashed grid lines -->
                    {#each [0, 1, 2, 3, 4] as i}
                        <line
                            x1="0"
                            y1={i * 100 + 50}
                            x2="600"
                            y2={i * 100 + 50}
                            stroke="#E5E7EB"
                            stroke-width="1"
                            stroke-dasharray="8,8"
                        />
                    {/each}

                    <!-- Vertical axis line -->
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="400"
                        stroke="#9CA3AF"
                        stroke-width="2"
                    />

                    <!-- Horizontal axis line -->
                    <line
                        x1="0"
                        y1="400"
                        x2="600"
                        y2="400"
                        stroke="#9CA3AF"
                        stroke-width="2"
                    />

                    <!-- Mood line -->
                    <polyline
                        fill="none"
                        stroke="#A78BFA"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        points={moodData
                            .map((data, i) => {
                                const x = (i / (moodData.length - 1)) * 600;
                                const y =
                                    400 - ((data.value - 1) / 4) * 350 - 25;
                                return `${x},${y}`;
                            })
                            .join(" ")}
                    />

                    <!-- Data points -->
                    {#each moodData as data, i}
                        <circle
                            cx={(i / (moodData.length - 1)) * 600}
                            cy={400 - ((data.value - 1) / 4) * 350 - 25}
                            r="8"
                            fill="#A78BFA"
                            stroke="white"
                            stroke-width="3"
                        />
                    {/each}
                </svg>
            </div>
        </div>
    </div>
    <!-- Edit Button inside the card, matching todo section style -->
    <button onclick={onEditClick} class="edit-btn" style="margin-top: 1.5rem;">
        EDIT
    </button>
</section>

<style>
    .mood-graph-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        margin: 0 auto;
        max-width: 750px;
        margin-bottom: var(--spacing-lg);
    }

    .mood-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        gap: 16px;
    }

    .header-icon {
        flex-shrink: 0;
    }

    .mood-title {
        flex: 1;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: #6366f1;
        letter-spacing: 0.5px;
        margin: 0;
    }

    .graph-container {
        position: relative;
    }

    .time-labels-top {
        display: grid;
        grid-template-columns: 60px repeat(4, 1fr);
        gap: 8px;
        margin-bottom: 12px;
        padding: 0 8px;
    }

    .time-label-top {
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #8b5cf6;
        padding: 4px;
        letter-spacing: 0.3px;
    }

    .graph-main {
        display: flex;
        gap: 12px;
    }

    .mood-scale-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60px;
        padding: 8px 0;
    }

    .mood-emoji {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    }

    .mood-emoji svg {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .graph-area {
        flex: 1;
        position: relative;
        min-height: 320px;
        background: #fafafa;
        border-radius: 12px;
        padding: 8px;
    }

    .mood-svg {
        width: 100%;
        height: 100%;
        min-height: 300px;
    }

    .edit-btn {
        background: var(--color-edit-btn, #7dd3fc);
        color: white;
        font-size: var(--font-size-base, 1rem);
        font-weight: var(--font-weight-bold, 700);
        padding: var(--spacing-md, 1.5rem) var(--spacing-xl, 3rem);
        border-radius: var(--radius-md, 8px);
        width: 100%;
        box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
        border: none;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .edit-btn:hover {
        background: #38bdf8;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .mood-graph-card {
            padding: 16px;
            margin-bottom: var(--spacing-lg);
        }

        .mood-title {
            font-size: 16px;
        }

        .header-icon svg {
            width: 32px;
            height: 32px;
        }

        .time-labels-top {
            grid-template-columns: 50px repeat(4, 1fr);
            gap: 4px;
        }

        .time-label-top {
            font-size: 10px;
        }

        .mood-scale-left {
            width: 50px;
        }

        .mood-emoji svg {
            width: 36px;
            height: 36px;
        }

        .mood-emoji {
            height: 50px;
        }
    }
</style>
