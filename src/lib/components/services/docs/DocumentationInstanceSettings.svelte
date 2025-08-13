<script lang="ts">
    import TextInput from "$lib/components/input/TextInput.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import CheckBoxInput from "$lib/components/input/CheckBoxInput.svelte";
    import api from "$lib/utils/api";

    let { doc, onsave, oncancel, ondelete } = $props();

    let name: string = $state(doc.name);
    let repo: string = $state(doc.repoOwner + "/" + doc.repoName);
    let ref: string = $state(doc.repoRef);
    let root: string = $state(doc.root);
    let isPublic: boolean = $state(doc.public);

    let error: string = $state("");

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

        const response = await api.request(`/docs/${doc.name}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(updatedDoc),
        });

        if (response.status != 200) {
            error = await response.text();
            return;
        }

        onsave();
    }

    async function deleteInstance() {
        if (!confirm(`Are you sure you want to delete ${doc.name}?`)) return;
        const response = await api.request(`/docs/${doc.name}`, {
            method: "DELETE",
        });

        if (response.status != 200) {
            error = await response.text();
            return;
        }

        ondelete();
    }
</script>

<div class="w-fit">
    <TextInput label="Name" bind:value={name} />
    <TextInput label="Repository" bind:value={repo} />
    <TextInput label="Branch/Tag" bind:value={ref} />
    <TextInput label="Root" bind:value={root} />
    <CheckBoxInput label="Public" bind:checked={isPublic} />

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
                onclick={oncancel}
                form="update-profile">Cancel</Button
            >
        </div>
        <Button
            className="p-1 text-red-600 border-red-600 border-2"
            onclick={deleteInstance}
            form="update-profile">Delete Instance</Button
        >
    </Card>
</div>
