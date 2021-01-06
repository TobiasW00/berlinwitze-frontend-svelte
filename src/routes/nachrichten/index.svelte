
<script>
import members  from '../../memberstore'
import {user}  from '../../userstore.js'
import {addAction} from '../../api/dbconnection'
import { onMount } from 'svelte';
import {msgs} from '../../msgstore';
import {HTTP_URL} from '../../config';
import Msgrow from './msgrow.svelte';


onMount(async () => {

addAction("msg.getmgs", null, function(data)
		{
			if(data.content !== null)
			{
				msgs.set(data.content);
			}
		});

	});
</script>
<style>
	#chatinfobox
	{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#chatinfobox img
	{
		margin-right: 10px;
	}
</style>


<svelte:head>
	<title>Mail</title>
</svelte:head>
{#if $msgs}
 <div>
	 <div id="chatinfobox">
 <img src="/nachrichten.png" alt="Chat" /> <h1> {$msgs.length} Mitgliedern</h1>
</div>
 <br>
           	{#each $msgs  as nachricht }	   
				<Msgrow msg={nachricht} />
				<br/>
             {/each}
</div>
{:else}
<div>Keine Nachrichten :-(</div>
{/if}



