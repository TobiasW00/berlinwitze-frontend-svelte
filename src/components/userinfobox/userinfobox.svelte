<script>
    import  members  from '../../data/member_store';
    import  {fetchMember}  from '../../data/member_service.js';
    import {onMount} from 'svelte';
    export let owner;
    export let ownerid;
    import {HTTP_URL} from '../../config.js';
    import Userwitzelist from '../../components/userwitzelist.svelte';
    import Gallerylist from '../../components/gallery/gallerylist.svelte';
    
    $: member= $members.find(f=>f.id === ownerid);
    $: ownername = (owner) ? owner : (member) ? member.name : "";
    onMount(async ()=> {
        fetchMember(ownerid);
    });
    
    
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
            text-align: left;
            padding-left: 10px;
        }
    .userinfoboxes
    {
        width:80%;
        padding:5px;
        display: inline-block;
        vertical-align: top;
    }
    .userboxgrid
    {
        display:grid;
        grid-template-columns: 100px auto;
    }
    
    </style>
    <div class="userinfobox">
        <div class="username">{ownername}</div>
        <div class="userboxgrid">
        <div>
        <a href="/member/{ownerid}/{ownername}">
        <img class="memberpicture" src="{HTTP_URL}/berlinwitzepictures/tumb_{ownerid}.jpg" alt={ownername} /> 
        </a>
    </div>
    <div>
        {#if member}
        <div class="userinfoboxes">
        <Userwitzelist witze={member.witze} />
        <Gallerylist galleries={member.gallerien} />
        </div>
        {/if}
    </div>
    </div>
    </div>
    