<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let profile = data.settings.profile;

    let username: string = $state(profile.username);
    let name: string = $state(profile.name);
    let image: string = $state(profile.image);
</script>

<form id="update-profile" method="POST" class="flex flex-col">
    <label class="mb-1">
        <p class="text-sm text-gray-600">Username</p>
        <input
            class="rounded-md border-gray-400 bg-gray-100 border-2 p-1"
            bind:value={username}
            name="username"
            type="text"
        />
    </label>

    <label class="mb-1">
        <p class="text-sm text-gray-600">Name</p>
        <input
            class="rounded-md border-gray-400 bg-gray-100 border-2 p-1"
            bind:value={name}
            name="name"
            type="text"
        />
    </label>

    <label class="mb-1">
        <p class="text-sm text-gray-600">Image</p>
        <input
            class="rounded-md border-gray-400 bg-gray-100 border-2 p-1"
            bind:value={image}
            name="image"
            type="text"
        />
    </label>

    <Button className="mt-2" type="submit" form="update-profile">Save</Button>
</form>
