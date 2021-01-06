<script>
import Button from '../button.svelte';
import {addAction} from '../../api/dbconnection';
import swal from 'sweetalert';
import {onMount} from 'svelte';
import Chatstore from '../../chatstore.js';
import { goto } from '@sapper/app';
export let memberid;

let msg ="";
$: inputmode = 0;

// 0 => Naricht senden Buten
// 1 => Erste Nachricht Inputbox
// 2 => Link zum Chat

  function sendMessage()
  {
     let jsondata = {};
     jsondata.content = msg;
     jsondata.receiver = memberid;
    addAction("msg.add",jsondata, function(data)
    {
                       if(data.state==="authrequired")
                                {                                              
                                     // window.location.href= 
                                     goto('/');                        
                                }else
                                {                                 
				                      if(data.state==="error")
                                   {
                                    swal("Oops...", data.msg, "error");                                        
                                   }else
                                   {
                                      // window.location.href= '/nachrichten/' + memberid;    
                                      goto('/nachrichten/' + memberid);
                                   }
                                   
                                }   
    }); 
  }

  onMount(()=>
  {
    loadMsgs();
  });

  function loadMsgs()
  {
    return;
		addAction("msg.getconversation",memberid,function getConversation(data)
        {
             if(data.content !==null)
          {
            Chatstore.updateMemberChat(memberid,data.content);
            inputmode = 2;
          }

        });

  }




</script>
<style>

</style>
<div style="margin-top:10px;">
  {#if inputmode ===2}
      <Button on:click={()=>{goto("/nachrichten/" + memberid)}}>
      Chatverlauf anzeigen
      </Button>
  {:else}
        {#if inputmode===1}
        <textarea style="width:100%; height:200px;"  bind:value={msg}  ></textarea>
        <Button on:click={sendMessage}>
        Senden
        </Button>
        {:else}
        <div>
        <Button on:click={()=>{inputmode=1;}}>
          Mitglied anschreiben
        </Button>
        </div>
        {/if}
  {/if}
</div>

