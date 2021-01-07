<script>
  import {onMount} from 'svelte';
  import {HTTP_URL} from '../../config';
  import {addPicture,galleries} from '../../data/gallery_store';
  import {fetchGallery} from '../../data/gallery_service';
  import { goto } from '@sapper/app';
  export let id;
  export let galleryid;
  let newobj = {id:"new",title:"",description:"",galleryid:galleryid};
  
  
  function updateGallery()
  {
    fetchGallery(galleryid);
  }
  
  
  function loadGallery()
  {
                if(id !== "new")
                {
            
                }else
                {        
            setTimeout(()=> {addPicture(galleryid,newobj)},2000);
                }
  
  }
  onMount(()=>
      {
    //    loadGallery();
      });
      
  $: gallery = $galleries.find(f=>f.id ===galleryid);
  $: picture = newobj;
  $: if(gallery)
  {
    let p = gallery.pictures.find(f=>f.id === id);
    if(p)
    {
        picture = p;
    }
  }
  
  
  
  let dropzone
  
  function initializeDropzone()
  {
  var myDropzone = new Dropzone(dropzone, { url: `${HTTP_URL}/galleryupload/ `, clickable:true, params:{"galleryid":galleryid,"title":picture.title,"description":picture.description,"id":picture.id},   acceptedFiles:"image/jpeg,image/png",paramName: "file",uploadMultiple:false, createImageThumbnails:false,success: (file, response)=>{
            file.previewElement.innerHTML = "";      
            updateGallery();
            goto("/galleryedit/" + galleryid);
      }});  
  
      myDropzone.on("addedfile", function(file) {
       myDropzone.options.params = {"galleryid":galleryid,"title":picture.title,"description":picture.description,"id":picture.id};
      });
  }
  
  
  </script>
  <style>
  
  </style>
  <svelte:head>
    {#if picture}
  <script defer src="/dropzone/dropzone.min.js" on:load={initializeDropzone}></script>
  <link rel="stylesheet" href="/dropzone/dropzone.min.css">
  {/if}
  </svelte:head>
  {#if picture}
  <div>
    <fieldset>
      <legend><h3>Bild hochladen</h3></legend>
  <input type="text" bind:value={picture.title} placeholder="Bildtitel" />
  <input type="text" bind:value={picture.description} placeholder="Beschreibung" />
  <div>
    <div id="bildzone" bind:this={dropzone}  style="background:pink; cursor: pointer; font-size:1.2rem; padding-top:30px; height: 100px; text-align:center; margin:5px; border:5px dotted black;">
      Bild hierher ziehen oder  Klick in diese Box.
    </div>
  </div>
  </fieldset><br>
  </div>
  {/if}