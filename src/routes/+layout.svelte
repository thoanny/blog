<script lang="ts">
  import { navigating, } from '$app/stores';
  import type { LayoutData } from './$types';
  import "../app.scss";

  import Header from '$lib/Header.svelte';

  export let data: LayoutData;
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


<style lang="scss">
  :global(.container) {
    @apply mx-auto max-w-6xl relative my-12 px-4;
  }
</style>