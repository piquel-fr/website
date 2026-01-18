<script lang="ts">
    import type { NavTree } from "$types/docs";
    import NavNode from "$lib/components/docs/NavNode.svelte";

    let { children } = $props();

    const nav: NavTree[] = [
        {
            name: "Home",
            path: "/docs",
        },
        {
            name: "API",
            path: "/docs/api",
            children: [
                { name: "Auth", path: "/docs/api/auth" },
                { name: "Profile", path: "/docs/api/profile" },
                {
                    name: "Email",
                    path: "/docs/api/email",
                    children: [
                        { name: "Accounts", path: "/docs/api/email/accounts" },
                        { name: "Inboxes", path: "/docs/api/email/inboxes" },
                    ],
                },
            ],
        },
        { name: "Docs", path: "/docs/docs" },
    ];
</script>

<div class="flex w-max">
    <nav>
        {#each nav as node}
            <NavNode {node} />
        {/each}
    </nav>
    <div class="">
        {@render children()}
    </div>
</div>
