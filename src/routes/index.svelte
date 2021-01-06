<script>
import StartInfobox from '../components/startpageinfobox/startpageinfobox.svelte';
import RegisterUserBox from '../components/register/register.svelte';
import {onMount} from 'svelte';
import {addAction} from '../api/dbconnection';
import {user} from '../userstore.js';
import Loginbox from '../components/login/loginbox.svelte';
import { dict, locale, t } from '../i18njs.js';
import translations from '../translations.js';
let showloginform = false;



  $: languages = Object.keys(translations);
  $: dict.set(translations);

</script>

<style>
.grid
{
	display:  grid;
	grid-template-columns: auto auto;
	grid-column-gap: 10px;
}
@media (max-width: 1000px) {
.grid
{
	grid-template-columns: auto;
	grid-template-rows: auto auto;
	grid-row-gap: 10px;
}
}

.box
{
	border:2px solid black;
	display: inline-block;
	border-radius: 20px;
	overflow: hidden;
}
.box > div:first-child
{
	background:blueviolet;
	overflow:hidden;
	text-align: center;
	color:white;
}
#textbody
{
   font-size: 1rem;
}
.boxcontent h3
{
	margin:0;
	font-size: 1.1rem;
}
.boxcontent
{
padding:10px;
}
ul li
{
	font-weight: 400;
}
.boxcontent a
{
	text-decoration: none;
	color:black;
}
h2
{
	font-size: 1.5rem;
	margin:0;
}
</style>

<svelte:head>
	<title>Berlin Witze</title>
	<meta name="description" content="Witze über Berlin">
	<meta property="og:title" content="Berlin Witze" />
    <meta property="og:description" content="Sammlung von Witzen" />
    <meta property="og:image" content="/preview.jpg"  />
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://berlin-witze.de" />
</svelte:head>
<div id="textbody">

	<h1>{$t('title.helloworld')}</h1>
{#if !$user}
	<div class="grid">
		<div class="box">
		<div>
		<h2>Warum?</h2>
		</div>
		<div class="boxcontent">
			Dies ist eine Svelte/Sapper Testanwendung, um erste Erfahrungen zu sammeln.
			<ul>
			<li><h3><a href="/witz">Witzesammlung</a></h3>
				Sammlung an Witzen, primär über Berlin.</li>
			<li><h3><a href="/member">Mitglieder</a></h3>
				Profilseiten der Witzbolde</li>
			<li><h3><a href="/videos">Videos</a></h3>
			Sammlung lustiger YouTube Clips</li>
			<li><h3><a href="/gallery">Bilder</a></h3>
			Comics und Bilder zum schmunzeln.</li>
		</ul>
			
		</div>
	</div>
{#if showloginform}
<Loginbox on:showregisterform={()=>{showloginform=false;}}/>
{:else}
<RegisterUserBox on:showloginform={()=>{showloginform=true;}}/>
{/if}
</div>
{/if}


<StartInfobox />
</div>

