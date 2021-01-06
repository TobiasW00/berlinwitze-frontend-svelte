<script lang="ts">
let showselection = false;
import Button from '../button.svelte';
import Textsstore from '../../textstore.js';
import Widgetlist from './widgetlist.svelte';
</script>
<style>

</style>
<div style="text-align:center; border:2px solid; padding:10px; border-radius:10px;">
<div>
<Widgetlist />
</div>


<div>
    <br>
    {#if showselection===false}
    <Button on:click="{()=>{showselection=true;}}">
        Widget hinzufügen    
    </Button>
    {:else}
    <Button on:click="{()=>{ Textsstore.addTextwidget();showselection=false;}}">
        Text
    </Button><br>
    <Button on:click="{()=>{ Textsstore.addHeaderwidget();showselection=false;}}">
        Überschrift
    </Button><br>
    <Button on:click="{()=>{ Textsstore.addImagewidget();showselection=false;}}">
        Bild
    </Button><br>
    <Button on:click="{()=>{ Textsstore.addSoundwidget();showselection=false;}}">
        Sound
    </Button><br>
    <Button  on:click="{()=>{showselection=false;}}">
        Schließen
    </Button>
    {/if}
<br>
</div>
</div>