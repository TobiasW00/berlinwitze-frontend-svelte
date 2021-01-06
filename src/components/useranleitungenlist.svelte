<script>
    export let anleitungen =[];
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
	background: var(--main-youtube-color);
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
{#if anleitungen}
	{#if anleitungen.length > 0}
	<div  class="grid-container" >
		<div class="witzbox">
		<div style="background: var(--main-youtube-color);text-align:center;"><h2>Anleitungen</h2></div>
		<div style="padding:1rem; ">
		{#each anleitungen as anleitung (anleitung.id)}
			<div>
			<a href="/anleitungen/{anleitung.id}/{getShortTitle(anleitung.title)}">{anleitung.title}</a>
			</div>
		{/each}
		</div>
		</div>
	</div>
	{/if}
{/if}