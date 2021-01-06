<script>
    import { currentviedeo } from './stores.js';
    export let video;
let imgheight;
    let currentviewo_value;
	const unsubscribe = currentviedeo.subscribe(value => {
		currentviewo_value = value;
    });

    function handleClick()
    {
    if(currentviewo_value !== video.id)
        {
            currentviedeo.update(n => video.id);
        }
    }

</script>

<style>
.playerpreviewbox
{
text-align: center;
cursor:pointer;
}
.playimage
{
    position:relative;
    z-index: 10;
    opacity: .6;
}
</style>

{ #if video !== undefined}
<div class="playerpreviewbox" bind:clientHeight={imgheight} on:click={handleClick} title="Play"><img width="100%" height="225px" loading="lazy" alt={video.title} src={video.image} /><img  style="top:-{imgheight/2}px;"  class="playimage" src="playvideo.png" alt="Video abspielen" /></div>
{/if}