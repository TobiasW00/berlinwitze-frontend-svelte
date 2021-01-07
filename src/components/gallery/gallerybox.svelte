<script>
    import {HTTP_URL} from '../../config.js';
    import {user} from '../../userstore.js';
    import { fade } from "svelte/transition";
    import {fetchMember} from '../../data/member_service';
    import Memberstore from '../../data/member_store';
    
    
    export let gallery;
    
    $: logedin = ($user?true:false);
    $: member = (logedin) ?  $Memberstore.find(f=>f.id ===gallery.ownerid):false;
    
        
        if($user !==undefined)
        {
            fetchMember(gallery.ownerid);
        }
    
    function loaddefault(e)
    {
        e.target.src = '/image-not-found.jpg'
    }
    
    </script>
    <style>
    .title
    {
    
        background:var(--main-gallery-color);
        display: block;
        text-decoration: none;
        position: absolute; 
        padding:10px;
        font-size: 1.1rem;
        left: 25px; 
        top: 25px;
        color:white;
        border-radius: 20px;
        border:black 2px solid;
    }
    .mitglied
    {    
        background:var(--main-member-color);
        display: block;
        text-decoration: none;
        position: absolute; 
        padding:5px;
        font-size: 1.1rem;
        left: 25px; 
        bottom:-575px;
        color:white;
        border-radius: 10px;
    }
    .dummybox
    {
        position: relative; 
        width: 0;
         height: 0
    }
    .boxpicture {
    overflow: hidden;
    display: inline-block;
    margin:10px;
    border-radius: 8px;
    background:black;
    text-align: center;
    vertical-align: middle;
    
    }
    .boxpicture img
    {
        object-fit:scale-down;
        border:3px solid var(--main-gallery-color);
    }
    </style>
    <a class="boxpicture" href="/gallery/{gallery.id}/{gallery.title}">
           <div class="dummybox">
            <div class="title">
                {gallery.title}
            </div>
        </div>
        <div class="dummybox">
            <div class="mitglied">
                {#if member}            	
                {member.name}
            {/if}
            </div>
        </div>
      
    
        {#if gallery.pictures.length > 0}
        <img   in:fade="{{ duration: 2000 }}" on:error={loaddefault} src="{HTTP_URL}/berlinwitzepictures/{gallery.id}/orginal_{gallery.pictures[0].id}.webp" alt={gallery.title} />
        {:else}
        <div style="width:300px;">
            
        </div>
        {/if}
    </a>