<script>
import {HTTP_URL} from '../../config';
import Members from '../../memberstore';
import Commentstore from '../../commentstore';
import {addAction} from '../../api/dbconnection.js';
import {onMount} from 'svelte';
import Button from '../../components/button.svelte';
import { user } from '../../userstore';

export let comment;
$: editmode = false;


$: member = $Members.find(f=>f.id === comment.memberid);
$: membername = (member) ? member.name : '';


onMount(async ()=> {
    if(!member)
    {
        addAction("user.single",comment.memberid,function getuserdata(data)
        {
                Members.updateMember(data.content);
        });
    }
});

function editcomment()
{
    editmode = !editmode;
}

function deletecomment()
{
    addAction("comment.delete",comment.id,function getdeletedata(data)
        {
              console.log(comment);
            Commentstore.deleteComment(comment.objectid,comment.id);
            console.log($Commentstore);
        });
}

function saveupdate()
{
    editmode = false;
    addAction("comment.update",comment,function getupdatedata(data)
        {
            console.log("Update gespeichert.");
        });
}

</script>
<style>
    .userpicture
    {
        height:100px;
    }
    .box
    {
        margin:10px;
        border:2px black solid;
        border-radius: 10px;
        overflow: hidden;
        text-align: left;
    }
    .membernamebox
    {
        text-decoration: none;
        background: var(--main-comment-color);
        color:white;
       padding-right: 10px;
    }
    .box a
    {
        text-decoration: none;
    }
    .editpicture
    {
        cursor: pointer;
        float:right;
        margin-left:5px;
    }
    .textareacomment
    {
    width: calc(100% - 5px);
    height:100px;
    }
    .membernametext
    {
        margin-left: 5px;
      }

.commentbo
{
    display: grid;
    grid-template-columns: 100px auto;
}
</style>
<div class="box">
    <div class="membernamebox">
        <div class="membernametext">{membername}</div>
                {#if $user.id === comment.memberid}
                <img on:click={editcomment} class="editpicture" src="/comment/editcomment.png" alt="Kommentar bearbeiten."/> <img on:click={deletecomment} class="editpicture" src="/comment/deletecomment.png" alt="Kommentar löschen."/>
                {/if}
    </div>
    <div class="commentbo">
        <div>    <a href="/member/{comment.memberid}/{membername}">
         <img class="userpicture" src="{HTTP_URL}/berlinwitzepictures/tumb_{comment.memberid}.jpg" alt={membername} />
    </a></div>

  <div class="textbox">
      {#if editmode}
        <textarea class="textareacomment" bind:value={comment.comment}  />  
        <Button on:click={saveupdate}>
            Änderung speichern
            </Button>
      {:else}
         {comment.comment}
    {/if}
</div>
</div>
</div>

