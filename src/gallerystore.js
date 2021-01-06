import { writable } from 'svelte/store';
function createGallerystore()
{
	const { subscribe, set, update } = writable([]);


	function updateGallery(updategallery)
	{
		update(galleries=> {
				let isnew = galleries.find(f=>f.id === updategallery.id)
				if(!isnew)
				{
					return [...galleries,updategallery];
				}else
				{
					return galleries.map(gallery => {
						if(gallery.id === updategallery.id)
						{
						return updategallery;
						}else
						{
							return gallery;
						}
					});
		        }
		
		  });
	}

	function addPicture(galleryid, picture)
	{
		update(galleries=> {
				let gallery = galleries.find(f=>f.id === galleryid)
				gallery.pictures = [...gallery.pictures,picture];

				const result = galleries.map(function (gall)
				{
					if(gall.id ==gallery.id)
					{
						return gallery;
					}else
					{
						return gall;
					}
				});
				return result;
		
		  });
	}



	



return {
		subscribe,
		reset: () => set([]),
		set,		
		addPicture,
		updateGallery		
	};
}
export default createGallerystore();