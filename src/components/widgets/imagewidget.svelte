<script>
export let content;
import {HTTP_URL} from '../../config.js';
let dropzone

function initializeDropzone()
{
var myDropzone = new Dropzone(dropzone, { url: `${HTTP_URL}/imageupload/ `, clickable:true, acceptedFiles:"image/jpeg,image/png",paramName: "file",uploadMultiple:false, createImageThumbnails:false,success: (file, response)=>{
          file.previewElement.innerHTML = "";      
          let jsonfile = JSON.parse(response);
          content.pictureid = jsonfile.content;
    }});  

   /*
    myDropzone.on("addedfile", function(file) {
     myDropzone.options.params = {"galleryid":galleryid,"title":picture.title,"description":picture.description,"id":picture.id};
    });
    */
}

</script>
<style>

</style>
<svelte:head>
<script defer src="/dropzone/dropzone.min.js" on:load={initializeDropzone}></script>
<link rel="stylesheet" href="/dropzone/dropzone.min.css">
</svelte:head>
<div>
    <img src="{HTTP_URL}/berlinwitzepictures/image/{content.pictureid}.webp" alt={content.content} />
</div>
<fieldset>
    <legend><h3>Bild hochladen</h3></legend>
<input type="text" bind:value={content.content} placeholder="Bildtitel" />
<input type="text" bind:value={content.description} placeholder="Beschreibung" />
<div>
  <div id="bildzone" bind:this={dropzone}  style="background:pink; cursor: pointer; font-size:1.2rem; padding-top:30px; height: 100px; text-align:center; margin:5px; border:5px dotted black;">
    Bild hierher ziehen oder  Klick in diese Box.
  </div>
</div>
</fieldset>