<script>
    import {HTTP_URL} from '../../../../config';
    import {galleries} from '../../../../data/gallery_store';
    import { stores } from '@sapper/app';
    import {user} from '../../../../userstore';
    import Button from '../../../../components/button.svelte'
    import Likebutton from '../../../../components/like/likebutton.svelte';
    import Commentbox from '../../../../components/comment/commentbox.svelte';
    export let gallery;
    const {page} = stores();



let nextindex = 0;

// $: backindex = (gallery) ? (picture && nextindex === 0) ? (((gallery.pictures.length-2) < 0) ? 0:  gallery.pictures.length-2) : (((nextindex-2) < 0) ? gallery.pictures.length-1: (nextindex-2) ):0;

$: picture = gallery.pictures.find(f=> f.id ===$page.params.id);
$: backindex = (picture && nextindex === 0) ? (((gallery.pictures.length-2) < 0) ? 0:  gallery.pictures.length-2):0;


$: if(picture)
{
    for(let i = 0; i < gallery.pictures.length;i++)
    {
        if(gallery.pictures[i].id === picture.id)
        {
            if(gallery.pictures.length == (i+1))
            {
                nextindex = 0;
            }else
            {
                nextindex = (i+1);
            }
        }
    }
    picture.title = (picture.title ==="") ? gallery.title : picture.title;
    picture.description = (picture.description ==="") ? gallery.description : picture.description;
}
function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}

</script>

<script context="module">
	let gallery_value;
	
	
	
	export async function preload({ params, query }) {
			// the `slug` parameter is available because
			// this file is called [slug].svelte
			//const res = await this.fetch(`fantasie/${params.slug}.json`);

	const unsubscribe = galleries.subscribe(value => {
		gallery_value = value.find(f=>f.id===params.galleryid)
		});
   
	
				if(gallery_value ===undefined)
				{
				const res = await this.fetch(`${HTTP_URL}/api/gallery/${params.galleryid}`);
				const data = await res.json();
				if (res.status === 200) {		
					return {gallery: data.content};
					} else {
						console.log(res.status + data.message);
				}
				}else
				{
						return {gallery:gallery_value};
				}
			
	
	
		}
	
	</script>


<style>
#picturebox{
    text-align: center;
}
#picturebox img
{
    max-width: 100%;
    border:2px solid black;
}
#metadatabox h1
{
    margin:0;
}

@media (max-width: 1000px) {
    #picturebox{
        font-size: 10px;
    }
}
#picturebox a
{
    text-decoration: none;
    color:black;
}
#picturebox h1 a:hover
{
background-color: var(--main-gallery-color);
border-radius: 10px;
padding:10px;
}




</style>

<svelte:head>   
        <title>{picture.title}</title>
        <meta name="description" content={picture.description} > 
        <meta name="twitter:title" content={picture.title}>
        <meta name="twitter:description" content={picture.description} >
        <meta name="twitter:image" content="{HTTP_URL}/berlinwitzepictures/{$page.params.galleryid}/orginal_{picture.id}.webp">
        <meta property="og:title" content="{picture.title}" />
        <meta property="og:description" content={picture.description} />
        <meta property="og:image" content="{HTTP_URL}/berlinwitzepictures/{$page.params.galleryid}/orginal_{picture.id}.webp"  />
        <meta property="og:type" content="website">
        <meta property="og:url" content="{HTTP_URL}/gallery/{$page.params.galleryid}/pic/{picture.id}" />       
</svelte:head>

<div id="picturebox">
    {#if picture}
    <h1 title={gallery.description}><a href="/gallery/{gallery.id}/{gallery.title}">{gallery.title}⏎</a></h1>
    <div>

    </div>
    <a href="/gallery/{gallery.id}/pic/{gallery.pictures[nextindex].id}"><img id="picture" on:error={loaddefault} style="min-width:300px; min-height:300px" src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp" alt={picture.title} /></a>
    <div>
        <a href="/gallery/{gallery.id}/pic/{gallery.pictures[backindex].id}">
            Zurück  
       </a> | 
       <a href="/gallery/{gallery.id}/pic/{gallery.pictures[nextindex].id}">
        Weiter  
   </a>
    </div>
    <div id="metadatabox">
    <h1>{picture.title}</h1>
    {picture.description}<br><br>
    <Likebutton objectid={picture.id} avgrating={picture.avgrating} likecount={picture.likecount}/>
    <Commentbox objectid={picture.id} />
</div><br>
{#if $user}
    {#if $user.id === gallery.ownerid}
        <a href="/galleryedit/{gallery.id}/{picture.id}">
        <Button>
        Bild bearbeiten
        </Button>
        </a>
    {/if}
{/if}
{/if}
</div>


    