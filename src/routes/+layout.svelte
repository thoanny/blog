<script lang="ts">
	import { navigating } from '$app/stores';
	import '../app.scss';
	import '../gutenberg.scss';

	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	let menuModalOpen = false;
	function menuModalClose() {
		menuModalOpen = false;
	}
</script>

<template>
	<main class="dark:bg-zinc-900 bg-gray-100">
		<Header />
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
		<Footer />
		<label
			for="modal-menu"
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

		<input type="checkbox" id="modal-menu" class="modal-toggle" bind:checked={menuModalOpen} />
		<label for="modal-menu" class="modal cursor-pointer modal modal-bottom sm:modal-middle">
			<div class="modal-box p-0 text-lg sm:!max-w-xs">
				<ul class="menu bg-base-100 w-full p-2 rounded-box">
					<li>
						<a href="/" on:click={menuModalClose}>
							<span>📃</span>
							Blog
						</a>
					</li>
					<li>
						<a href="/categorie/projets" on:click={menuModalClose}>
							<span>🛠️</span>
							Projets
						</a>
					</li>
					<li>
						<a href="/categorie/jeux-video/" on:click={menuModalClose}>
							<span>🎮</span>
							Jeux vidéo
						</a>
					</li>
					<li>
						<a href="/categorie/streaming/" on:click={menuModalClose}>
							<span>🟣</span>
							Streaming
						</a>
					</li>
					<li>
						<a href="/twitch" on:click={menuModalClose}>
							<span>📺</span>
							Twitch
						</a>
					</li>
					<li>
						<a href="https://ko-fi.com/thoanny" target="_blank" rel="noreferrer">
							<span>☕</span>
							Me soutenir
						</a>
					</li>
				</ul>
			</div>
		</label>
	</main>
</template>

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

	ul.menu {
		li {
			span {
				@apply w-6 text-center;
			}
		}
	}
</style>
