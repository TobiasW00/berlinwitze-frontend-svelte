import { writable } from 'svelte/store';

function createConversationstore()
{
	const { subscribe, set, update } = writable([]);

return {
		subscribe,
        set,
        update
	};
}
export default createConversationstore();