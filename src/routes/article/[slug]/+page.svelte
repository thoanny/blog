<script lang="ts">
  import { stripHtml } from "string-strip-html";
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import SEO from '$lib/SEO.svelte';

  export let data: PageData;
  export const post = data.post;

</script>

<SEO {...data.seo} />

<div>
  <article>
    <div class="metas metas--header">
      <span class="date">{(new Date(Date.parse(post.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}</span>
      {#if post.categories}
        <span class="categories">
          {#each post.categories.nodes as category}
            <a href="/categorie/{category.slug}">{category.name}</a>
          {/each}
        </span>
      {/if}
    </div>
    <h1>{post.title}</h1>
    {#if post.featuredImage}
      <img src="{post.featuredImage.node.mediaItemUrl}" alt="{post.featuredImage.node.altText}" class="rounded-xl w-full h-full">
    {/if}
    <div id="content">
      {@html post.content}
    </div>
    {#if post.author}
      <div class="author">
        <img class="mask mask-hexagon" src="{post.author.node.avatar.url}" alt="" />
        <h4>{post.author.node.name}</h4>
        <p>{post.author.node.description}</p>
      </div>
    {/if}
    <div class="metas">
      {#if post.tags}
        <span class="tags text-sm flex flex-wrap justify-center gap-4">
          {#each post.tags.nodes as tag}
            <a href="/mot-cle/{tag.slug}" class="btn btn-sm btn-outline rounded-full">{tag.name}</a>
          {/each}
        </span>
      {/if}
    </div>
  </article>
</div>

<style lang="scss">
  article {
    @apply text-lg;

    .metas {
      @apply flex justify-center gap-4;

      &--header {
        @apply text-sm uppercase font-semibold text-gray-400;

        a {
          @apply text-gray-900;

          &:hover, &:active {
            @apply text-gray-600;
          }
        }
      }
    }

    h1 {
      @apply text-6xl font-bold text-center mb-12 mt-2;
    }

    .author {
      @apply my-12 mx-auto text-center;

      img {
        @apply mx-auto mb-4;
      }
    }
  }
</style>