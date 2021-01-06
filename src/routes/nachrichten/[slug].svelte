<script context="module">
	export async function preload({ params }) {
		return {memberid:params.slug };
	}
</script>


<script>
import chatstore from '../../chatstore.js';
import members  from '../../memberstore.js';
import {user}  from '../../userstore.js';
import { stores ,goto} from '@sapper/app';
import {addAction} from '../../api/dbconnection';
import { msgs } from '../../msgstore.js';
import {HTTP_URL} from '../../config.js';
import {onMount} from 'svelte';
import Chatstore from '../../chatstore.js';
import Button from '../../components/button.svelte';
import swal from 'sweetalert';

export let memberid;


$: member = $members.find(f=>f.id === memberid);
let textmsg ="";

onMount(async ()=>
{
	//page router didn't work.
	let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
       addAction("msg.getconversation",id,function getConversation(data)
        {
			id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
			Chatstore.updateMemberChat(id,data.content);
        });


if(!member)
		{
		 addAction("user.single",memberid,(data)=>{
						members.updateMember(data.content);
      			});
		}



});

$: messages =  ($Chatstore[memberid]) ? $Chatstore[memberid]:[];
$: membername = (member) ?  member.name : '';
$: console.log(messages);


function deleteNachrichtenFinal()
{
	
	addAction("msg.deleteconversation",memberid,(data)=>{
					if(data.state ==="OK")
					{
						goto("/nachrichten");
					}
					else
					{
						console.log(data);
					}
      			});
}


function deleteMessages()
{
	swal({
            title: "Wirklich?",
            text: "Alle Narchiten mit " + membername + "löschen?",
            icon: "warning",
            buttons: ["Zurück zum Chat", "Löschen"],
            })
          .then((willDelete) => {
            if (willDelete) {
              deleteNachrichtenFinal();
             } 
          });

}



function sendMessage()
{
	let jsondata = {};
     jsondata.content = textmsg;
     jsondata.receiver = memberid
    addAction("msg.add",jsondata, function(data)
    {
                       if(data.state==="authrequired")
                                {                                              
									 //window.location.href= 
									 goto('/');                        
                                }else
                                {                                 
				                      if(data.state==="error")
                                   {
                                    sawal("Oops...", data.msg, "error");                                        
                                   }else
                                   {
									//   swal("Nachricht gesendet.","Jetzt geht's zur Inbox", "success");           
								   Chatstore.addPost(member.id,data.content);
									        textmsg = "";
                                   }
                                   
                                }   
    }); 
}


</script>



<style>
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
.msggrid
{
	display: grid;
	grid-template-columns: 100px auto;
}

</style>
<svelte:head>
<title>Chat mit {membername}</title>
</svelte:head>
{#if member !== undefined}
<article>
<h1>Chat mit {member.name}</h1>
<div class='content'>
	{#each messages as msg (msg.id)}
	<div class="msggrid">
		{#if msg.sender === $user.id}
			<div><img style="height:100px;border:2px solid;margin-top:10px; border-radius:10%;" src="{HTTP_URL}/berlinwitzepictures/tumb_{msg.sender}.jpg" alt="" />
			</div>
			<div style="font-style: italic;margin-left:20px;margin-top:10px;border:1px solid black;background:#E8E8E8;padding:10px;border-radius:20px;">
			{msg.content}
			</div>
		{:else}
		<div><a href="/member/{msg.sender}/{membername}"><img style="margin-top:10px;height:100px;border:2px solid; border-radius:10%;" src="{HTTP_URL}/berlinwitzepictures/tumb_{msg.sender}.jpg" alt={membername} /></a>
		</div>
		<div style="font-size:16px;margin-top:10px;border:1px solid black;background:#F8F8F8;padding:10px;border-radius:20px;">
		{msg.content}
		</div>
		{/if}
	</div>
	{/each}
<textarea style="width:100%;height:200px;margin-top:10px;" bind:value={textmsg} />
<Button on:click={sendMessage}>
Senden
</Button>
<br><br>
<Button on:click={deleteMessages}>
	Alle Nachrichten löschen
	</Button>
</div>
</article>
{/if}