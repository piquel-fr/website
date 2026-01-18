<script lang="ts">
    import type { NavTree } from "$types/docs";
    import Nav from "$lib/components/docs/Nav.svelte";

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
                { name: "Email", path: "/docs/api/email" },
            ],
        },
        { name: "Docs", path: "/docs/docs" },
    ];
</script>

<div class="flex">
    <Nav nodes={nav}></Nav>
    <div>
        {@render children()}
    </div>
</div>
