<script lang="ts">
    import TextInput from "$lib/components/input/TextInput.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";

    let { doc } = $props();

    let name: string = $state(doc.name);
    let repo: string = $state(doc.repoOwner + "/" + doc.repoName);
    let ref: string = $state(doc.repoRef);
    let root: string = $state(doc.root);
    let pathPrefix: string = $state(doc.pathPrefix);
    let highlightStyle: string = $state(doc.highlightStyle);
    let isPublic: boolean = $state(doc.public);
    let fullPage: boolean = $state(doc.fullPage);
    let useTailwind: boolean = $state(doc.useTailwind);

    async function testRepository() {}
    async function updateInstance() {}
    async function transferInstance() {}
    async function deleteInstance() {}
</script>

<Card popOut={false} className="p-1 my-1">
    <TextInput label="Name" bind:value={name} />
    <TextInput label="Repository" bind:value={repo} />
    <TextInput label="Branch/Tag" bind:value={ref} />
    <TextInput label="Root" bind:value={root} />
    <TextInput label="Path prefix" bind:value={pathPrefix} />
    <TextInput label="Highlight style" bind:value={highlightStyle} />
    <Card
        popOut={false}
        className="w-fill flex-col mt-1 p-2 bg-gray-300 flex gap-2"
    >
        <div class="flex-row w-fill flex gap-2">
            <Button
                fullWidth={true}
                className="w-full p-1 min-w-20 text-gray-500 border-gray-500 border-2"
                onclick={updateInstance}
                form="update-profile">Save</Button
            >
            <Button
                fullWidth={true}
                className="w-full p-1 min-w-20 text-gray-500 border-gray-500 border-2"
                onclick={testRepository}
                form="update-profile">Test</Button
            >
        </div>
        <Button
            className="p-1 text-red-600 border-red-600 border-2"
            onclick={transferInstance}
            form="update-profile">Transfer Instance</Button
        >
        <Button
            className="p-1 text-red-600 border-red-600 border-2"
            onclick={deleteInstance}
            form="update-profile">Delete Instance</Button
        >
    </Card>
</Card>
