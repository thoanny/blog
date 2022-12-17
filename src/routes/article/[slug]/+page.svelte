<script lang="ts">
  import { stripHtml } from "string-strip-html";
  import { readingTime } from 'reading-time-estimator';
  import type { PageData } from './$types';

  import SEO from '$lib/SEO.svelte';
  import AddComment from '$lib/AddComment.svelte';

  export let data: PageData;
  export const post = data.post;

  const timeToRead = readingTime(stripHtml(post.content).result, 150, 'fr');

</script>

<SEO {...data.seo} />

<div>
  <article>
    <div class="metas metas--header">
      <span class="date flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>        
        {(new Date(Date.parse(post.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
      </span>
      {#if post.categories}
        <span class="categories flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
          </svg>
          {#each post.categories.nodes as category}
            <a href="/categorie/{category.slug}">{category.name}</a>
          {/each}
        </span>
      {/if}
      {#if post.commentCount > 0}
        <a href="#comments" class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>          
          {post.commentCount} {(post.commentCount < 2) ? 'commentaire' : 'commentaires'}
        </a>
      {/if}
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>        
        {timeToRead.minutes} min. à lire
      </span>
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

  <div id="comments">
    {#if post.comments}
      <div id="comments-list">
        {#each post.comments.nodes as comment}
          <div class="chat chat-start mt-8">
            {#if comment.author.node.avatar}
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img src="{comment.author.node.avatar.url}" alt="{comment.author.node.name}" />
                </div>
              </div>
            {/if}
            <div class="chat-header pl-4 mb-1">
              {comment.author.node.name}
              <time class="text-xs opacity-50">
                {(new Date(Date.parse(comment.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
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
                      <img src="{reply.author.node.avatar.url}" alt="{reply.author.node.name}" />
                    </div>
                  </div>
                {/if}
                <div class="chat-header pl-4 mb-1">
                  {reply.author.node.name}
                  <time class="text-xs opacity-50">
                    {(new Date(Date.parse(reply.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
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

    .metas {
      @apply flex justify-center gap-4;

      &--header {
        @apply text-sm uppercase font-semibold text-gray-900 mb-4;

        svg {
          @apply text-gray-400;
        }

        a {

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

  #comments {
    #comments-list {
      @apply max-w-2xl mx-auto my-8;
    }
  }
</style>