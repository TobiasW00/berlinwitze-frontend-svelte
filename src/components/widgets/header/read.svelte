<script>
export let content;
</script>
{#if content.size ==="h3"}
<h3>
    {content.content}
</h3>
{/if}
{#if content.size ==="h2"}
<h2>
    {content.content}
</h2>
{/if}
{#if content.size ==="h1"}
<h1>
    {content.content}
</h1>
{/if}
{#if content.size ===""}
<h1>
    {content.content}
</h1>
{/if}
