<script>
import {HTTP_URL} from '../../../config.js';
import { onMount } from 'svelte';
export let taggs = [];
/*
onMount(()=>
    {
        if($tags.length === 0)
            {
                fetch(`${HTTP_URL}/api/tags`).then(r => r.json()).then(data => {
                                       tags.set(data.content);
                });
            }

    });
*/ 


</script>
<script context="module">
      import {tags}  from '../../../searchfilterstore.js';
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
	//	const { slug } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
        // server and client
        
       const res = await this.fetch(`${HTTP_URL}/api/tags`).then(r => r.json()).then(data => {
        tags.set(data.content);
        return data.content                          
                   });

    //    const tags = await res.json();

	//	const res = await this.fetch(`blog/${slug}.json`);
	//	const article = await res.json();

		return { taggs:res };
	}
</script>
<style>
    h1
    {
        margin:0;
    }
    h3{
        margin:0;
    }
    a
    {
        text-decoration: none;
        color:black;
    }
</style>
<svelte:head>
	<title>Kategorien</title>
	<meta property="og:title" content="{taggs.length} Kategorien"/>
    <meta property="og:description" content="Gag Tags" />
    <meta property="og:image" content="https://svelte.berlin-witze.de/preview.jpg"  />
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://svelte.berlin-witze.de/witz/tag"  />
</svelte:head>
<h1>{taggs.length} Kategorien erklärt.</h1><br>
{#each taggs as tag (tag.id)}
<a href="/witz/tag/{tag.name}">
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">{tag.name}</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div  itemprop="text">
        {tag.description}       
      </div>
    </div>
  </div><br>
</a>
{/each}