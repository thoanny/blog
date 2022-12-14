<script lang="ts">
    import { stripHtml } from "string-strip-html";
    import { page } from '$app/stores';

    export let title: string = 'Thoanny';
    export let description: string = '@TODO';
    export let image: string = '@TODO';

    description = stripHtml(description).result;

    const url = new URL($page.url);
    const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content="{title}">
  <meta name="description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{cleanUrl}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="{image}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{cleanUrl}">
  <meta property="twitter:title" content="{title}">
  <meta property="twitter:description" content="{description}">
  <meta property="twitter:image" content="{image}">
</svelte:head>