<script lang="ts">
	export let posts;

	const limit = 4;

	$: featuredPosts = posts.length >= limit ? posts.slice(0, limit) : [];
	$: otherPosts = posts.length >= limit ? posts.slice(limit, -1) : posts;
</script>

<div>
	{#if posts}
		<div class="grid md:grid-cols-2 gap-6">
			{#each featuredPosts as post}
				<a class="card image-full" href="/article/{post.slug}">
					{#if post.featuredImage}
						<figure>
							<img
								src={post.featuredImage.node.mediaItemUrl}
								class="object-cover w-full h-full"
								alt="Shoes"
							/>
						</figure>
					{/if}
					<div class="card-body items-center justify-center text-center">
						<h2 class="card-title">{post.title}</h2>
						<span
							>{new Date(Date.parse(post.date)).toLocaleDateString('FR-fr', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}</span
						>
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-8">
			{#each otherPosts as post}
				<a class="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 items-center post-block" href="/article/{post.slug}">
					{#if post.featuredImage}
						<figure class="w-full md:w-48 shrink-0 self-start">
							<img
								src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
								class="object-cover w-full h-full rounded-xl aspect-video md:aspect-square"
								alt="{(post.featuredImage.node.altText)?post.featuredImage.node.altText:post.title}"
								loading="lazy"
								width={post.featuredImage.node.mediaDetails.sizes[0].width}
								height={post.featuredImage.node.mediaDetails.sizes[0].height}
							/>
						</figure>
					{/if}
					<div class="w-full flex flex-col gap-2">
						<h2 class="text-lg font-bold">{post.title}</h2>
						{@html post.excerpt}
						<div class="metas">
							<span class="date flex items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
									/>
								</svg>
								{new Date(Date.parse(post.date))
									.toLocaleDateString('FR-fr', { year: 'numeric', month: 'short', day: 'numeric' })
									.toUpperCase()}
							</span>
							{#if post.categories}
								<span class="categories flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
										/>
									</svg>
									{#each post.categories.nodes as category}
										<span href="/categorie/{category.slug}">{category.name}</span>
									{/each}
								</span>
							{/if}
							{#if post.commentCount > 0}
								<span class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
										/>
									</svg>
									{post.commentCount}
									{post.commentCount < 2 ? 'commentaire' : 'commentaires'}
								</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p>Aucun article...</p>
	{/if}
</div>

<style lang="scss">
	.card {
		@apply w-full h-full bg-primary shadow-lg hover:shadow-xl aspect-video;

		.card-body {
			color: white;
		}

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

	.post-block {
		&:hover {
			h2 {
				@apply text-primary;
			}
		}
	}

	.metas {
		@apply flex flex-wrap gap-4 text-sm uppercase font-semibold text-gray-400 mb-4;
	}
</style>
