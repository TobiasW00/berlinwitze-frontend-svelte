<script>

import { witzedit } from '../../witzeditstore';
import Button from '../../components/button.svelte';


</script>
<style>
table td
{
  padding:5px;  
}
</style>

<div style="border:2px solid black;border-radius:20px; padding:20px;">
<table>
   		{#each $witzedit.roles as rolle (rolle.id) }	   
          <tr><td>Name <input type="text" bind:value={rolle.name} /></td><td>Alter <input type="text" style="width:100px;" bind:value={rolle.age} /></td>
          <td>Geschlecht
          	<select bind:value={rolle.genre}>
                         <option value=""></option>
                         <option value="Mann">Mann</option>            
                         <option value="Frau">Frau</option>     
	        </select>
          </td>
          <td>Erzähler <input style="margin-left:10px;" type="checkbox" bind:checked={rolle.storyteller} /></td><td>Beschreibung <input type="text" style="min-width:400px;" bind:value={rolle.description} /></td>
          <td>
          <Button on:click={()=>{witzedit.removeRolle(rolle.id)}}>Rolle löschen</Button>
          </td>
          </tr> 
        {/each}
</table><br/>
<Button on:click={witzedit.addRolle}>Person hinzufügen</Button>
<br/>
</div>