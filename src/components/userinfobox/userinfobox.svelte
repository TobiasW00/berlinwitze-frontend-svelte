<script>
export let owner;
export let ownerid;
import {HTTP_URL} from '../../config.js';
</script>
<style>
    .memberpicture
    {
        width:100px;
        margin:0;
        padding:0;
    }
    .userinfobox
    {
   border:2px solid var(--main-member-color);
   border-radius: 15px;
   overflow: hidden;
   margin-top:10px;
    }
    .username
    {
        background:var(--main-member-color);
        color:white;
        overflow: hidden;
    }
/* 	<img src="{HTTP_URL}/berlinwitzepictures/tumb_{witz.ownerid}.jpg" alt="Profilbild" /> */
</style>
<div class="userinfobox">
    <div class="username">{owner}</div>
    <a href="/member/{ownerid}/{owner}">
    <img class="memberpicture" src="{HTTP_URL}/berlinwitzepictures/tumb_{ownerid}.jpg" alt={owner} /> 
    </a>
</div>
