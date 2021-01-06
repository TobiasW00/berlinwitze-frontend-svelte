<script>
    import { onMount } from "svelte";
    import {HTTP_URL} from '../../../config';
    import Gallerystore from '../../../gallerystore';
    import { stores } from '@sapper/app';
    import {user} from '../../../userstore';
    import Button from '../../../components/button.svelte'
    import Gallery from '../../../components/Gallery.svelte';
    const {page} = stores();
    let gallery = {id:"",title:"",description:""};
    onMount(()=>
    {
        fetch(`${HTTP_URL}/api/gallery/${$page.params.galleryid}`).then(r => r.json()).then(data => {
            		
            Gallerystore.updateGallery(data.content);
                    // isLoading = false;
                }).catch((err) => {
                    console.log(err);
                });
        });


$: gallery = $Gallerystore.find(f=>f.id ===$page.params.galleryid);


function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}

    </script>
    <style>
.picturebox
{
    width:300px;
    border:5px solid var(--main-gallery-color);
    margin:10px;
    border-radius: 20px;
}
.picturesbox
{
    text-align: center;
}
    </style>
    <svelte:head>
  
    {#if gallery && gallery.pictures.length !==0}
        <meta property="og:title" content="{gallery.title}" />
        <meta property="og:description" content={gallery.description} />
        <meta property="og:image" content="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{gallery.pictures[0].id}.webp"  />
        <meta property="og:type" content="article">
        <meta property="og:url" content="{HTTP_URL}/gallery/{gallery.id}/pic/{gallery.pictures[0].id}" />
        {/if}
    </svelte:head>


    {#if gallery}
    <h1>{gallery.title}</h1>
    <h3>{gallery.description}</h3>
    <div class="picturesbox">
    <Gallery gap={5} maxColumnWidth={300}>
    {#each gallery.pictures as picture(picture.id) }
    <a href="/gallery/{gallery.id}/pic/{picture.id}"><img class="picturebox" on:error={loaddefault} src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp" alt={picture.title} /></a>
    {/each}
    </Gallery>
</div>
    {#if $user}
    {#if $user.id === gallery.ownerid}
    <a href="/galleryedit/{gallery.id}">
        <Button>
        Dein Album bearbeiten
    </Button>
    </a>
    {/if}
    {/if}
    {/if}


    
    
    