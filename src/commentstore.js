import { writable } from 'svelte/store';

function createCommentstore()
{
	const { subscribe, set, update } = writable({});

	function updateObjectComments(objectid,comments)
	{
		update(com=> {		

            com[objectid] = comments;	
				return com;	
		  });
	}


	function addComment(objectid,comment)
	{
		update(com=> {	
			if(com[objectid] === undefined)
			{
				com[objectid] = [comment,...[]];
			}else
			{			
			com[objectid] = [comment,...com[objectid]];	
				return com;	
			}
		  });
	}

	function deleteComment(objectid,commentid)
	{
		update(com=> {			
			com[objectid] = com[objectid].filter(f=> f.id !== commentid);
				return com;	
		  });
	}


return {
		subscribe,
		reset: () => set([]),
		set,	
		addComment,	
		deleteComment,
		updateObjectComments
	};
}
export default createCommentstore();