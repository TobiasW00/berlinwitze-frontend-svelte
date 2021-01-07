<script>
  export let galleries = [];
  
  </script>
  <style>
  .gallerybox
  {
    vertical-align: top;
    border:2px solid black;
    border-radius: 15px;
    overflow: hidden;
    background:white;
   display: inline-block;
  }
  .gallerybox a
  {
    text-decoration: none;
    padding:2px;
  }
  .gallerybox a:hover
  {
    background: var(--main-gallery-color);
    color:white;
    border-radius: 5px;
  }
  h2
  {
    margin:0;
    overflow: hidden;
    text-align: center;
    color:white;
    font-size: 1.5rem;
  }
  </style>
  
  {#if galleries}
    {#if galleries.length > 0}
      <div class="gallerybox">
      <div style="background: var(--main-gallery-color);text-align:center;"><h2>Gallerien</h2></div>
      <div style="padding:1rem;">
        {#each galleries as gallery (gallery.id) }
          <div>
          <a  href="/gallery/{gallery.id}/{gallery.title}">
          {gallery.title}   
          </a>
          </div>
        {/each  }
      </div>
      </div>
    {/if}
  {/if}