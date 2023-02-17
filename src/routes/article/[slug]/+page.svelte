<script lang="ts">
	import { stripHtml } from 'string-strip-html';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { readingTime } from 'reading-time-estimator';
	import ClipboardJS from 'clipboard';

	import SEO from '$lib/SEO.svelte';
	import AddComment from '$lib/AddComment.svelte';

	export let data: PageData;
	export const post = data.post;

	const timeToRead = readingTime(stripHtml(post.content).result, 150, 'fr');

	let featuredImage = {
		url: '',
		width: 0,
		height: 0
	};

	if (post.featuredImage) {
		featuredImage = {
			url: post.featuredImage.node.mediaItemUrl,
			width: post.featuredImage.node.mediaDetails.width,
			height: post.featuredImage.node.mediaDetails.height
		};

		if (post.featuredImage.node.mediaDetails.sizes) {
			featuredImage = {
				url: post.featuredImage.node.mediaDetails.sizes[0].sourceUrl,
				width: post.featuredImage.node.mediaDetails.sizes[0].width,
				height: post.featuredImage.node.mediaDetails.sizes[0].height
			};
		}
	}

	const url = new URL($page.url);
	const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;

	if (browser) {
		new ClipboardJS('.btn.clipboard');
	}

	const nbsp = (str: String) =>
		str.replace(/\s+([:;»!?/])|([«])\s+/g, (m, l, r) => {
			if (l) {
				return `\xa0${l}`;
			}
			if (r) {
				return `${r}\xa0`;
			}
		});
</script>

<SEO {...data.seo} />

<div>
	<article>
		<header class="">
			<div class="flex flex-col xl:flex-row gap-8 items-end flex-col-reverse">
				{#if post.featuredImage}
					<figure id="post-thumbnail" class="w-full xl:max-w-2xl shrink-0 xl:-ml-8 relative">
						<img
							src={featuredImage.url}
							alt={post.featuredImage.node.altText ? post.featuredImage.node.altText : post.title}
							class="w-full h-full rounded-2xl aspect-video object-cover xl:shadow-xl"
							width={featuredImage.width}
							height={featuredImage.height}
						/>
						{#if post.featuredImage.node.caption}
							<div
								class="flex xl:hidden text-sm text-gray-400 gap-2 shrink-0 justify-center mb-6 mt-4"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-5 h-5"
								>
									<path
										fill-rule="evenodd"
										d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
										clip-rule="evenodd"
									/>
								</svg>

								<div>
									{@html stripHtml(post.featuredImage.node.caption, {
										ignoreTagsWithTheirContents: ['em']
									}).result}
								</div>
							</div>
						{/if}
					</figure>
				{/if}

				<div
					class="flex gap-6 xl:gap-6 flex-col items-end justify-start xl:mb-6 pr-4 xl:mt-6 w-full"
				>
					<h1 class="w-full text-3xl font-bold leading-12 xl:text-white text-center xl:text-left">
						{nbsp(post.title)}
					</h1>
					{#if post.featuredImage && post.featuredImage.node.caption}
						<div class="hidden xl:flex text-sm text-white gap-2 opacity-75">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5 inline shrink-0"
							>
								<path
									fill-rule="evenodd"
									d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
									clip-rule="evenodd"
								/>
							</svg>
							<div>
								{@html stripHtml(post.featuredImage.node.caption, {
									ignoreTagsWithTheirContents: ['em']
								}).result}
							</div>
						</div>
					{/if}
					<ul class="metas w-full justify-center xl:justify-start">
						<li>
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
							{new Date(Date.parse(post.date)).toLocaleDateString('FR-fr', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</li>
						{#if post.categories}
							<li>
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
									<a href="/categorie/{category.slug}">{category.name}</a>
								{/each}
							</li>
						{/if}
						{#if post.commentCount > 0}
							<li>
								<a href="#comments" class="flex items-center gap-1">
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
								</a>
							</li>
						{/if}
						<li>
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
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{timeToRead.minutes} min. à lire
						</li>
					</ul>
					<ul class="w-full hidden xl:flex gap-2 items-center justify-center xl:justify-start">
						<li>
							<a
								href="https://twitter.com/intent/tweet?url={encodeURIComponent(
									cleanUrl
								)}&text={encodeURIComponent(post.title)}&via=thoanny_"
								rel="noopener noreferrer"
								target="_blank"
								class="btn btn-circle btn-secondary text-white dark:text-gray-900"
								><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5"
									><path
										fill="currentColor"
										d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
									/></svg
								></a
							>
						</li>
						<li>
							<a
								href="https://www.facebook.com/sharer.php?u={encodeURIComponent(cleanUrl)}"
								rel="noopener noreferrer"
								target="_blank"
								class="btn btn-circle btn-secondary text-white dark:text-gray-900"
								><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-5 w-5"
									><path
										fill="currentColor"
										d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
									/></svg
								></a
							>
						</li>
						<li>
							<button
								class="btn btn-circle btn-secondary text-white dark:text-gray-900 clipboard"
								data-clipboard-text={cleanUrl}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-5 w-5">
									<path
										fill="currentColor"
										d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
									/>
								</svg>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<div id="content">
			{@html nbsp(post.content)}
		</div>
		{#if post.author}
			<div class="author">
				<img class="mask mask-hexagon" src={post.author.node.avatar.url} alt="" />
				<h4>{post.author.node.name}</h4>
				{#if post.author.node.description}
					<p>{post.author.node.description}</p>
				{/if}
			</div>
		{/if}
		<div>
			{#if post.tags}
				<span class="tags text-sm flex flex-wrap justify-center gap-4">
					{#each post.tags.nodes as tag}
						<a
							href="/mot-cle/{tag.slug}"
							class="btn btn-sm btn-outline dark:border-gray-200 dark:text-gray-200 rounded-full"
							>{tag.name}</a
						>
					{/each}
				</span>
			{/if}
		</div>
	</article>

	<div id="comments">
		{#if post.comments}
			<div id="comments-list">
				{#each post.comments.nodes as comment}
					<div class="chat chat-start mt-8">
						{#if comment.author.node.avatar}
							<div class="chat-image avatar">
								<div class="w-10 rounded-full">
									<img src={comment.author.node.avatar.url} alt={comment.author.node.name} />
								</div>
							</div>
						{/if}
						<div class="chat-header pl-4 mb-1">
							{comment.author.node.name}
							<time class="text-xs opacity-50">
								{new Date(Date.parse(comment.date))
									.toLocaleDateString('FR-fr', {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})
									.toUpperCase()}
							</time>
						</div>
						<div class="chat-bubble">{@html comment.content}</div>
					</div>
					{#if comment.replies}
						{#each comment.replies.nodes as reply}
							<div class="chat chat-end">
								{#if reply.author.node.avatar}
									<div class="chat-image avatar">
										<div class="w-10 rounded-full">
											<img src={reply.author.node.avatar.url} alt={reply.author.node.name} />
										</div>
									</div>
								{/if}
								<div class="chat-header pl-4 mb-1">
									{reply.author.node.name}
									<time class="text-xs opacity-50">
										{new Date(Date.parse(reply.date))
											.toLocaleDateString('FR-fr', {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit'
											})
											.toUpperCase()}
									</time>
								</div>
								<div class="chat-bubble chat-bubble-primary">{@html reply.content}</div>
							</div>
						{/each}
					{/if}
				{/each}
			</div>
		{/if}

		{#if post.commentStatus == 'open'}
			<AddComment postId={post.databaseId} />
		{/if}
	</div>
</div>

<style lang="scss">
	article {
		@apply text-lg;

		@screen xl {
			margin-top: calc(-37rem + 8rem);
		}

		.metas {
			@apply flex flex-wrap gap-4 whitespace-nowrap text-sm uppercase font-semibold text-gray-500 xl:text-white;

			li {
				@apply flex gap-2;

				svg {
					@apply text-gray-400 xl:text-white;
				}
			}
		}

		#content {
			@screen xl {
				@apply bg-gray-100 dark:bg-zinc-900 pt-16 rounded-2xl -mt-12 dark:text-gray-200;
			}
		}

		.author {
			@apply my-12 mx-auto text-center dark:text-gray-200;

			img {
				@apply mx-auto mb-4;
			}
		}
	}

	#comments {
		#comments-list {
			@apply max-w-2xl mx-auto my-8;
		}
	}
</style>
