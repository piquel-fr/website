<script lang="ts">
    import Card from "./Card.svelte";

    let {
        className = '',
        popOut = true,
        useCardClasses = true,
        dest = '/',
        newTab = false,
        children
    } = $props()
    
</script>

<a href={dest} target={newTab ? "_blank" : ""}>
    <Card {popOut} {className} useDefaultClasses={useCardClasses}>
        {@render children()}
    </Card>
</a>
