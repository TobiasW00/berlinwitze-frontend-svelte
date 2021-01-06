<script>
    import Imageupload from '../../../components/gallery/uploadimage.svelte';
    import { onMount,onDestroy  } from "svelte";
    import {addAction} from '../../../api/dbconnection.js';
    import {HTTP_URL} from '../../../config';
    import Gallerystore from '../../../gallerystore';
    import { stores } from '@sapper/app';
    import {user} from '../../../userstore';
    import Button from '../../../components/button.svelte'
    const {page} = stores();
    let gallery = {id:"",title:"",description:""};
    let lastsave =  new Date();
    onMount(()=>
    {
            addAction("gallery.get",$page.params.galleryid,function(data)
            {
                Gallerystore.updateGallery(data.content);
            });
    });


    let timeout;
function checkSave()
{
  let v1 = new Date(lastsave.getTime() + 5000);
  let v2 = new Date();
   if(v1 < v2)
  {
    saveprofile();
    lastsave = new Date();
    clearTimeout(timeout);
    timeout = undefined;
  }else
  {
    if(!timeout)
    {
      timeout = setTimeout(() => {
        checkSave();
      }, 5000);
    }
  }  
}



function saveprofile()
{
    addAction("gallery.update",gallery,function(data)
            {
                //Gallerystore.updateGallery(data.content);
            });
}

onDestroy(async ()=>
{
 saveprofile();
});

        
    $: gallery = $Gallerystore.find(f=>f.id ===$page.params.galleryid);
    
    
function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}


</script>
        <style>
    
        </style>
        {#if gallery}
        <fieldset>
        <legend><h3>Albumbeschriebung</h3></legend>
        <h1><input type="text" on:keydown={()=>checkSave()} bind:value="{gallery.title}"/></h1>
        <h3><input style="width:100%;" type="text" on:keydown={()=>checkSave()} bind:value="{gallery.description}"/></h3>
        </fieldset>
        <Imageupload id="new"  galleryid={$page.params.galleryid} />
        {#each gallery.pictures as picture(picture.id) }
        <a href="/galleryedit/{gallery.id}/{picture.id}" ><img on:error={loaddefault} src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp" alt={picture.title} /></a>
        {/each}
        {/if}
    
    
        