<script lang="ts">
    export let posts;

    $: featuredPosts = (posts.length >= 4) ? posts.slice(0, 4) : [];
    $: otherPosts = (posts.length >= 4) ? posts.slice(4, -1) : posts;
</script>

<div>
    {#if posts}
        <div class="grid md:grid-cols-2 gap-6">
            {#each featuredPosts as post}
                <a class="card image-full" href="/article/{post.slug}">
                    {#if post.featuredImage}
                        <figure>
                            <img src="{post.featuredImage.node.mediaItemUrl}" class="object-cover w-full h-full" alt="Shoes" />
                        </figure>
                    {/if}
                    <div class="card-body items-center justify-center text-center">
                        <h2 class="card-title">{post.title}</h2>
                        <span>{(new Date(Date.parse(post.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                </a>
            {/each}
        </div>

        <div class="mt-8">
            {#each otherPosts as post}
                <a class="flex gap-8 mt-6 items-center" href="/article/{post.slug}">
                    {#if post.featuredImage}
                        <figure class="w-1/6">
                            <img src="{post.featuredImage.node.mediaItemUrl}" class="object-cover w-full h-full rounded-xl aspect-square" alt="Shoes" />
                        </figure>
                    {/if}
                    <div class="w-5/6 flex flex-col gap-2">
                        <h2 class="text-lg font-bold">{post.title}</h2>
                        {@html post.excerpt}
                        <div class="text-gray-400 text-sm font-semibold">{(new Date(Date.parse(post.date))).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}</div>
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
</style>