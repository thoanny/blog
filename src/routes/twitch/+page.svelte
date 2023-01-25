<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/SEO.svelte';
	export let data: PageData;
</script>

<SEO title="Twitch" />

<template>
	<div id="twitch-player">
		<iframe
			src="https://player.twitch.tv/?channel=thoanny&parent=thoanny.fr"
			height="1080"
			width="1920"
			allowfullscreen
			title="Thoanny"
			class="aspect-video w-full h-full rounded-xl overflow-hidden shadow"
		/>
	</div>
	<div class="mx-auto max-w-2xl text-center mb-12">
		<h2 class="text-3xl font-semibold">💜 Merci 💜</h2>
		<div class="text-lg">
			<p class="mt-4">
				C'est toujours un plaisir que j'ai, de partager avec vous mes sessions de jeux et
				découvertes. Je tiens à toutes et tous vous remercier, pour votre présence et votre
				soutien&nbsp;!
			</p>
		</div>
	</div>

	{#if data.streamelements}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 mb-12">
			{#each data.streamelements as activity}
				<div class="flex items-center justify-center text-center border rounded-2xl shadow-lg p-6">
					<div>
						<div class="avatar mb-2">
							<div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img src={activity.data.avatar} />
							</div>
						</div>
						<div>
							<div class="font-bold text-xl mb-2 block truncate">
								{activity.data.displayName}
							</div>
							{#if activity.type == 'raid'}<div class="text-sm mb-2">
									+{activity.data.amount} spectateurs
								</div>{/if}
							<span class="badge badge-primary uppercase">{activity.type}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="max-w-2xl mx-auto mb-12 mt-20 text-lg text-center">
		<h2>🎁 Récompenses 🎁</h2>
		<p class="mt-4 ">
			En participant à mes lives, tu gagnes des points de chaîne Twitch (T-coins). Grâce à ces
			points, tu peux lancer des sons et acheter des coffres Guild Wars 2.
		</p>
		<p class="mt-4 font-bold">Tous les coffres Guild Wars 2 sont gagnants&nbsp;!</p>
		<p>L'ouverture de ce coffre est limitée à 1 toutes les 10 minutes et coûte 2000 T-coins.</p>
	</div>

	{#if data.gifts}
		<div class="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto my-6 mb-12">
			{#each data.gifts as gift}
				<div class="relative">
					{#if gift.count > 1}
						<span class="badge badge-sm absolute bottom-1 right-1 z-10">
							{gift.count}
						</span>
					{/if}
					<div class="avatar block">
						<div class="w-16 h-16 rounded-lg shadow rarity-{gift.rarity}">
							<img src={gift.icon} alt={gift.name} class="w-full h-full object-cover" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</template>

<style lang="scss">
	#twitch-player {
		@apply mb-12;

		@screen xl {
			margin-top: calc(-37rem + 8rem);
		}
	}

	img {
		@apply h-24 w-24;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply font-bold text-primary mt-12;
	}

	h1 {
		@apply text-5xl;
	}

	h2 {
		@apply text-4xl;
	}
</style>
