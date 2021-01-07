<script>
import { HTTP_URL } from "../../config";
import { fly } from 'svelte/transition';
import { fade } from "svelte/transition";
export let pictures = [];


</script>
<style>
    .box
    {
        border:2px solid black;
        display: inline-block;
        border-radius: 20px;
        overflow: hidden;
        margin:0.3rem;
        height: 240px;
    }
    .box > div:first-child
    {
        background:var(--main-gallery-color);
        overflow:hidden;
        text-align: center;
        color:white;
    }
    
    h2
    {
        font-size: 1.5rem;
        margin:0;
    }
    .boxcontentpictures
    {
        padding:0;
        text-align: center;
    }

    </style>
{#if pictures.length > 0}
<div in:fly="{{ y: 500, duration: 2000 }}" class="box"><div>
    <h2>Bilder</h2>
    </div>
    <div class="boxcontentpictures">
        {#each  pictures as picture(picture.id) }
        <a in:fade="{{duration: 2000}}" href="{HTTP_URL}/gallery/{picture.galleryid}/pic/{picture.id}"><img style="height:200px" src="{HTTP_URL}/berlinwitzepictures/{picture.galleryid}/orginal_{picture.id}.webp" alt="Bild" /></a>
    {/each}
    
</div>
</div>
{/if}



