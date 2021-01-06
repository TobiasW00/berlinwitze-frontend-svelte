<script>
import Commentrow from './commentrow.svelte';
import {user} from '../../userstore';
import Commentstore from '../../commentstore';
import {addAction} from '../../api/dbconnection.js';
import {onMount} from 'svelte';
import AddNewComment from './newcomment.svelte';
import Button from '../../components/button.svelte';
export let objectid;
$: shownewcommentbox = false;


$: coms =  ($Commentstore[objectid] === undefined) ? [] :$Commentstore[objectid] ;


onMount(function data()
{
    addAction("comment.get", objectid, function(data)
    {
        Commentstore.updateObjectComments(objectid,data.content);
    });
});

</script>
<style>
    .commentbox
    {
        border:2px solid var(--main-comment-color);
        border-radius: 20px;
        padding:10px;
        margin-top:20px;
    }
</style>
<div class="commentbox">
{#if $user}
{#if shownewcommentbox}
    <AddNewComment on:shownewcommentbox={()=>{shownewcommentbox=false}} objectid={objectid} />
    {:else}
    <Button on:click="{()=>{shownewcommentbox=true}}">
        Kommentieren..
    </Button>
{/if}
    {#each coms as ct (ct.id) }
        <Commentrow comment={ct} />
    {/each}
{:else}
<h1>
    Kommentare können nur von Mitgliedern gelesen werden.
</h1>
{/if}
</div>