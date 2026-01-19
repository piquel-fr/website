<script lang="ts">
    import "$lib/styles/prism-vsc-dark-plus.css";

    let { title, children } = $props();
</script>

<svelte:head>
    {#if title != undefined}
        <title>{title}</title>
    {/if}
</svelte:head>

<article class="prose max-w-none">
    {@render children()}
</article>
