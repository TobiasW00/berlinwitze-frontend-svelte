<script>
import Imageupload from '../../../components/gallery/uploadimage.svelte';
import { onMount } from "svelte";
    import {addAction} from '../../../api/dbconnection.js';
    import {HTTP_URL} from '../../../config';
    import Gallerystore from '../../../gallerystore';
    import { stores } from '@sapper/app';
    import {user} from '../../../userstore';
    import Button from '../../../components/button.svelte'
    const {page} = stores();
    import { goto } from '@sapper/app';
    let gallery = {id:"",title:"",description:"",pictures:[]};
    onMount(()=>
    {
        addAction("gallery.get",$page.params.galleryid,function(data)
        {
            Gallerystore.updateGallery(data.content);
        });
    });


    function deletePicture()
    {
        addAction("picture.delete",picture.id,function(data)
        {
         //   window.location.href = 
            goto("/galleryedit/" + $page.params.galleryid);
        });
    }

function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}

    
$: gallery = $Gallerystore.find(f=>f.id ===$page.params.galleryid);
$: picture = (gallery) ? gallery.pictures.find(f=>f.id === $page.params.id) : undefined; 
    </script>
    <style>

    </style>
    {#if picture}
    <Imageupload id={picture.id}  galleryid={$page.params.galleryid} />
    <div>
    <img on:error={loaddefault} src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp" alt={picture.title} />
    <Button on:click={deletePicture}>
        Bild löschen
    </Button>
</div>
    {/if}


    