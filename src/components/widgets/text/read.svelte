<script>
export let content;
</script>
<p>
    {@html content.content.replace(/\n/g, '<br>')}
</p>