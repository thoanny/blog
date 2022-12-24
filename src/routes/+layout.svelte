<script lang="ts">
	import { navigating } from '$app/stores';
	import '../app.scss';
	import '../gutenberg.scss';

	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let menuDrawerOpen = false;

	function menuDrawerClose() {
		menuDrawerOpen = false;
	}
</script>

<main>
	<div class="drawer">
		<input id="drawer-menu" type="checkbox" class="drawer-toggle" bind:checked={menuDrawerOpen} />
		<div class="drawer-content">
			<Header menu={data.menu?.PRIMARY} />
			<div class="container">
				{#if $navigating}
					<div class="mx-auto my-12 flex justify-center">
						<button class="btn btn-outline loading">Chargement...</button>
					</div>
				{:else}
					<slot />
				{/if}
			</div>
			<Footer menu={data.menu?.FOOTER} />
			<label
				for="drawer-menu"
				class="btn btn-accent btn-circle drawer-button lg:hidden absolute top-6 sm:top-10 right-4 border border-primary shadow"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</label>
		</div>
		<div class="drawer-side">
			<label for="drawer-menu" class="drawer-overlay" />
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				{#each data.menu?.PRIMARY as item}
					<li>
						<a href={item.uri} target={item.target} on:click={menuDrawerClose}>{item.label}</a>
					</li>
				{/each}
				<li>
					<a href="https://ko-fi.com/thoanny" target="_blank" rel="noreferrer">☕ Me soutenir</a>
				</li>
			</ul>
		</div>
	</div>
</main>
