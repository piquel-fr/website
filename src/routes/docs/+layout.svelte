<script lang="ts">
    import NavNode from "$lib/components/docs/NavNode.svelte";
    import type { NavTree } from "$types/docs";

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

<div class="flex min-h-screen w-full bg-white text-gray-800">
    <nav
        class="w-72 border-r border-gray-200 bg-gray-50 px-4 py-6 overflow-y-auto"
    >
        <h2
            class="mb-4 px-2 font-bold text-gray-500"
        >
            Documentation
        </h2>
        <ul class="space-y-1">
            {#each nav as node}
                <NavNode {node} />
            {/each}
        </ul>
    </nav>

    <main class="flex-1 p-8">
        {@render children()}
    </main>
</div>
