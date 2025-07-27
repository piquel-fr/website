<script lang="ts">
    import DocumentationInstanceSettings from "$lib/components/services/DocumentationInstanceSettings.svelte";
    let { data } = $props();
</script>

<DocumentationInstanceSettings doc={data.doc} />
