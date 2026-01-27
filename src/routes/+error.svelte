<script lang="ts">
    import { page } from "$app/state";
</script>

<p class="text-8xl">
    {page.status}: {page.error?.message}
</p>
