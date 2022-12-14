<script lang="ts">
    import type { PageData } from './$types';
    import SEO from '$lib/SEO.svelte';
    import Posts from '$lib/Posts.svelte';
    export let data: PageData;
</script>

<SEO />

<div>
    <h1 class="text-4xl mb-6 font-bold sr-only">Blog</h1>
    <Posts {...data} />
</div>
