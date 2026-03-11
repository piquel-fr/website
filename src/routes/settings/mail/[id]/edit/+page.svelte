<script lang="ts">
    import { X } from "@lucide/svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import type { PageProps } from "./$types";

    let { data, params }: PageProps = $props();

    // Mock data - replace with actual API call
    const account = {
        id: parseInt(params.id),
        email: "user1@example.com",
        name: "Personal Email",
        sharedWith: [
            { id: 1, username: "john_doe" },
            { id: 2, username: "jane_smith" },
        ],
    };

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
</script>

<div class="w-full max-w-3xl mx-auto flex flex-col py-8">
    <NavButton
        className="mb-6 p-2 px-4 rounded text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        dest="/settings/mail"
        popOut={false}
    >
        ← Back to Mail Accounts
    </NavButton>

    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Manage Account: {account.name}</h1>

    <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Email Address</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{account.email}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Read-only: Cannot be changed</p>
    </div>

    <div>
        <h2 class="text-2xl font-bold mb-4">Share Account</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
            This account is currently shared with {account.sharedWith.length} user(s).
        </p>

        {#if account.sharedWith.length > 0}
            <div class="space-y-2 mb-6">
                {#each account.sharedWith as user (user.id)}
                    <div class="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-700">
                        <p class="font-medium text-gray-900 dark:text-gray-100">{user.username}</p>
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
                    class="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onclick={addUser}
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</div>
