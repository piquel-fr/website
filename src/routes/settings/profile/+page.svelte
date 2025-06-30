<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let profile = data.settings.profile;

    let username: string = $state(profile.username);
    let name: string = $state(profile.name);
    let image: string = $state(profile.image);
</script>

<form id="update-profile" method="POST">
    <input bind:value={username} name="username" type="text" />
    <input bind:value={name} name="name" type="text" />
    <input bind:value={image} name="image" type="text" />

    <Button type="submit" form="update-profile">Save</Button>
</form>
