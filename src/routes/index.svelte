<script>
import StartInfobox from '../components/startpageinfobox/startpageinfobox.svelte';
import RegisterUserBox from '../components/register/register.svelte';
import StartpageGallerybox from '../components/startboxes/startboxpicturebox.svelte';
import StartpageInfobox from '../components/startboxes/startpageinfobox.svelte';
import {user} from '../userstore.js';
import Loginbox from '../components/login/loginbox.svelte';
import {pictures} from '../data/startpagepictures_store';
import witze from '../witzestore.js'; 
import members from '../data/member_store.js';
import {HTTP_URL} from '../config.js';
let showloginform = true;
export let witzearr;
export let picturesarr = [];
export let membersarr;


</script>


<script context="module">
	let witze_value;
	let members_value;
	let pictures_value;
	
	
	export async function preload({ params, query }) {

	const unsubscribeWitze = witze.subscribe(value => {
		witze_value = value;
		});
			
	const unsubscribeMembers = members.subscribe(value => {
		members_value = value;
		});

	const unsubscribePictures = pictures.subscribe(value => {
		pictures_value = value;
		});
	
				if(pictures_value.length ===0 || members_value.length ===0 || witze_value.length ===0)
				{
				const res = await this.fetch(`${HTTP_URL}/api/startinfo`);
				const text = await res.json();
				if (res.status === 200) {	
							witze.set(text.content.witze);
							members.set(text.content.users);
							pictures.set(text.content.pictures);
							return {witzearr: text.content.witze,picturesarr:text.content.pictures,membersarr:text.content.users};
					} else {
						console.log(res.status + data.message);
				}
				}else
				{
					return {witzearr: witze_value,picturesarr:pictures_value,membersarr:members_value};
				}
			
	
	
		}
	
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

	<div class="grid">
		<div>
			<StartInfobox members={membersarr} witze={witzearr}/>
			<StartpageGallerybox pictures={picturesarr} />
			<StartpageInfobox />
		</div>		
		<div>
{#if !$user}
		{#if showloginform}
		<Loginbox on:showregisterform={()=>{showloginform=false;}}/>
		{:else}
		<RegisterUserBox on:showloginform={()=>{showloginform=true;}}/>
		{/if}	
	
{/if}
</div>
</div>

</div>

