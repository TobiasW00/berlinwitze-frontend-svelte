import { writable} from 'svelte/store';
export const text = writable('');
export const selectedtags = writable([]);
export const online = writable(false);
export const range = writable(0);
export const genre = writable(0);