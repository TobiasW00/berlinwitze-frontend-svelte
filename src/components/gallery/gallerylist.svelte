<script>
export let galleries = [];

</script>
<style>
.gallerybox a
{
  text-decoration: none;
  font-size: 1.2rem;
  margin: 2px;
  display: block;
  padding:4px;
}
.gallerybox a:hover
{
	background: var(--main-gallery-color);
	color:white;
	border-radius: 5px;
}

</style>
{#if galleries.length > 0}
<div class="wrapper">
    {#each galleries as gallery (gallery.id) }
        <div class="gallerybox">
        <a  href="/gallery/{gallery.id}/{gallery.title}">
        {gallery.title}   
        </a>
        </div>
    {/each  }
    <br>
</div>
{/if}