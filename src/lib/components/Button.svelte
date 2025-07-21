<script lang="ts">
    import Card from "./Card.svelte";

    let {
        className = "hover:bg-gray-300 click:bg-gray-700",
        type = undefined,
        form = "",
        popOut = false,
        useCardClasses = true,
        fullWidth = false,
        children,
        onclick,
    } = $props();

    // export let className = '';
    // export let type: 'button' | 'submit' | undefined | null = undefined;
    // export let form: string;
    // export let popOut = false;
    // export let useCardClasses = true;
    // export let fullWidth = false;
</script>

<button class={fullWidth ? "w-full" : ""} {onclick} {type} {form}>
    <Card {popOut} {className} useDefaultClasses={useCardClasses}>
        {@render children()}
    </Card>
</button>
