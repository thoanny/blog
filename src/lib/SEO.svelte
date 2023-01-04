<script lang="ts">
	import { stripHtml } from 'string-strip-html';
	import { page } from '$app/stores';

	const url = new URL($page.url);
	const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;

	export let title: string;
	export let description: string;
	export let image: string = `${url.protocol}//${url.host}/preview.png`;

	title = title ? `${title} | Thoanny` : 'Thoanny';
	description = description
		? stripHtml(description).result
		: 'Blog de Thoanny, où sont partagés des actualités de ses projets personnels, des articles sur le thème du streaming, du jeu vidéo, et aussi des trucs et astuces, des recettes de cuisine...';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={cleanUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={cleanUrl} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
