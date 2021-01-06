<script>
    import { onMount } from "svelte";
    import {addAction} from '../../../../api/dbconnection'
    import {HTTP_URL} from '../../../../config';
    import Gallerystore from '../../../../gallerystore';
    import { stores } from '@sapper/app';
    import {user} from '../../../../userstore';
    import Button from '../../../../components/button.svelte'
    import Likebutton from '../../../../components/like/likebutton.svelte';
    import Commentbox from '../../../../components/comment/commentbox.svelte';
    const {page} = stores();

    onMount(()=>
    {
        fetch(`${HTTP_URL}/api/gallery/${$page.params.galleryid}`).then(r => r.json()).then(data => {
            		
                    Gallerystore.updateGallery(data.content);
                        }).catch((err) => {
                            console.log(err);
                        });
    });
    
$: gallery = $Gallerystore.find(f=>f.id ===$page.params.galleryid);
let nextindex = 0;

$: picture = (gallery) ? gallery.pictures.find(f=> f.id ===$page.params.id):undefined;

$: backindex = (gallery) ? (picture && nextindex === 0) ? (((gallery.pictures.length-2) < 0) ? 0:  gallery.pictures.length-2) : (((nextindex-2) < 0) ? gallery.pictures.length-1: (nextindex-2) ):0;


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
}
function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
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
#picturebox h3
{
    margin:0px;
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



</style>
<svelte:head>
        {#if picture}
        <meta property="og:title" content="{picture.title}" />
        <meta property="og:description" content={picture.description} />
        <meta property="og:image" content="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{picture.id}.webp"  />
        <meta property="og:type" content="article">
        <meta property="og:url" content="{HTTP_URL}/gallery/{gallery.id}/pic/{picture.id}" />
        {/if}
</svelte:head>


    <div id="picturebox">
{#if picture}
    <a href="/gallery/{gallery.id}/{gallery.title}"><h1 title={gallery.description}>{gallery.title}</h1></a>
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
    <div>
    <h3>{picture.title}</h3>
    {picture.description}<br>
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


    