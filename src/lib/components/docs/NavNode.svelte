<script lang="ts">
    import NavNode from "./NavNode.svelte";
    import { page } from "$app/state";
    import NavButton from "../NavButton.svelte";

    let { node, depth = 0 } = $props();

    let isExpanded = $state(false);
    let hasChildren = $derived(node.children && node.children.length > 0);

    let isActiveRoute = $derived(page.url.pathname === node.path);

    function toggleExpand() {
        isExpanded = !isExpanded;
    }

    const itemClasses = $derived(
        `group flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-200 ease-in-out 
        ${isActiveRoute ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`,
    );
</script>

<li class="relative select-none" style="padding-left: {depth * 4}px">
    <NavButton popOut={false} dest={node.path} className={itemClasses}>
        <span class="flex items-center gap-3">
            <span id="node-title">{node.name}</span>
            {#if hasChildren}
                <button onclick={toggleExpand} aria-labelledby="node-title">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-500 transition-transform duration-200 {isExpanded
                            ? 'rotate-90'
                            : ''}"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            {/if}
        </span>
    </NavButton>

    {#if hasChildren && isExpanded}
        <ul class="mt-1 space-y-1">
            {#each node.children as child}
                <NavNode node={child} depth={depth + 1} />
            {/each}
        </ul>
    {/if}
</li>
