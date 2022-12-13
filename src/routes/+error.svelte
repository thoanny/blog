<script lang="ts">
    import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Erreur {$page.status} : {$page.error?.message}</title>
</svelte:head>

<div class="flex items-center justify-center text-center h-full py-6">
    <div class="flex flex-col gap-6">
        <div class="text-9xl font-bold text-primary">
            {$page.status}
        </div>
        <div class="font-semibold text-2xl">
            {$page.error?.message}
        </div>
        <a href="/" class="btn btn-primary btn-outline  rounded-full">Retourner à l'accueil</a>
    </div>
</div>

<style>
    .h-full {
        height: calc(100vh - 8rem - 6rem);
        min-height: 20rem;
    }
</style>