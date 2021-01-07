<script>
	import {HTTP_URL} from '../../config.js';
	import {getShortTitle} from '../../help/witz.js';
	import {  fly } from 'svelte/transition';
	export let witze=[];
	export let members=[];
	</script>
	
	
	<style>
	.userinfobox
	{
		display: inline-block;
		border:2px solid black;
		border-radius: 15px;
		width:173px;
		overflow: hidden;
		margin:0.4rem;
		height:250px;
	}
	.userinfobox:hover 
	{
	  border-color: var(--main-member-color);
	  box-shadow: 5px 10px 18px var(--main-member-color);
	}
	.witzbox , .userbox
	{
		margin:0.3rem;
	}
	.usernamebox
	{
		position: relative;
		left: 0px;
		top: -45px;
		background:var(--main-member-color);
		color:white;
		text-align: center;
		display: inline-block;
	}
	.witzbox
	{
		vertical-align: top;
		border:2px solid black;
		border-radius: 15px;
		overflow: hidden;
		background:white;
	}
	.userbox
	{
		vertical-align: top;
		border:2px solid black;
		border-radius: 15px;
		overflow: hidden;
	background: white;
	
	}
	h2
	{
		margin:0;
		overflow: hidden;
		text-align: center;
		color:white;
		font-size: 1.5rem;
	}
	.witzbox a
	{
		text-decoration: none;
		padding:2px;
	}
	.witzbox a:hover
	{
		background: var(--main-witze-color);
		color:white;
		border-radius: 5px;
	}
	.grid-container
	{
	  display: grid;
	  grid-template-columns: 1fr 2fr;
	  grid-column-gap: 10px;
	}
	
	
	@media (max-width: 1200px) {
	.userbox
	{
		  grid-row-start: 2;
	}
	.grid-container
	{
	  grid-template-columns: 1fr;
	  grid-column-gap: 10px;
	}
	
	
	.grid-container h2
	{
		font-size: 1rem;
	}
	}
	
	
	</style>
	{#if witze.length > 0}
	<div in:fly="{{ y: 200, duration: 2000 }}"  class="grid-container" >
	<div class="witzbox">
	<div style="background:var(--main-witze-color);text-align:center;"><h2>Witze</h2></div>
	<div style="padding:0.3rem; ">
	{#each witze as witz, i (witz.id)}
		{#if i < 20}
		<div>
		   <a href="/witz/{witz.id}/{getShortTitle(witz.title)}">{witz.title}</a> von <a href="/member/{witz.ownerid}/{witz.owner}">{witz.owner}</a> 
		</div>
		{/if}
	{/each}
	</div>
	</div>
	
	<div class="userbox">
	<div style="background:var(--main-member-color);text-align:center;"><h2>Mitglieder</h2></div>
	<div style="padding:0.3rem; text-align:center;  display: flex;justify-content: center;align-items: center;">
	<div >
	{#each members as user,i (user.id)}
		{#if user.picture ===1}
			{#if i < 20}
			<a class="userinfobox" href="/member/{user.id}/{user.name}" alt={user.name}>		
				<img src="{HTTP_URL}/berlinwitzepictures/tumb_{user.id}.jpg" alt={user.name} />		
				<div class="usernamebox">{user.name}</div>
			</a>
			{/if} 
		{/if}   
	{/each}
	</div>
	</div>
	</div>
	</div>
	{/if}
	
	