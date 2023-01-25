<script lang="ts">
	import { navigating } from '$app/stores';
	import '../app.scss';
	import '../gutenberg.scss';

	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { twitchStore } from '../stores';

	import type { PageData } from './$types';
	export let data: PageData;

	let twitch;

	twitchStore.subscribe((value) => {
		twitch = value;
	});

	let menuDrawerOpen = false;

	function menuDrawerClose() {
		menuDrawerOpen = false;
	}
</script>

<main class="dark:bg-zinc-900">
	<div class="drawer">
		<input id="drawer-menu" type="checkbox" class="drawer-toggle" bind:checked={menuDrawerOpen} />
		<div class="drawer-content">
			<Header menu={data.menu?.PRIMARY} />
			<div class="container">
				{#if $navigating}
					<div class="mx-auto my-12 flex justify-center">
						<button class="btn btn-outline loading dark:border-gray-200 dark:text-gray-200"
							>Chargement...</button
						>
					</div>
				{:else}
					<slot />
				{/if}
			</div>
			{#if twitch.username}
				<a
					href="https://twitch.tv/{twitch.username}"
					target="_blank"
					rel="noreferrer"
					class="card card-compact w-96 bg-base-100 shadow-xl image-full absolute bottom-4 right-8 z-20"
				>
					<figure><img src={twitch.thumbnail} alt="Shoes" /></figure>
					<div class="card-body justify-center items-center">
						<div class="badge badge-twitch uppercase">En live</div>
						<h2 class="card-title text-center text-white">{twitch.title}</h2>
						{#if twitch.tags}
							<div class="card-actions justify-center">
								{#each twitch.tags as tag}
									<div class="badge uppercase badge-sm">{tag}</div>
								{/each}
							</div>
						{/if}
					</div>
				</a>

				<!-- <div
					class="card card-compact twitch-card w-80 bg-base-100 shadow-xl absolute bottom-4 right-8 z-20"
				>
					<figure><img src={twitch.thumbnail} alt="" class="w-full h-full" /></figure>
					<div class="card-body">
						<h2 class="card-title">
							{twitch.title}
							<div class="badge badge-secondary">Live</div>
						</h2>
						{#if twitch.tags}
							<div class="card-actions">
								{#each twitch.tags as tag}
									<div class="badge badge-outline">{tag}</div>
								{/each}
								<div class="badge badge-outline">Products</div>
							</div>
						{/if}
					</div>
				</div> -->

				<!-- <a class="twitch-online" href="https://twitch.tv/thoanny" target="_blank" rel="noreferrer">
					<span>En ligne sur Twitch</span>
					<img src={twitch.thumbnail} alt="" />
				</a> -->
			{/if}
			<Footer menu={data.menu?.FOOTER} />
			<label
				for="drawer-menu"
				class="btn bg-white btn-circle drawer-button lg:hidden absolute top-6 sm:top-10 right-4 border border-primary shadow"
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

<style lang="scss">
	.badge-twitch {
		@apply text-white;
		background: #9146ff;
	}

	.card {
		&.image-full {
			&:before {
				@apply bg-black bg-opacity-75;
			}

			&:hover {
				&:before {
					@apply bg-opacity-80;
				}
			}
		}
	}
</style>
