<script lang="ts">
    import type { LayoutProps } from "./$types";
    import '$lib/styles/headers.css';

    let { data, children }: LayoutProps = $props();
</script>

<div>
    {@html data.summary}
    {@render children()}
</div>
