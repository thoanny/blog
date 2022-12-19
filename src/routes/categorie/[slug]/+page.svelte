<script lang="ts">
	import type { PageData } from './$types';
	import Posts from '$lib/Posts.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Catégorie : {data.category}</title>
</svelte:head>

<div>
	<h1 class="text-4xl mb-6 font-bold">Catégorie&nbsp;: {data.category}</h1>
	{#if data.posts.length > 0}
		<Posts {...data} />
	{:else}
		<div class="alert alert-info shadow-lg font-semibold">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Aucun article dans cette catégorie.</span>
			</div>
		</div>
	{/if}
</div>
