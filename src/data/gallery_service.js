import {requestGallery,galleries,loadedGallery,updateGallery} from './gallery_store';
import {HTTP_URL} from '../config';


export const fetchGalleries = () => {
    requestGallery();
    fetch(`${HTTP_URL}/api/galeries`).then(r => r.json()).then(data => {            		
        galleries.set(data.content);
        loadedGallery();
    }).catch((err) => {
        console.log(err);
    });
  }
export const fetchGallery = (id) => {
    requestGallery();
  fetch(`${HTTP_URL}/api/gallery/${id}`).then(r => r.json()).then(data => {            		
    updateGallery(data.content);
    loadedGallery();
        }).catch((err) => {
            console.log(err);

        });
    }
    export const updatehGallery = (gallery) => {
        requestGallery();
        addAction("gallery.update",gallery,function(data)
        {
            updateGallery(data.content);
        })
    }
