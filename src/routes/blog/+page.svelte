<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div>
    <h1>Blog</h1>
    {#each data.posts as post}
        <li><a href="/blog/{post.slug}">{post.title}</a></li>
    {/each}
</div>
