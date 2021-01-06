<script>
import Button from '../../components/button.svelte';
import {user} from '../../userstore.js';
import {addAction} from '../../api/dbconnection.js';
import Commentstore from '../../commentstore';
import {HTTP_URL} from '../../config.js';
import { createEventDispatcher } from 'svelte';
export let objectid ="";
let comment = "";


const dispatch = createEventDispatcher();


function sendMsg()
{
   
    let obj = {comment,objectid}
    addAction("comment.new", obj, function(data)
    {
        comment="";
        Commentstore.addComment(objectid,data.content);
        dispatch('shownewcommentbox');
     
    });

}

</script>
<style>
.userpicture
{
    width:100px;
    border-radius: 10%;
}
.userboxnewcomment
{
    display: grid;
    grid-template-columns: 110px auto;
}
#userboxnew
{
    text-align: center;
}
</style>
<div>
<div class="userboxnewcomment">
<img class="userpicture" src="{HTTP_URL}/berlinwitzepictures/tumb_{$user.id}.jpg" alt={$user.name} />
<textarea bind:value={comment} style="width:100%;height:130px;border-radius:5px;" />
</div>
<div id="userboxnew">
<Button on:click={sendMsg}>
Kommentar speichern
</Button>
</div>
</div>