
<script>
import { createEventDispatcher } from "svelte";
import { fly, fade } from "svelte/transition";
export let title;


const dispatch = createEventDispatcher();

function closeModal() {
    dispatch("cancel");
}
</script>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 5%;
    width: 90%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: "Roboto Slab", sans-serif;
  }

  .content {
    padding: 1rem;
  }

  footer {
    padding: 1rem;
  }
/*
  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
  */
  .button
  {
    padding:10px;
    background-color: darkorange;
    cursor: pointer;
    border-radius: 5px;
    border-color: black;
    border:3px solid;
    display: inline-block;
  }
   .button:hover
   {
     opacity: 0.5;
   }
</style>



<!-- The Modal -->


<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div transition:fly={{ y: 300 }} class="modal">
  <h1>{title}</h1>
  <div class="content">
    <slot />
  </div>
  <footer>
    <slot name="footer">
      <div class="button" on:click={closeModal}>Schließen</div>
    </slot>
  </footer>
</div>
