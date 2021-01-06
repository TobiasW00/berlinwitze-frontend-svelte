<script>
    export let witze =[];
    import {getShortTitle} from '../help/witz.js';
</script>
<style>
.witzbox
{
	vertical-align: top;
	border:2px solid black;
	border-radius: 15px;
	overflow: hidden;
	background:white;
    display: inline-block;
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
h2
{
	margin:0;
	overflow: hidden;
	text-align: center;
	color:white;
	font-size: 1.5rem;
}
</style>
{#if witze}
	{#if witze.length > 0}
	<div  class="grid-container" >
		<div class="witzbox">
		<div style="background:var(--main-witze-color);text-align:center;"><h2>Geschriebene Gags</h2></div>
		<div style="padding:1rem; ">
		{#each witze as witz (witz.id)}
			<div>
			<a href="/witz/{witz.id}/{getShortTitle(witz.title)}">{witz.title}</a>
			</div>
		{/each}
		</div>
		</div>
	</div>
	{/if}
{/if}