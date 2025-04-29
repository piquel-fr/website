<script lang="ts">
    import type { LayoutProps } from "./$types";

    let { data, children }: LayoutProps = $props();
</script>

<div>
    <div>
        {@html data.summary}
    </div>
    <div>
        {@render children()}
    </div>
</div>
