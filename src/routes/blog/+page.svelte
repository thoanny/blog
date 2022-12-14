<script lang="ts">
    import type { PageData } from './$types';
    import Posts from '$lib/Posts.svelte';
    export let data: PageData;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div>
    <h1 class="text-4xl mb-6 font-bold sr-only">Blog</h1>
    <Posts {...data} />
</div>
