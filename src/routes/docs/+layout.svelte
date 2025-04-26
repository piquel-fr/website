<script lang="ts">
    import type { LayoutProps } from "./$types";

    let { data, children }: LayoutProps = $props();
</script>

<div>
{@html data.summary}
{@render children()}
</div>
