
<script>
import witze  from '../../witzestore.js';
import { text,selectedtags,tags } from '../../searchfilterstore.js';
import SearchwitzFilter from '../../components/SearchWitzFilter.svelte';
import Infobox from '../../components/witzboxdata.svelte';
import {HTTP_URL} from '../../config.js';
import { onDestroy, onMount } from 'svelte';
import {getShortTitle} from '../../help/witz.js';
import DisplayTextsWidget from '../../components/widgets/displaytext.svelte';
let isLoading = false;
import Gallery from '../../components/Gallery.svelte';


onMount(()=>
{
//	if($witze.length < 2)
//	{
//		isLoading = true;

		fetch(`${HTTP_URL}/api/witze`).then(r => r.json()).then(data => {
			witze.set(data);		
				// isLoading = false;
			}).catch((err) => {
				console.log(err);
			});
//	}
});





function filterTags(selectedtags,Tags)
{	
	let returncode = false;
	if(selectedtags.length ===0)
	{
		returncode =  true;
	}else
	{		
		let tagsarray = Tags.split(";");
		(selectedtags).forEach(element => {
			if(tagsarray.includes(element))
			{
				returncode =  true;				
			}
		});
	}
	return returncode;	
}

$: filter = $witze.filter(f=>JSON.stringify(f).toLocaleLowerCase().indexOf($text.toLocaleLowerCase()) > 0 || $text.length === 0  && filterTags($selectedtags,f.tags));


</script>




<style>
.grid-item { text-align: center;   border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;	display: inline-block; background:var(--main-witze-color);margin:10px;}
.grid-item-body { background:white; text-align: left; overflow: hidden;  padding: 5px;}
.grid-item-header{
	color: white; height:100px;  display:flex;
    align-items: center; justify-content: center;}
a {text-decoration: none;color:black;}
h1
{
	font-size: 1.3rem;
}

.grid-item:hover
{
	box-shadow: rgba(0, 0, 0, 1) 0px 3px 6px 0px;
}
/*
@media (max-width: 400px) {
		.grid-item 
		{
			width:90%;
		}
	}


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
	*/
</style>

<svelte:head>
	<title>{filter.length} Witze</title>
	<meta property="og:title" content={filter.length} Witze />
	<meta name="description" content="Alle Gags unserer Mitglieder">
	<meta property="og:description" content="Alle Gags unserer Mitglieder" />
    <meta property="og:image" content="https://svelte.berlin-witze.de/preview.jpg"  />
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://svelte.berlin-witze.de/witze"  />
</svelte:head>
<SearchwitzFilter />
{#if isLoading}
<div>Lade Witze..</div>
{:else}
<div style="text-align: center;">
	<Gallery gap={5} maxColumnWidth={300}>
		{#each filter as witz (witz.id)}
		<div  class="grid-item">
			<a  href='witz/{witz.id}/{getShortTitle(witz.title)}' >
		<div class="grid-item-header">
		<h1>{witz.title}</h1>
		</div>
		<div class="grid-item-body">
			<DisplayTextsWidget content={witz.content} />			
		</div>
			</a>

		<Infobox views={witz.views} avgrating={witz.avgrating} timetoread={witz.timetoread}/>
		</div>		
{/each}
</Gallery>
</div>
{/if}
