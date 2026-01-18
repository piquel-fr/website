<script lang="ts">
    import NavNode from "./NavNode.svelte";
    import { page } from "$app/state";
    import NavButton from "../NavButton.svelte";

    let { node, depth = 0 } = $props();

    let isActiveRoute: boolean = page.url.pathname === node.path;
</script>

<ul class="nav-list" style="--depth: {depth}">
    <li class="m-1">
        <NavButton
            dest={node.path}
            className={"flex items-center gap-2 p-2 rounded-md hover:bg-gray-500 transition duration-500 " +
                (isActiveRoute ? "bg-gray-300" : "")}
        >
            <span class="flex-1">{node.name}</span>
            {#if node.children && node.children.length > 0}
                <button class="text-xl">›</button>
            {/if}
        </NavButton>

        {#if node.children && node.children.length > 0}
            {#each node.children as child}
                <NavNode node={child} depth={depth + 1} />
            {/each}
        {/if}
    </li>
</ul>

<style>
    .nav-list {
        padding-left: calc(var(--depth) * 1rem);
    }
</style>
