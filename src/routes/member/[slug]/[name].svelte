<script>
import  members  from '../../..//memberstore.js';
  import { stores } from '@sapper/app';
  import {addAction} from '../../../api/dbconnection';
  import {HTTP_URL} from '../../../config.js'
  import {onMount} from 'svelte';
  import Tagbox from '../../../components/tagsbox.svelte';
  import SendMsg from '../../../components/mgs/sendmsg.svelte';
  import Userwitzlist  from '../../../components/userwitzelist.svelte';
  import Useranleitungenlist  from '../../../components/useranleitungenlist.svelte';
  import Gallerylist from '../../../components/gallery/gallerylist.svelte';
  const {page} = stores();
  $: member= $members.find(f=>f.id === $page.params.slug);
  $: membername =  (member) ? member.name : '';

onMount(async ()=> {
	addAction("user.single",$page.params.slug,(data)=>{
			members.updateMember(data.content);				  
		});


});



function loaddefault(e)
{
    e.target.src = '/image-not-found.jpg'
}




</script>


<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
#profilepicture-img
{
	float:right;
	border:5px solid;
	border-radius: 20px;
	border-color: var(--main-member-color);
	max-width: 100%;
}
#membername-h1
{
	text-align: right;
	margin:0;
}
.onlinestatus
{
	text-align: right;
	color:white;
	padding:5px;
	display: inline-block;
	margin:2px;
	border-radius: 3px;
}

</style>

<svelte:head>
	<title>{membername}</title>
</svelte:head>
{#if member}
<article>

<h1 id="membername-h1">{member.name}</h1>
<div style="text-align:right" ><div style={(member.online) ? "background:green;":"background:red;"} class="onlinestatus">{(member.online) ? "Online":"Offline"}</div></div>

<div class='content'>

{#if member.picture===1}
<img id="profilepicture-img" on:error={loaddefault} style="float:right; margin-left:10px;" src="{HTTP_URL}/berlinwitzepictures/{member.id}.jpg" alt="Profilbild" />
{/if}
{@html member.description.replace(/\n/g, '<br>')}
<br>
<Userwitzlist witze={member.witze} />
<Useranleitungenlist anleitungen={member.anleitungen} />
<br>	
<div>
	<Tagbox selectedtags={member.tags} />
	{#if member.gallerien && member.gallerien.length > 0}
	<fieldset>
		<legend><h3>Alben</h3></legend>
	<Gallerylist galleries={member.gallerien} />
	</fieldset>
	{/if}
	</div>
	{#if member.webpage}
	<br>
Webseite:<a href="{member.webpage}" target="_blank"> {member.webpage}</a>
{/if}
</div>
<div>Standort: {member.city}</div>
<SendMsg memberid={member.id} />
</article>
{/if}

