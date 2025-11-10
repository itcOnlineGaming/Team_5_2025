import { writable, type Writable } from 'svelte/store';

export interface AnxietyEntry {
    timestamp: Date;
    level: number; // 1-5 scale
}

// Initialize with test data to trigger the flow
export const anxietyStore: Writable<AnxietyEntry[]> = writable([
    { timestamp: new Date(), level: 4 },
    { timestamp: new Date(), level: 5 }
]);

export const anxietyFlowShown = writable(false);

export function recordAnxiety(level: number): void {
    anxietyStore.update((entries: AnxietyEntry[]) => [
        ...entries, 
        { timestamp: new Date(), level }
    ]);
}

export function getRecentAnxietyLevel(): number {
    let level = 0;
    const unsubscribe = anxietyStore.subscribe((entries: AnxietyEntry[]) => {
        if (entries.length > 0) {
            const recent = entries.slice(-7); // Last 7 entries
            level = recent.reduce((sum, e) => sum + e.level, 0) / recent.length;
        }
    });
    unsubscribe();
    return level;
}

export function markAnxietyFlowShown(): void {
    anxietyFlowShown.set(true);
}

export function resetAnxietyFlowShown(): void {
    anxietyFlowShown.set(false);
}