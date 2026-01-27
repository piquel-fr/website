<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import TextInput from "$lib/components/input/TextInput.svelte";
    import { profile } from "$lib/api/client";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    let username: string = $derived(data.settings.profile.username);
    let name: string = $derived(data.settings.profile.name);
    let image: string = $derived(data.settings.profile.image);

    let error: string = $state("");

    async function updateProfile() {
        const response = await profile.PUT("/{user}", {
            params: { path: { user: data.profile.username } },
            body: {
                username: username,
                image: image,
                name: name,
            },
        });

        if (response.response.status != 200) {
            error = response.data!;
            return;
        }

        invalidateAll();
    }
</script>

<form
    id="update-profile"
    onsubmit={(e) => e.preventDefault()}
    class="flex flex-col"
>
    <TextInput label="Username" bind:value={username} />
    <TextInput label="Name" bind:value={name} />
    <TextInput label="Image" bind:value={image} />

    <p class="text-red-500 font-bold text-sm">{error}</p>

    <Button className="mt-2 p-1" onclick={updateProfile} form="update-profile">
        Save
    </Button>
</form>
