<script>
import {tags} from '../searchfilterstore.js';
import { onMount } from "svelte";
import {HTTP_URL} from '../config.js';
import {getShortTitle} from '../help/witz.js';
export let selectedtags;
export let updateTags = null;
export let linktags = null;



onMount(async () => {

            if($tags.length === 0)
            {
                fetch(`${HTTP_URL}/api/tags`).then(r => r.json()).then(data => {
                                       tags.set(data.content);
                });
            }
	});



function selectTag(tagid)
{
    if(updateTags)
        updateTags(tagid);
}


</script>
<style>
.tagbutton {
    margin: 3px;
    color: #fff;
    border: 2px solid transparent;
    padding: 5px;
    border-radius: 5px;
    background: #636363;
    display: inline-block;
}
.tagbuttonselected {
    background: #dfdfdf;
    color: #000;
     border: 2px solid red;
}
</style>        
       
        		{#each $tags as tag }	   
                <span  on:click={(e)=>selectTag(tag.id)}>

                        {#if selectedtags && selectedtags.includes(tag.id) }
                          {#if linktags}
                                <a href="/witz/tag/{getShortTitle(tag.name)}" title={tag.description} class="tagbutton tagbuttonselected" style="text-decoration:none;">
                                    {tag.name}                            
                                </a>
                            {:else}
                                <div class="tagbutton tagbuttonselected" title={tag.description}  style={(updateTags!==undefined) ? 'cursor:pointer;':''} >
                                {tag.name}                            
                                </div>
                            {/if}		
                        {:else}         
                                {#if updateTags}
                                <div class="tagbutton" title={tag.description}  style={(updateTags!==undefined) ? 'cursor:pointer;':''}>
                                {tag.name}                      
                                </div>
                                {/if}		
                        {/if}
             
                </span>
                {/each}