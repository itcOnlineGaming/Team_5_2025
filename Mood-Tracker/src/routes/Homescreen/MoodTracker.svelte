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
            <svg
                width="62"
                height="59"
                viewBox="0 0 62 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    x1="32.7843"
                    y1="31.466"
                    x2="43.0993"
                    y2="20.6689"
                    stroke="#5A7ACC"
                    stroke-width="0.780901"
                    stroke-linecap="round"
                />
                <line
                    x1="35.0268"
                    y1="10.2514"
                    x2="32.0297"
                    y2="32.0843"
                    stroke="#5A7ACC"
                    stroke-width="1.5618"
                    stroke-linecap="round"
                />
                <path
                    d="M5.01593 15.6559C2.24571 12.9812 2.16825 8.56728 4.84291 5.79706C7.51757 3.02683 11.9315 2.94936 14.7017 5.62403L16.7081 7.56119L7.02231 17.5931L5.01593 15.6559Z"
                    fill="#5A7ACC"
                />
                <path
                    d="M56.9841 14.8746C59.7543 12.2 59.8318 7.78603 57.1571 5.01581C54.4824 2.24558 50.0685 2.16811 47.2983 4.84278L45.2919 6.77994L54.9777 16.8118L56.9841 14.8746Z"
                    fill="#5A7ACC"
                />
                <path
                    d="M22.9087 54.046C22.9656 55.9981 21.4293 57.6267 19.4772 57.6835C17.4848 57.7416 15.8382 56.1422 15.8382 54.149L15.8382 48.026L22.8654 52.5591L22.9087 54.046Z"
                    fill="#5A7ACC"
                />
                <path
                    d="M38.3412 54.5993C38.2971 56.549 39.8351 58.1686 41.7845 58.2254C43.7832 58.2835 45.4351 56.6791 45.4351 54.6794L45.4351 48.8057L38.4103 51.5388L38.3412 54.5993Z"
                    fill="#5A7ACC"
                />
                <circle cx="31.6004" cy="32.218" r="2.70582" fill="#5A7ACC" />
                <circle
                    cx="31.6257"
                    cy="30.0657"
                    r="23.3685"
                    stroke="#5A7ACC"
                    stroke-width="2.45984"
                />
            </svg>
        </div>

        <h2 class="mood-title">TODAY'S MOOD TRACKER</h2>

        <div class="header-icon heart-icon">
            <svg
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="23.5"
                    cy="23.5"
                    r="21.4386"
                    stroke="#FF0000"
                    stroke-width="4.12281"
                />
                <path
                    d="M31.624 14.124C32.9372 14.1632 34.4167 14.6982 36.0059 16.126C36.9472 16.9717 37.4606 17.8835 37.6611 18.8281C37.8626 19.7775 37.7547 20.793 37.4004 21.8506C36.6876 23.978 35.0006 26.206 33.0244 28.25C31.0557 30.2862 28.835 32.1053 27.1025 33.417C26.2374 34.072 25.4954 34.5988 24.9707 34.9619C24.7084 35.1434 24.4995 35.2841 24.3574 35.3789C24.353 35.3819 24.348 35.3839 24.3438 35.3867C24.3398 35.3845 24.3351 35.3821 24.3311 35.3799C24.1819 35.2974 23.9636 35.1749 23.6885 35.0156C23.1374 34.6967 22.3583 34.2306 21.4502 33.6436C19.6319 32.4681 17.3042 30.8138 15.2471 28.8887C13.1824 26.9564 11.4291 24.7866 10.7041 22.5879C10.344 21.4955 10.2407 20.4044 10.4707 19.3311C10.7006 18.2586 11.2692 17.1758 12.2959 16.1084C13.4407 14.9183 14.7177 14.4785 16.001 14.4746C17.3001 14.4708 18.6263 14.9143 19.834 15.5303C21.0385 16.1447 22.0999 16.9178 22.8623 17.54C23.2425 17.8503 23.5467 18.1215 23.7549 18.3145C23.8589 18.4109 23.9387 18.4878 23.9922 18.54C24.0189 18.5661 24.0395 18.5864 24.0527 18.5996C24.0591 18.606 24.0634 18.6112 24.0664 18.6143C24.0679 18.6158 24.0697 18.6165 24.0703 18.6172V18.6182L24.4355 18.9902L24.7139 18.5488L24.7158 18.5449C24.7179 18.5417 24.7221 18.5372 24.7266 18.5303C24.7357 18.5162 24.7495 18.4942 24.7686 18.4658C24.8067 18.4091 24.8642 18.3251 24.9404 18.2197C25.093 18.0086 25.3194 17.7118 25.6113 17.373C26.1973 16.6931 27.0388 15.8553 28.0703 15.2002C29.1012 14.5455 30.304 14.0847 31.624 14.124Z"
                    fill="#FF0000"
                    stroke="#FF0000"
                    stroke-width="0.824561"
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
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="17.9611"
                                    cy="17.9616"
                                    r="17.9611"
                                    fill="#94E999"
                                />
                                <path
                                    d="M29.4561 14.1897C29.4561 16.0744 28.9172 14.9081 26.0435 14.9081C23.1697 14.9081 22.6309 16.0744 22.6309 14.1897C22.6309 12.305 24.6066 11.3159 26.0435 11.3159C27.66 11.3159 29.4561 12.305 29.4561 14.1897Z"
                                    fill="#768E5C"
                                />
                                <path
                                    d="M7.18454 14.011C7.18454 15.8957 7.72338 14.7294 10.5972 14.7294C13.4709 14.7294 14.0098 15.8957 14.0098 14.011C14.0098 12.1263 12.034 11.1372 10.5972 11.1372C8.98065 11.1372 7.18454 12.1263 7.18454 14.011Z"
                                    fill="#768E5C"
                                />
                                <path
                                    d="M8.44141 20.1172C8.44141 20.1172 11.6744 23.7094 18.32 23.7094C24.9656 23.7094 27.4802 20.1172 27.4802 20.1172"
                                    stroke="#768E5C"
                                    stroke-width="1.79611"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 4}
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="17.9611"
                                    cy="17.9611"
                                    r="17.9611"
                                    fill="#B3D289"
                                />
                                <path
                                    d="M29.0967 17.4234C29.0967 19.3081 27.7484 20.1175 25.8637 20.1175C23.979 20.1175 22.2715 19.3081 22.2715 17.4234C22.2715 15.5386 23.7994 14.0107 25.6841 14.0107C27.5688 14.0107 29.0967 15.5386 29.0967 17.4234Z"
                                    fill="#768E5C"
                                />
                                <path
                                    d="M13.2901 17.4234C13.2901 19.3081 11.403 19.9379 9.51823 19.9379C7.6335 19.9379 6.46484 19.3081 6.46484 17.4234C6.46484 15.5386 7.99272 14.0107 9.87745 14.0107C11.7622 14.0107 13.2901 15.5386 13.2901 17.4234Z"
                                    fill="#768E5C"
                                />
                                <path
                                    d="M14.1895 25.3252C14.1895 25.3252 15.4467 26.9417 17.9613 26.9417C20.4758 26.9417 21.3739 25.3252 21.3739 25.3252"
                                    stroke="#768E5C"
                                    stroke-width="1.79611"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 3}
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="17.9611"
                                    cy="17.9616"
                                    r="17.9611"
                                    fill="#FFD484"
                                />
                                <circle
                                    cx="25.6841"
                                    cy="17.4234"
                                    r="3.41261"
                                    fill="#8E875C"
                                />
                                <circle
                                    cx="9.87745"
                                    cy="17.4234"
                                    r="3.41261"
                                    fill="#8E875C"
                                />
                                <line
                                    x1="14.1891"
                                    y1="25.3256"
                                    x2="21.3735"
                                    y2="25.3256"
                                    stroke="#8E875C"
                                    stroke-width="1.79611"
                                    stroke-linecap="round"
                                />
                            </svg>
                        {:else if value === 2}
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="17.9611"
                                    cy="17.9611"
                                    r="17.9611"
                                    fill="#FFAB6A"
                                />
                                <path
                                    d="M21.1912 26.4568C21.1912 28.7864 21.4178 25.5286 18.0226 25.5286C14.6273 25.5286 14.3691 28.4401 14.3691 26.8004C14.3691 25.868 15.5055 23.709 18.0226 23.709C20.5396 23.709 21.1912 25.868 21.1912 26.4568Z"
                                    fill="#96664C"
                                />
                                <path
                                    d="M21.9131 16.169C21.9131 18.5723 23.8613 20.5205 26.2645 20.5205C28.6677 20.5205 30.0938 18.9975 30.0938 18.0401C30.0938 17.0828 27.4347 15.6311 26.583 15.3289C25.7312 15.0266 21.9131 13.7658 21.9131 16.169Z"
                                    fill="#96664C"
                                />
                                <path
                                    d="M14.0153 15.805C14.2 18.2011 12.4073 20.2933 10.0112 20.478C7.61505 20.6628 6.07618 19.2539 6.0026 18.2994C5.92901 17.3449 8.46857 15.6931 9.2946 15.3263C10.1206 14.9595 13.8305 13.4089 14.0153 15.805Z"
                                    fill="#96664C"
                                />
                            </svg>
                        {:else}
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="17.9611"
                                    cy="17.9616"
                                    r="17.9611"
                                    fill="#FF8181"
                                />
                                <path
                                    d="M13.5694 19.3409C13.5694 21.7441 11.6212 23.6923 9.21792 23.6923C6.81469 23.6923 5.38867 22.1693 5.38867 21.212C5.38867 20.2547 6.6941 20.0932 9.30496 19.1668C12.0029 18.2095 13.5694 16.9376 13.5694 19.3409Z"
                                    fill="#6A4A4A"
                                />
                                <path
                                    d="M22.6299 19.3409C22.6299 21.7441 24.5781 23.6923 26.9813 23.6923C29.3845 23.6923 30.8105 22.1693 30.8105 21.212C30.8105 20.2547 29.5051 20.0932 26.8943 19.1668C24.1964 18.2095 22.6299 16.9376 22.6299 19.3409Z"
                                    fill="#6A4A4A"
                                />
                                <path
                                    d="M23.2592 30.3799C23.2592 32.5118 22.8629 28.117 18.0359 28.117C13.2089 28.117 12.8418 32.5118 12.8418 30.3799C12.8418 28.248 14.4574 26.6528 18.0359 26.6528C21.6144 26.6528 23.2592 28.7213 23.2592 30.3799Z"
                                    fill="#6A4A4A"
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
