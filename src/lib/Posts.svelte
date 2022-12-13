<script lang="ts">
    export let posts;
</script>


<div>
    {#if posts}

    <div class="grid grid-cols-3 gap-6">
        {#each posts as post}
            <a class="card w-full bg-primary shadow-xl image-full aspect-video" href="/article/{post.slug}">
                {#if post.featuredImage}
                    <figure>
                        <img src="{post.featuredImage.node.mediaItemUrl}" class="object-cover w-full h-full" alt="Shoes" />
                    </figure>
                {/if}
                <div class="card-body items-center justify-center">
                    <h2 class="card-title">{post.title}</h2>
                </div>
            </a>
        {/each}
    </div>
    
    {:else}
        <p>Aucun article...</p>
    {/if}
</div>
