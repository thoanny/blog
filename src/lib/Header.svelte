<script lang="ts">
	export let menu;
</script>

<header>
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
					class="btn btn-accent rounded-full"
					href="https://ko-fi.com/thoanny"
					target="_blank"
					rel="noreferrer">☕ Me soutenir</a
				>
			</nav>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		@apply relative h-32 bg-primary px-4 overflow-hidden;

		.logo {
			@apply relative h-36 lg:absolute -top-2 left-0 opacity-25 w-4/5 lg:w-full;
			mix-blend-mode: soft-light;
		}

		nav {
			@apply absolute top-0 right-0 hidden lg:flex gap-6 h-32 items-center font-semibold text-white uppercase tracking-wider;
		}
	}
</style>
