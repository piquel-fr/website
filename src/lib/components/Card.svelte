<script lang="ts">
    let { 
        hoverScale = 110,
        popOut = true,
        className = "",
        useDefaultClasses = true,
        children
    } = $props()
</script>

<div class="{className}
    {popOut ? 'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-' + hoverScale : ''}
    {useDefaultClasses ? 'rounded-md bg-gray-100 shadow' : ''}
">{@render children()}</div>
