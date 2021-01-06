<script>
    export let content;
    import {HTTP_URL} from '../../config.js';
    let dropzone
    
    function initializeDropzone()
    {
    var myDropzone = new Dropzone(dropzone, { url: `${HTTP_URL}/soundupload/ `, clickable:true,timeout:1800000,maxFilesize: 100, acceptedFiles:"audio/mpeg",paramName: "file",uploadMultiple:false, createImageThumbnails:false,success: (file, response)=>{
              file.previewElement.innerHTML = "";      
              let jsonfile = JSON.parse(response);
              console.log(jsonfile);
              content.soundid = jsonfile.content;
        }});  
    }
    
    </script>
    <style>
    
    </style>
    <svelte:head>
    <script defer src="/dropzone/dropzone.min.js" on:load={initializeDropzone}></script>
    <link rel="stylesheet" href="/dropzone/dropzone.min.css">
    </svelte:head>
    <div>
        {#if content.soundid}
        <audio controls>
        <source src="{HTTP_URL}/berlinwitzepictures/sound/{content.soundid}.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
        {/if}
    </div>
    <fieldset>
        <legend><h3>Sound hochladen</h3></legend>
    <input type="text" bind:value={content.content} placeholder="Titel" />
    <input type="text" bind:value={content.description} placeholder="Beschreibung" />
    <div>
      <div id="bildzone" bind:this={dropzone}  style="background:pink; cursor: pointer; font-size:1.2rem; padding-top:30px; height: 100px; text-align:center; margin:5px; border:5px dotted black;">
        Datei hierher ziehen oder  Klick in diese Box.
      </div>
    </div>
    </fieldset>