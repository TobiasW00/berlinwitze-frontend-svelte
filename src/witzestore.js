import { writable } from 'svelte/store';
function createWitzestore()
{
	const { subscribe, set, update,get } = writable([]);


	function updatewitz(updatewitz)
	{
		update(witze=> {
				let isnew = witze.find(f=>f.id === updatewitz.id)
				if(!isnew)
				{
					return [...witze,updatewitz];
				}else
				{
					return witze.map(witz => {
						if(witz.id === updatewitz.id)
						{
						return updatewitz;
						}else
						{
							return witz;
						}
					});
		        }
		
		  });
	}


return {
		subscribe,
		reset: () => set([]),
		set,
		get,	
		updatewitz		
	};
}
export default createWitzestore();