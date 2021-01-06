<script>
export let value;
import {onMount} from 'svelte';
import { createEventDispatcher } from "svelte";
let editor;


const dispatch = createEventDispatcher();

 

/*
export function getText()
{
  console.log("inGetText");
  return editor.root.innerHTML;
}
*/

function initializeTexteditor()
{
   editor = new Quill('#editor', {
    modules: { toolbar: true },
    theme: 'snow'
  });


editor.on('text-change', function(delta, oldDelta, source) {
        dispatch("htmlvalue",editor.root.innerHTML);
});


}
</script>
<style>

</style>
<svelte:head>
<link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.0.0/quill.js"  on:load={initializeTexteditor}></script>
</svelte:head>

<div>
<!-- Create the editor container -->
<div id="editor">
{#if value}
{@html value}
{/if}
</div>
</div>