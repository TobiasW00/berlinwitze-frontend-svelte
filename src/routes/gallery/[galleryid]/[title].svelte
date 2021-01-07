<script>
    import { onMount } from "svelte";
    import {HTTP_URL} from '../../../config';
    import {galleries,isLoading} from '../../../data/gallery_store';
    import {fetchGallery} from '../../../data/gallery_service';
    import { stores } from '@sapper/app';
    import {user} from '../../../userstore';
    import Button from '../../../components/button.svelte';
    import Gallery from '../../../components/Gallery.svelte';
    import Userinfobox from '../../../components/userinfobox/userinfobox.svelte';

    const {page} = stores();
  $: gallery = $galleries.find(f=>f.id ===$page.params.galleryid);


  $: gallerymeta = (gallery) ? gallery : {id: "", title: "", description: "", ownerid: "", modified: "2021-01-01T20:22:58.486914+01:00", pictures:[{id:"",title:""}]};


  $: console.log(gallery);
  onMount(()=>
    {
        if(!$isLoading)
        {
            fetchGallery($page.params.galleryid);
        }
    });


function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}

    </script>
    <style>
.picturebox
{
   max-width: 100%;
   border:5px solid var(--main-gallery-color);
    margin:10px;
    border-radius: 20px;
}
.picturesbox
{
    text-align: center;
    width:99%;
    box-sizing: content-box;
}
    </style>
    <svelte:head>
  
        <title>{gallerymeta.title}</title>
        <meta name="description" content={gallerymeta.description} >  
        <meta property="og:title" content="{gallerymeta.title}" />
        <meta property="og:description" content={gallerymeta.description} />
        <meta property="og:image" content="{HTTP_URL}/berlinwitzepictures/{$page.params.galleryid}/orginal_{gallerymeta.pictures[0].id}.webp"  />
        <meta property="og:type" content="website">
        <meta property="og:url" content="{HTTP_URL}/gallery/{$page.params.galleryid}/pic/{gallerymeta.pictures[0].id}" />
   
    </svelte:head>


    {#if gallery}
    <h1>{gallery.title}</h1>
    <h3>{gallery.description}</h3>
    <div class="picturesbox">
    <Gallery gap={5} maxColumnWidth={300}>
        {#each gallery.pictures as picture(picture.id) }
        <a href="/gallery/{gallery.id}/pic/{picture.id}">
        <img class="picturebox" on:error={loaddefault} src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp" alt={picture.title} />
        </a>
        {/each}
    </Gallery>
    <Userinfobox owner="" ownerid={gallery.ownerid} />

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


    