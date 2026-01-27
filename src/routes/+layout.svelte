<script lang="ts">
    // Import Styles
    import "$lib/styles/global.css";
    import type { LayoutProps } from "./$types";

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>The Piquel Zone</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white">
    {@render children()}
</div>
