<script lang="ts">
    import { Plus, Trash2, Edit3 } from "@lucide/svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const mailAccounts = [
        { id: 1, email: "user1@example.com", name: "Personal Email" },
        { id: 2, email: "user2@example.com", name: "Work Email" },
    ];

    async function deleteAccount(id: number) {
        if (confirm("Are you sure you want to delete this account?")) {
            // TODO: Call API to delete account
            console.log("Deleting account", id);
        }
    }
</script>

<div class="w-full max-w-2xl">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Mail Accounts</h1>
        <NavButton
            className="p-2 px-4 rounded flex items-center gap-2"
            dest="/settings/mail/new"
            popOut={false}
        >
            <Plus size={20} />
        </NavButton>
    </div>

    {#if mailAccounts.length === 0}
        <p class="text-gray-500">No mail accounts configured yet.</p>
    {:else}
        <div class="space-y-4">
            {#each mailAccounts as account (account.id)}
                <div class="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                        <p class="font-semibold">{account.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{account.email}</p>
                    </div>
                    <div class="flex gap-2">
                        <NavButton
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            dest={`/settings/mail/${account.id}/edit`}
                            popOut={false}
                        >
                            <Edit3 size={18} />
                        </NavButton>
                        <button
                            onclick={() => deleteAccount(account.id)}
                            class="p-2 rounded hover:bg-red-200 dark:hover:bg-red-700"
                        >
                            <Trash2 size={18} class="text-red-600" />
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
