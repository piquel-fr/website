<script lang="ts">
    import TextInput from "$lib/components/input/TextInput.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import { PUBLIC_API } from "$env/static/public";

    let { doc, updated } = $props();

    let name: string = $state(doc.name);
    let repo: string = $state(doc.repoOwner + "/" + doc.repoName);
    let ref: string = $state(doc.repoRef);
    let root: string = $state(doc.root);
    let isPublic: boolean = $state(doc.public);

    let error: string = $state("");

    async function testRepository() {
        alert("not implemented yet");
    }

    async function updateInstance() {
        const repoSplit = repo.split("/");
        const repoOwner = repoSplit[0];
        const repoName = repoSplit[1];
        const updatedDoc = {
            name,
            repoOwner,
            repoName,
            repoRef: ref,
            root,
            public: isPublic,
        };

        const response = await fetch(`${PUBLIC_API}/docs/${doc.name}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "PUT",
            body: JSON.stringify(updatedDoc),
        });

        if (response.status != 200) {
            error = await response.text();
            return;
        }

        updated(false);
    }

    async function deleteInstance() {
        // TODO: confirmation for deletion
        const response = await fetch(`${PUBLIC_API}/docs/${doc.name}`, {
            credentials: "include",
            method: "DELETE",
        });

        if (response.status != 200) {
            error = await response.text();
            return;
        }

        updated(true);
    }
</script>

<Card popOut={false} className="w-fit p-1 my-1">
    <TextInput label="Name" bind:value={name} />
    <TextInput label="Repository" bind:value={repo} />
    <TextInput label="Branch/Tag" bind:value={ref} />
    <TextInput label="Root" bind:value={root} />

    <p class="text-red-500 font-bold text-sm">{error}</p>

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
            onclick={deleteInstance}
            form="update-profile">Delete Instance</Button
        >
    </Card>
</Card>
