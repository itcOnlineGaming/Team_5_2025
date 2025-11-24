import { writable } from "svelte/store";

export const mood = writable<Array<number | null>>([null, null, null, null]);