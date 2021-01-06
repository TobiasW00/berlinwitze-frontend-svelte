<script>import { is_client } from 'svelte/internal';

import witze  from '../../../witzestore.js';
import { user } from '../../../userstore.js';
import { stores } from '@sapper/app';
import Tagbox from '../../../components/tagsbox.svelte'
import {HTTP_URL} from '../../../config.js';
import Rollenlsite from '../../../components/rollenliste/rollenliste.svelte';
import { tags } from '../../../searchfilterstore.js';
import Button from '../../../components/button.svelte';
import {getShortTitle} from '../../../help/witz.js'
import {onMount, onDestroy} from 'svelte';
import {addAction} from '../../../api/dbconnection';
import Likebutton from '../../../components/like/likebutton.svelte';
import Commentbox from '../../../components/comment/commentbox.svelte';
import DisplayTextsWidget from '../../../components/widgets/displaytext.svelte';
import {getDescriptionByContent, getImageUrlbyContent} from '../../../help/widget.js';
import Userinfobox from '../../../components/userinfobox/userinfobox.svelte';

export let witz;

let  createddate;
let  modifieddate;


function viewwitz()
{
	addAction("witz.view", witz.id,function(data)
	{
	
	});
}



onMount(async()=> 
{
viewwitz();
});

function initializeMoment()
{
	if(witz)
	{
		createddate = moment(witz.created).locale("de").format("l");
		modifieddate = moment(witz.modified).locale("de").startOf('day').fromNow(); 
	}
}



</script>

<script context="module">
let witz_value;



export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		//const res = await this.fetch(`witz/${params.slug}.json`);


const unsubscribe = witze.subscribe(value => {
		witz_value = value.find(f=>f.id===params.slug)
	});


			if(witz_value ===undefined)
			{
			const res = await this.fetch(`${HTTP_URL}/api/witz/${params.slug}`);
			const data = await res.json();
			if (res.status === 200) {		
				return {witz: data.content};
				} else {
					console.log(res.status + data.message);
				//this.error(res.status, data.message);
			}
			}else
			{
					return {witz:witz_value};
			}
		


	}


	let style = {
   styleStarWidth: 85,
   styleEmptyStarColor: "#737373",
   styleFullStarColor: "#ffd219"
}
</script>


<style>
#witzbox
{
	display: grid;
	grid-template-columns: auto 200px;
}
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
	#infobox
	{
		 max-width:200px;
	}

	@media (max-width: 500px) {
    #infobox {
    width:100%;	
	display: block;
	grid-column: 1;
	margin:auto;
	}
		#witzbox
	{
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto auto;
	}
		#articlebox
		{
			grid-row: 2;
		}
	}

</style>

<svelte:head>
	<title>{witz.title}</title>
	<meta name="description" content={getDescriptionByContent(witz.content)}>
	<script src="/moment/moment-with-locales.js" on:load={initializeMoment}></script>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{witz.title} 👠" />
	<meta property="og:description" content={getDescriptionByContent(witz.content)} />

    <meta property="og:image" content={getImageUrlbyContent(witz.content)}  />
	<meta property="og:type" content="article">
	<meta property="og:url" content="https://svelte.berlin-witze.de/witz/{witz.id}/{getShortTitle(witz.title)}"  />
</svelte:head>
<article>
<h1>{witz.title}</h1>
<div id="witzbox">
	<div id="articlebox">
			<div>
			</div>
			<div class='content'>
			<DisplayTextsWidget content={witz.content} />
			</div><br>
			<div>Erstellt von <a href="/member/{witz.ownerid}/{witz.owner}" alt={witz.owner}>{witz.owner}</a>  am {createddate}, letztes Update vor {modifieddate} und {witz.views} Personen haben diesen Text betrachtet.</div>

<div style="text-align:center;">
<Likebutton objectid={witz.id}  avgrating={witz.avgrating} likecount={witz.likecount} /><br>
<Commentbox objectid={witz.id}  /><br>
<Userinfobox owner={witz.owner} ownerid={witz.ownerid} />
{#if $user}
	{#if witz.ownerid ===$user.id }
	<br>
		<a href="/witz/edit/{witz.id}">	<Button>
		Gag verbessern
		</Button>
		</a>
	{/if}
{/if}
</div>
</div>
<div id="infobox">
	<div style="text-align:center;">
	<Tagbox linktags={true} selectedtags={witz.tags.split(";")} />
	</div>
	<Rollenlsite rollen={witz.roles} />




</div>
</article>