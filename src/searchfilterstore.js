import { writable} from 'svelte/store';
export const text = writable('');
export const domfemale = writable(false);
export const dommale = writable(false);
export const selectedtags = writable([]);
export const tags = writable([]);