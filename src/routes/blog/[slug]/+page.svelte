<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div>
  <div class="metas">
    <span class="date">{(new Date(Date.parse(data.post.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}</span>
    {#if data.post.categories}
      <span class="categories">
        {#each data.post.categories.nodes as category}
          <a href="/blog/categorie/{category.slug}">{category.name}</a>
        {/each}
      </span>
    {/if}
  </div>
  <h1>{data.post.title}</h1>
  {#if data.post.featuredImage}
    <img src="{data.post.featuredImage.node.sourceUrl}" alt="{data.post.featuredImage.node.altText}">
  {/if}
  <div class="content">
    {@html data.post.content}
  </div>
  {#if data.post.author}
    <div class="author">
      <img src="{data.post.author.node.avatar.url}" alt="">
      <p>{data.post.author.node.description}</p>
    </div>
  {/if}
  <div class="metas">
    {#if data.post.tags}
      <span class="tags">
        {#each data.post.tags.nodes as tag}
          <a href="/blog/mot-cle/{tag.slug}">{tag.name}</a>
        {/each}
      </span>
    {/if}
  </div>
</div>
