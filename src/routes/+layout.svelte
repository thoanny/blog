<script lang="ts">
  import { navigating, } from '$app/stores';
  import "../app.scss";
  import "../gutenberg.scss"

  import Header from '$lib/Header.svelte';
</script>

<main>
  <Header />
  <div class="container">
    {#if $navigating}
      <div class="mx-auto my-12 flex justify-center">
        <button class="btn btn-outline loading">Chargement...</button>
      </div>
    {:else}
      <slot></slot>
    {/if}
  </div>
</main>