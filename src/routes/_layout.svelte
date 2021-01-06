<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
	import { currentcolor } from '../colorstore.js';
	let windowwidth;
/*
	--main-youtube-color: #FFA500;
	--main-me-color:darkblue;
	--main-witze-color:#1ba1e2;
	--main-member-color:#60A917;
	--main-dates-color:red;
*/

$: stylewidth = windowwidth < 1000 ? "0":"220";

let color = "red";
$: switch(segment)
{
	case 'member':
		currentcolor.set("var(--main-member-color)");
	break;
	case 'witz':
	currentcolor.set("var(--main-witze-color)");
	break;
	case 'dates':
	currentcolor.set("var(--main-dates-color)");
	break;
	case 'nachrichten':
	currentcolor.set("var(--main-msg-color)");
	break;
	case 'gallery':
	currentcolor.set("var(--main-gallery-color)");
	break;
	
	
	default:
	currentcolor.set("var(--main-youtube-color)");	

}	


</script>

<style>
main
{	
	padding:5px;
	margin-left:220px;
}
footer a
{
	text-decoration: none;
}
#contentbox
{
	min-height: calc(100vh - 70px);
}

@media (max-width: 1000px) {
  main {
margin-left:70px;  
}
}

</style>
<div>
<Nav {segment}/>
<main>
<div id="contentbox">
<slot></slot>
</div>
<footer  style="text-align:center;padding:10px;text-decoration:none;">
<a href="https://twitter.com/Tobias_Wolter" alt="Twitter">Twitter</a> | <a href="/witz/tag" alt="Kategorien">Kategorien</a>  | <a href="/impressum" alt="Impressum">Impressum</a> | <a href="/datenschutzerklaerung" alt="Datenschutzerklaerung">Datenschutzerklärung</a>
</footer>
</main> 

</div>
<svelte:window bind:innerWidth={windowwidth}/>