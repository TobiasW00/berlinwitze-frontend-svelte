<script>
    import { currentviedeo } from './stores.js';
	import VideoPlayer from './player.svelte';
	import VideoPreview from './playerpreview.svelte';
	import Autolinker from 'autolinker';
    import { fly } from 'svelte/transition';
	export let video;


    let currentviewo_value;

const unsubscribe = currentviedeo.subscribe(value => {
		currentviewo_value = value;
    });
	
	let descriptioncss = "cursor:pointer";

function handleDescriptionClick()
{
	descriptioncss = "overflow-y:scroll;";
}



</script>

<style>
	.youtubeboxdiv {
		display: inline-block;
		border-radius:8px;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;	
		width:300px;
		height:600px;
		box-sizing: border-box; 
		text-align: center;
		margin:10px;
		overflow: hidden;
		background:white;
	}
	.videodescription
	{
		text-align: left;
		overflow-y: hidden;
		overflow-x:hidden;
		margin-top: -60px;
		font-size: .9em;
		box-sizing: border-box; 
		scrollbar-width: thin;	
		padding:10px;
		height: 280px;
	}
	.youtubeheader
	{
		background:var(--main-youtube-color);
		color:black;
		font-size: 1.0rem;
		height: 90px;
    display:flex;
    align-items: center;
    justify-content: center;
	}
	h3
	{
			margin:0;
	}

	@media (max-width: 400px) {
		.youtubeboxdiv
		{
			width:90%;
		}
}

</style>

<div  in:fly="{{ y: 200, duration: 2000 }}" class="youtubeboxdiv">
<div class="youtubeheader">
<h3>{video.title}</h3>
</div>
<div>
{ #if video.id === currentviewo_value}
<VideoPlayer video={video} />
{:else}
<VideoPreview video={video} />
{/if}
<div class="videodescription" style={descriptioncss} on:click={handleDescriptionClick}>
{@html Autolinker.link(video.description)}
</div>

      
</div>
</div>
