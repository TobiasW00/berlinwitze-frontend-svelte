import { writable } from 'svelte/store';

function createChatstore()
{
	const { subscribe, set, update } = writable({});

	function updateMemberChat(memberid,chatprotokoll)
	{
		update(chat=> {		

				chat[memberid] = chatprotokoll;	
				return chat;	
		  });
	}


	function addPost(memberid,post)
	{
		update(chat=> {			
				chat[memberid] = [...chat[memberid],post];	
				return chat;	
		  });
	}


return {
		subscribe,
		reset: () => set([]),
		set,	
		addPost,	
		updateMemberChat
	};
}
export default createChatstore();