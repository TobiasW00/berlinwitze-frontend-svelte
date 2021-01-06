
<script>
import  members  from '../../memberstore.js'
import { user } from '../../userstore.js'
import {addAction} from '../../api/dbconnection.js'
import {text,selectedtags,online,range,genre} from '../../searchmemberfilterstore.js';
import { onMount } from 'svelte';
import {HTTP_URL} from '../../config';
import MemberFilter from '../../components/SearchMemberFilter.svelte';
import {getDistanceFromLatLonInKm} from '../../help/distance';

	onMount(async () => {
		
			addAction("member.loadallmembers", null, function(data)
			{
				members.set(data.content);
			});		
	});

function filterTags(Tags,selectedtags)
{	
	let returncode = false;
	if(selectedtags.length ===0)
	{
		returncode =  true;
	}else
	{		
		let tagsarray = Tags.split(";");
		(selectedtags).forEach(element => {
			if(tagsarray.includes(element))
			{
				returncode =  true;				
			}
		});
	}
	return returncode;	
}

function getGendreIcon(genderid)
{

	switch(genderid)
	{
		case 1:
			return  "/genre/male.png";
		case 2:
			return  "/genre/female.png";
		case 3:
			return  "/genre/couple.png";
		case 4:
			return  "/genre/trans.png";
		default:
		return "/genre/female.png";
	}
	
}

function filterText(user,text)
{
	if(text.length ===0)
	return true;

	return (user.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1)

}

function filterOnline(user,online)
{
 	if(!online)
	return true;

	
	if(online && user.online)
	return true;


	return false;
}

function filterRange(member,user,range)
{
 	if(range ===0)
	return true;

	
	const distance = parseInt(getDistanceFromLatLonInKm(member.lat,member.lng,user.lat,user.lng))

	
	return (distance < range);
}

function filterGenre(member,genre)
{
 	if(genre ===0)
	return true;

return (genre === member.genre);
}

$: filter = $members.filter(f=> {const userstr = JSON.stringify(f); return (filterText(userstr,$text) && filterGenre(f,$genre) && filterRange(f,$user,$range) && filterOnline(f,$online) && filterTags(f.tags,$selectedtags))});

</script>


<style>
.grid-item-body { background:white; text-align: left; padding: 0px;}
.grid-item-header{background:#232c3f;color: white;margin:0;padding:0;}
a {text-decoration: none;color:black;}
.memberbox
{
	width: 250px;
	display: inline-block;
	height:500px;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;	
	margin:10px;
	overflow:hidden;
	border-radius: 10px;
	background-color: white;
}
h1
{
	margin-top: 0;
	margin-bottom: 0;
}
.onlinetext
{
	background:darkgreen;
	display: inline;
	font-size: 1rem;
	padding:2px;
}
#membersbox
{
	text-align: center;
}
.genreicon
{
	vertical-align: sub;
}
</style>

<svelte:head>
	<title>{$members.length} Mitglieder</title>
	<meta property="og:title" content={$members.length} Mitglieder />
	<meta property="og:description" content="Liste der Mitglieder" />
    <meta property="og:image" content="https://svelte.berlin-witze.de/preview.jpg"  />
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://svelte.berlin-witze.de/gallery"  />
</svelte:head>

<div>
<MemberFilter />
</div>


  <div id="membersbox">
		{#each filter as member}	   
	  <a  href='member/{member.id}/{member.name}' >
	  <div class="memberbox">			
				<div class="grid-item-header" style={(member.genre===2) ? 'background-color:#DF218A;':''}>
				<h1><img class="genreicon" src={getGendreIcon(member.genre)} alt={member.name}/> {member.name}
				 {#if member.online}
				 <span class="onlinetext">ONLINE</span>
				 {/if}
				 </h1>
				</div>	
				<div class="grid-item-body">
						{#if $user}
							{parseInt(getDistanceFromLatLonInKm(member.lat,member.lng,$user.lat,$user.lng))} KM
						{/if}
						{#if member.picture===1}
						<img width="250px" height="333px" src="{HTTP_URL}/berlinwitzepictures/tumb_{member.id}.jpg" alt={member.name}/>
						{/if}
					{@html member.description.replace(/\n/g, '<br>')}
	
				</div>
			
			</div>	
			</a>
{/each}
</div>


