<script>
export let content;
</script>
<style>

</style>
<div>
    <input type="text" style="width:80%;" bind:value={content.content}/>
    <select bind:value={content.size} >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
      </select>
</div>