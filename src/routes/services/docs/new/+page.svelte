<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import CheckBoxInput from "$lib/components/input/CheckBoxInput.svelte";
    import TextInput from "$lib/components/input/TextInput.svelte";
    import api from "$lib/api";

    let error: string = $state("");
    let repo: string = $state("");

    let doc = $state({
        name: "mydocsinstance",
        repoOwner: "my",
        repoName: "repo",
        repoRef: "main",
        root: "index.md",
        public: true,
    });

    $effect(() => {
        const repoSplit = repo.split("/");
        doc.repoOwner = repoSplit[0];
        doc.repoName = repoSplit[1];
    });

    async function createInstance() {
        const response = await api.request("/docs/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(doc),
        });

        if (response.status != 200) {
            error = await response.text();
            return;
        }

        goto(`/services/docs/${doc.name}`);
    }
</script>

<form id="new-instance" onsubmit={(e) => e.preventDefault()}>
    <TextInput label="Name" bind:value={doc.name} />
    <TextInput label="Repository" bind:value={repo} />
    <TextInput label="Branch/Tag" bind:value={doc.repoRef} />
    <TextInput label="Root" bind:value={doc.root} />
    <CheckBoxInput label="Public" bind:checked={doc.public} />

    <p class="text-red-500 font-bold text-sm">{error}</p>

    <Button
        fullWidth={true}
        form="new-instance"
        className="mt-4 w-full p-1 min-w-20 text-gray-500 border-gray-500 border-2"
        onclick={createInstance}>Create</Button
    >
</form>
