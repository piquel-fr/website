<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import TextInput from "$lib/components/input/TextInput.svelte";
    import { users } from "$lib/api/client";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    let username: string = $derived(data.settings.user.username);
    let name: string = $derived(data.settings.user.name);
    let image: string = $derived(data.settings.user.image);

    let error: string = $state("");

    async function updateProfile() {
        const response = await users.PUT("/{user}", {
            params: { path: { user: data.user.username } },
            body: {
                username: username,
                image: image,
                name: name,
            },
        });

        error = "";
        if (response.response.status != 200) {
            error = response.error!;
            return;
        }

        invalidateAll();
    }
</script>

<form
    id="update-user"
    onsubmit={(e) => e.preventDefault()}
    class="flex flex-col"
>
    <TextInput label="Username" bind:value={username} />
    <TextInput label="Name" bind:value={name} />
    <TextInput label="Image" bind:value={image} />

    <p class="text-red-500 font-bold text-sm">{error}</p>

    <Button className="mt-2 p-1" onclick={updateProfile} form="update-user">
        Save
    </Button>
</form>
