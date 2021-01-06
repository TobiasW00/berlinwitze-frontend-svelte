<script>
    import { onMount } from "svelte";
    import Gallerystore from '../../gallerystore';
    import Gallerybox from '../../components/gallery/gallerybox.svelte';
    
    import {galleries} from '../../data/gallery_store';
    import {fetchGalleries} from '../../data/gallery_service';
 
    
    onMount(()=>
    {
        fetchGalleries();
    });
    
    </script>
    <style>
    .wrapper {
        display: inline-grid;
        grid-template-columns: auto;
    }

    @media (min-width: 600px) {
        .wrapper {
        grid-template-columns: auto auto;
    }
    }
    @media (min-width: 900px) {
        .wrapper {
        grid-template-columns: auto auto auto;
    }
    }
    @media (min-width: 1200px) {
        .wrapper {
        grid-template-columns: auto auto auto auto;
    }
    }
    @media (min-width: 1500px) {
        .wrapper {
        grid-template-columns: auto auto auto auto auto;
    }
    }
    </style>
    <svelte:head>
    <title>{$Gallerystore.length} Comics</title>
	<meta property="og:title" content="{$Gallerystore.length} Comics" />
    <meta property="og:description" content="Bilder der Witzbolde" />
    <meta property="og:image" content="https://svelte.berlin-witze.de/preview.jpg"  />
	<meta property="og:type" content="article">
	<meta property="og:url" content="https://svelte.berlin-witze.de/gallery"  />
</svelte:head>

    <div class="wrapper">
    {#each $galleries as gallery(gallery.id) }
    <Gallerybox gallery={gallery} />
    {/each}
</div>
    
    