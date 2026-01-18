<script lang="ts">
    import NavNode from "./NavNode.svelte";
    import type { NavTree } from "$types/docs";

    let { nodes }: { nodes: NavTree[] } = $props();
</script>

<NavNode {nodes} depth={0} />
