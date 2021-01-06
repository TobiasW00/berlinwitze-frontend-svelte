<script>
import { getShortTitle } from '../../../help/witz.js';
import {onMount} from 'svelte';
import { witzedit } from '../../../witzeditstore.js';
import witzetore from '../../../witzestore.js';
import  Textsstore  from '../../../textstore.js';
import { stores } from '@sapper/app';
import Tagbox from '../../../components/tagsbox.svelte'
import {HTTP_URL} from '../../../config.js';
import Rollenlsiteedit from '../../../components/rollenliste/rollenlisteedit.svelte';
import Texteditor from '../../../components/texteditor.svelte';
import Button from '../../../components/button.svelte';
const {page} = stores();
import { goto } from '@sapper/app';
import {addAction} from '../../../api/dbconnection';
import swal from 'sweetalert';
import AddWidget from '../../../components/texts/newwidgetpart.svelte';
import { each } from 'svelte/internal';
import { user } from '../../../userstore.js';



$: if($user)
{
  $user.witze = [{title:"",id:""},...$user.witze];
}



onMount(async ()=>
{

if($page.params.slug ==="new")
{
  witzedit.reset();
  Textsstore.reset();
}else
{

			const res = await fetch(`${HTTP_URL}/api/witz/${$page.params.slug}`);
			const data = await res.json();
			if (res.status === 200) {		
      witzedit.set(data.content);
      Textsstore.set(data.content.content);
			}
				 else {
      console.log(res.status + data.message);
          //	this.error(res.status, data.message);
			}
}


});




let  createddate;
let  modifieddate;
function initializeMoment()
{
	if($witzedit)
	{
		createddate = moment($witzedit.created).locale("de").format("l");
		modifieddate = moment($witzedit.modified).locale("de").startOf('day').fromNow(); 
	}
}


function deletewitz()
{
				
      swal({
        title: "witz löschen?",
        text: "Möchtest du diesen Text wirklich von svelte.berlin-witze.de enfernen? Er kann nicht wiederhergestellt werden.",
        icon: "warning",
        buttons: ["Zurück zur witz", "Löschen"],
        })
      .then((willDelete) => {
        if (willDelete) {
          deletewitzFinal();
         } else {
          swal("Gute Entscheidung!"); 
        }
      });
    }



  function deletewitzFinal()
    {
      addAction("witz.delete",$witzedit.id,function(data)
        {
            if(data.state ==="OK")
            {
               //window.location.href =
               goto("/witz");  
            }
        });
        
    }


function savewitz()
{

    var jsondata = $witzedit; 
  jsondata.content = $Textsstore;
  if($page.params.slug !== "new")
  { 
							 
    addAction("witz.update",jsondata,function(data)
  {
              if(data.state==="OK")
                      {
                        witzetore.updatewitz(data.content);
                         goto("/witz/" + data.content.id + "/" + getShortTitle(data.content.title));
                      }else
                      {                               
                        swal("Oops...", "Fehler beim Speichern der witz.", "error");     
                      }
  }); 
  }else
  {   
    addAction("witz.new",jsondata,function(data)
     {
         if(data.state==="OK")
         {          
          witzetore.updatewitz(data.content);      
           goto('/witz/' + data.content.id + "/" + getShortTitle(data.content.title));                
         }
     });
  }
}



const emptyfntasie = {title:"",value:""};


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
</style>



<svelte:head>
<title>{$witzedit.title}</title>
<script async src="/moment/moment-with-locales.js" on:load={initializeMoment}></script>
</svelte:head>

<article>
<table>
<tr>
<td><h1>Titel:</h1></td>
<td>
<h1><input type="text" style="width:100%;border-radius:10px;" bind:value={$witzedit.title} /></h1>
</td>
</tr><tr>
<td>
<h1>Rollen:</h1>
</td><td>
<Rollenlsiteedit /><br>
</td>
</tr><tr>
<td>
<h1>Tags:</h1> 
</td><td>
<div style="text-align:center; border:2px solid; padding:10px; border-radius:10px;">
<Tagbox updateTags={witzedit.updateTags} selectedtags={$witzedit.tags.split(";")} />
</div><br>
</td>
</tr><tr>
<td><h1>Story:</h1></td>
<td>
<div class='content' >
  <AddWidget />
</div><br/>
</td>
</tr>

<tr>
<td></td><td>
<Button on:click={savewitz}>
Speichern
</Button>
<br>

<Button on:click={deletewitz}>
Witz löschen
</Button>
</td>
</tr>
</table>



</article>
