<script lang="ts">
    import { X } from "@lucide/svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import { email } from "$lib/api/client";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";

    let { data, params }: PageProps = $props();

    let account = $state(null);
    let loading = $state(true);

    async function fetchAccount() {
        try {
            const res = await email.get({ path: { email: params.id } });
            if (res.data) {
                account = res.data;
            }
        } catch (err) {
            console.error("Failed to fetch account", err);
        } finally {
            loading = false;
        }
    }

    onMount(fetchAccount);

    let newUserInput = $state("");

    function addUser() {
        if (newUserInput.trim()) {
            // TODO: Call API to add user to account
            console.log("Adding user:", newUserInput);
            newUserInput = "";
        }
    }

    function removeUser(userId: number) {
        // TODO: Call API to remove user from account
        console.log("Removing user", userId);
    }

    async function deleteAccount() {
        if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
            try {
                await email.delete({ path: { email: account.email } });
                goto('/settings/mail');
            } catch (err) {
                console.error("Failed to delete account", err);
                alert("Failed to delete account. Please try again.");
            }
        }
    }
</script>

<div class="w-full max-w-3xl mx-auto flex flex-col">
    <NavButton
        className="mb-6 p-2 px-4 rounded text-black"
        dest="/settings/mail"
        popOut={false}
    >
        ← Back to Mail Accounts
    </NavButton>

    {#if loading}
        <p>Loading account details...</p>
    {:else if account}
        <h1 class="text-3xl font-bold mb-6 text-black dark:text-black">Manage Account: {account.name}</h1>

        <div class="bg-gray-100 dark:bg-gray-100 p-6 rounded-lg mb-6">
            <p class="text-sm text-black dark:text-black mb-2">Email Address</p>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-800">{account.email}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Read-only: Cannot be changed</p>
        </div>

        <div>
            <h2 class="text-2xl font-bold mb-4">Share Account</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
                This account is currently shared with {account.sharedWith?.length || 0} user(s).
            </p>

            {#if account.sharedWith && account.sharedWith.length > 0}
                <div class="space-y-2 mb-6">
                    {#each account.sharedWith as user (user.id)}
                        <div class="flex items-center justify-between p-3 border rounded-lg bg-gray-100 dark:bg-gray-100">
                            <p class="font-medium text-gray-900 dark:text-gray-800">{user.username}</p>
                            <button
                                onclick={() => removeUser(user.id)}
                                class="p-1 rounded hover:bg-red-200 dark:hover:bg-red-700"
                            >
                                <X size={18} class="text-red-600" />
                            </button>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-gray-500 mb-6">This account is not shared with anyone yet.</p>
            {/if}

            <div class="border-t pt-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Share with another user (Note: User search not yet available)
                </p>
                <div class="flex gap-2">
                    <input
                        type="text"
                        placeholder="Username"
                        bind:value={newUserInput}
                        onkeypress={(e) => e.key === "Enter" && addUser()}
                        class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onclick={addUser}
                        class="px-6 py-2 bg-gray-100 hover:bg-sky-100 text-black rounded-lg"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>

        <div class="border-t pt-4 mt-6">
            <h3 class="text-lg font-semibold mb-2 text-red-600">Danger Zone</h3>
            <p class="text-sm text-gray-600 mb-4">Deleting this account will permanently remove it and all associated data.</p>
            <button onclick={deleteAccount} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete Account</button>
        </div>
    {:else}
        <p>Account not found.</p>
    {/if}
</div>
