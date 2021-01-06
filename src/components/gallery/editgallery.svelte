<script>
import Button from '../../components/button.svelte';
import {addAction} from '../../api/dbconnection';
import {onMount} from 'svelte';
import swal from 'sweetalert';
import {mygalleries} from '../../mygallerystore';
import { goto } from '@sapper/app';
let title = "";
let description ="";
let shownewalbum = false;

/*
onMount(()=>
{
    addAction("gallery.mygallery",null,function(data)
        {            
            if(data.state==="OK")
            {                   
                $mygalleries = data.content;          
            }
        });
});
*/
function createGallery()
{
    let jsondata = {title,description};
    addAction("gallery.new",jsondata,function(data)
        {            
            if(data.state==="OK")
            {
              swal("Neues Album erstellt.", "Sie können sich jetzt einloggen!", "success");
              // window.location.href=
               goto("/galleryedit/" + data.content.id);
            }

        });
}


</script>
<style>
#creategallerybox
{
    border:2px solid black;
    border-radius: 10px;
    padding:20px;
}


</style>

{#if !shownewalbum}
<Button on:click={()=>{shownewalbum=!shownewalbum;}}>
    Album erzeugen
</Button>
{/if}
{#if shownewalbum}
<div id="creategallerybox">   
    <label for="galleryname">Albumname:</label><br>
    <input type="text" name="galleryname" bind:value="{title}" /><br>
    <label for="gallerydescription">Beschreibung:</label><br>
    <input style="width:100%" type="text" name="gallerydescription" bind:value="{description}" />
    <Button on:click="{createGallery}">
        Erstellen
    </Button>
</div>
{/if}