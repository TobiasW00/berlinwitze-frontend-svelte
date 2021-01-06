import { writable } from 'svelte/store';
// https://willwillems.com/posts/store-design-in-svelte.html

	export const galleries = writable([]);
	export const isLoading = writable(false)
	export const requestGallery = () => isLoading.set(true)
	export const loadedGallery = () => isLoading.set(false)

	export function updateGallery(updategallery)
	{
		galleries.update(galleriesold=> {
				let isnew = galleriesold.find(f=>f.id === updategallery.id)
				if(!isnew)
				{
					return [...galleriesold,updategallery];
				}else
				{
					return galleriesold.map(gallery => {
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

	export function addPicture(galleryid, picture)
	{
		galleries.update(galleriesold=> {
				let gallery = galleriesold.find(f=>f.id === galleryid)
				gallery.pictures = [...gallery.pictures,picture];

				const result = galleriesold.map(function (gall)
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
