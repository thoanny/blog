<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/settings">Settings</a>
</nav>

<slot></slot>