<script >
import { text,selectedtags,online,range,genre} from '../searchmemberfilterstore.js';
import {onMount} from 'svelte';
import {user} from '../userstore.js';
import Tagsbox from './tagsbox.svelte';
import {HTTP_URL} from '../config.js';


function updateTags(tagid)
{
if($selectedtags.includes(tagid))
    {
        selectedtags.update(u=> u.filter(f=>f !== tagid));
    }else
    {
        selectedtags.update(u=> [...u,tagid]);
     }
}

</script>




<style>
input[type="checkbox"] {
  display:none;
}
input[type="checkbox"] + label {
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid #ddd;
  background-color: #EEE;
  display: inline-block;
  content: "";
  float: left;
  margin-right: 5px;
  transition: background-color 0.5s linear;
  margin-top: 15px;
}
input[type="checkbox"] + label:hover {
  cursor: pointer;
}
input[type="checkbox"] + label::before {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #fff;
  display: block;
  content: "";
  float: left;
  margin-right: 5px;
  transition: margin 0.1s linear;
  box-shadow: 0px 0px 5px #aaa;
}
input[type="checkbox"]:checked+label{
  background-color: var(--main-witze-color);
}
input[type="checkbox"]:checked+label::before {
  margin: 0 0 0 30px;
}



</style>


<div style="margin:10px; padding:10px;diplay:block;">
<input class="form-control" style="width:100%; font-size: 1.3rem; border-radius: 5px; padding: 5px;"  bind:value={$text} type="text" placeholder="Filter.." aria-label="Search"/>
<Tagsbox  selectedtags={$selectedtags} updateTags={updateTags}/> 
<div style="margin: auto;">
<div class="form-check">
  <input type="checkbox"  bind:checked={$online} class="form-check-input" id="online" />
  <label class="form-check-label" for="online">Online</label>
</div>
<div style="text-align:center; display:inline-block;">
<select name="gender" bind:value={$genre} size="1">
  <option value={0}></option>
  <option value={1}>Mann</option>
  <option value={2}>Frau</option>
  <option value={3}>Paar</option>
  <option value={4}>Transvestit</option>
</select><br>
Gesschlecht
</div>
{#if $user}
<div class="slidecontainer" style="text-align:center;display:inline-block;">
  {#if $range ===0}
  Überall
  {:else}
  {$range} KM
  {/if}<br>
  <input step="25" type="range" min="0" max="500" bind:value={$range} class="slider" id="myRange"><br>
  Entfernung
</div>
{/if}
</div>
</div>
