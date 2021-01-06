<script>
import Textsstore from '../../textstore';
import Textwidget from '../widgets/textwidget.svelte';
import Headerwidget from '../widgets/headerwidget.svelte';
import Imagewidget from '../widgets/imagewidget.svelte';
import Soundwidget from '../widgets/soundwidget.svelte';

</script>
<style>
img{
    cursor: pointer;
}
</style>
<div>
<table style="width:100%;">
    {#each $Textsstore as part,i }
<tr>
    <td style="width:90%">
      {#if part.widgettypeid ==="3710c8fd-7115-4d86-b42f-5ba5e9d96687"}
      <Textwidget bind:content={part.content} />
      {/if}
      {#if part.widgettypeid ==="12f622cb-657f-45df-bc7e-439446248935"}
      <Headerwidget bind:content={part.content} />
      {/if}
      {#if part.widgettypeid ==="ecddbf43-15f3-4db2-b468-c2260b24c284"}
      <Soundwidget bind:content={part.content} />
      {/if}
      {#if part.widgettypeid ==="6edd644a-e2f8-4995-acb5-b5585f94d181"}
      <Imagewidget bind:content={part.content} />
      {/if}
    </td>
    <td>
        <div on:click={()=>{Textsstore.hochschieben(i)}}>
        <img src="/widget/up.png" alt="hochschieben"/>
        </div>
    </td>
    <td>
        <div on:click={()=>{Textsstore.runterschieben(i)}}>
            <img src="/widget/down.png" alt="runterschieben"/>
        </div>
    </td>
    <td>
        <div on:click={()=>{Textsstore.loeschen(i)}}>
            <img src="/widget/delete.png" alt="Widget löschen"/>
        </div>
    </td>
    </tr>
{/each}
</table>

</div>