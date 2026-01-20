<script lang="ts">
    import {
        Info,
        TriangleAlert,
        CircleX,
        CircleCheck,
    } from "@lucide/svelte/icons";
    import type { Component } from "svelte";

    let { type, children } = $props();

    const configs: {
        [key: string]: { styles: string; icon: Component };
    } = {
        info: {
            styles: "bg-blue-300 border-blue-800 text-blue-900",
            icon: Info,
        },
        warning: {
            styles: "bg-yellow-300 border-yellow-700 text-yellow-900",
            icon: TriangleAlert,
        },
        danger: {
            styles: "bg-red-300 border-red-800 text-red-900",
            icon: CircleX,
        },
        success: {
            styles: "bg-green-300 border-green-800 text-green-900",
            icon: CircleCheck,
        },
    };

    const config = configs[type];
    const Icon = config.icon;
</script>

<div class={`flex my-4 rounded-r-lg border-l-4 p-4 ${config.styles}`}>
    <Icon class="h-5 w-5 shrink-0 m-1" />
    <div class="min-w-0 pl-3">{@render children()}</div>
</div>
