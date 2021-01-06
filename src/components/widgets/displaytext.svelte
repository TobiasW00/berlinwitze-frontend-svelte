<script lang="ts">
import type {Widget } from "../../types/interfaces";
import Textread from './text/read.svelte';
import Headerread from './header/read.svelte';
import Imageread from './image/read.svelte';
import Soundread from './sound/read.svelte';



export let content:Widget[];

</script>
{#each content as text }
    {#if text.widgettypeid ==="3710c8fd-7115-4d86-b42f-5ba5e9d96687"}
        <Textread content={text.content} />
    {/if}
    {#if text.widgettypeid ==="12f622cb-657f-45df-bc7e-439446248935"}
    <Headerread content={text.content} />
    {/if}
    {#if text.widgettypeid ==="6edd644a-e2f8-4995-acb5-b5585f94d181"}
    <Imageread content={text.content} />
    {/if}
    {#if text.widgettypeid ==="ecddbf43-15f3-4db2-b468-c2260b24c284"}
    <Soundread content={text.content} />
    {/if}
{/each}
