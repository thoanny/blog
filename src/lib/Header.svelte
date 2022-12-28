<script lang="ts">
	import { page, navigating } from '$app/stores';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	export let menu;
</script>

<header
	class="bg-primary dark:bg-accent {$page.route.id === '/article/[slug]' && !$navigating
		? 'post'
		: ''}"
>
	<div class="container h-full !my-0">
		<div class="logo">
			<img src="/logo.svg" class="w-full h-full" alt="Thoanny" />
		</div>
		{#if menu}
			<nav>
				{#each menu as item}
					<a href={item.uri} target={item.target} class={item.cssClasses.join(' ')}>{item.label}</a>
				{/each}
				<a
					class="btn bg-white border-white text-black hover:text-white rounded-full"
					href="https://ko-fi.com/thoanny"
					target="_blank"
					rel="noreferrer">☕ Me soutenir</a
				>
				<!-- <ThemeSwitcher /> -->
			</nav>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		@apply relative h-24 sm:h-32 px-4 overflow-hidden;

		&.post {
			@screen xl {
				@apply overflow-visible;
				height: 37rem;
			}
		}

		.logo {
			@apply relative h-28 sm:h-36 lg:absolute -top-2 left-0 opacity-25 w-4/5 lg:w-auto;
			mix-blend-mode: soft-light;
		}

		nav {
			@apply absolute top-0 right-0 hidden lg:flex gap-6 h-32 items-center font-semibold text-white uppercase tracking-wider;
		}
	}
</style>
