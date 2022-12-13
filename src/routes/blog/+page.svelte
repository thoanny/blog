<script lang="ts">
    import type { PageData } from './$types';
    import Posts from '$lib/Posts.svelte';
    export let data: PageData;
</script>

<div>
    <h1 class="text-4xl mb-6 font-bold">Blog</h1>
    <Posts {...data} />
</div>
