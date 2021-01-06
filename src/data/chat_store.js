import { writable } from 'svelte/store';

function createChatstore()
{
	const { subscribe, set, update } = writable({});

	function updateMemberChat(memberid,chatprotokoll)
	{
		console.log(memberid);
		update(chat=> {		
			console.log(memberid);
			console.log(chat);
			if(chat[memberid] == undefined)
			{
				console.log("erzeugen");
			}
			chat[memberid] = chatprotokoll;

			console.log(chat);
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