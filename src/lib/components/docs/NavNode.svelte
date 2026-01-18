<script lang="ts">
    import NavNode from "./NavNode.svelte";
    import type { NavTree } from "$types/docs";
    import { page } from "$app/state";

    let { nodes, depth }: { nodes: NavTree[]; depth: number } = $props();

    // Check if current path matches or is a child of this node
    function isActiveRoute(nodePath: string): boolean {
        return (
            page.url.pathname === nodePath ||
            page.url.pathname.startsWith(nodePath + "/")
        );
    }
</script>

<ul class="nav-list" style="--depth: {depth}">
    {#each nodes as node}
        <li class="nav-item">
            <a
                href={node.path}
                class="nav-link"
                class:active={isActiveRoute(node.path)}
                aria-current={isActiveRoute(node.path) ? "page" : undefined}
            >
                <span class="name">{node.name}</span>
                {#if node.children && node.children.length > 0}
                    <span class="chevron">›</span>
                {/if}
            </a>

            {#if node.children && node.children.length > 0}
                <NavNode nodes={node.children} depth={depth + 1} />
            {/if}
        </li>
    {/each}
</ul>

<style>
    .nav-list {
        list-style: none;
        padding-left: calc(var(--depth) * 1rem);
        margin: 0;
    }

    .nav-item {
        margin: 0.25rem 0;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        text-decoration: none;
        color: #333;
        border-radius: 0.375rem;
        transition: background-color 0.2s;
    }

    .nav-link:hover {
        background-color: #f3f4f6;
    }

    .nav-link.active {
        background-color: #e0e7ff;
        color: #4f46e5;
        font-weight: 500;
    }

    .name {
        flex: 1;
    }

    .chevron {
        font-size: 1.25rem;
        color: #9ca3af;
        transition: transform 0.2s;
    }

    .nav-item:has(.active) > .nav-link .chevron {
        transform: rotate(90deg);
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        .nav-link {
            color: #e5e7eb;
        }

        .nav-link:hover {
            background-color: #374151;
        }

        .nav-link.active {
            background-color: #3730a3;
            color: #c7d2fe;
        }
    }
</style>
