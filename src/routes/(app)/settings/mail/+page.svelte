<script lang="ts">
    import { Plus, Trash2, Edit3 } from "@lucide/svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import { email } from "$lib/api/client";
    import { goto } from "$app/navigation";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    let mailAccounts = $state([
        { id: 1, email: "user1@example.com", name: "Personal Email" },
        { id: 2, email: "user2@example.com", name: "Work Email" },
    ]);

    async function deleteAccount(id: number) {
        if (confirm("Are you sure you want to delete this account?")) {
            try {
                // find account by id to get email
                const account = mailAccounts.find((a) => a.id === id);
                if (account) {
                    await email.delete({ path: { email: account.email } });
                    // remove from local list
                    mailAccounts = mailAccounts.filter((a) => a.id !== id);
                }
            } catch (err) {
                console.error("Failed to delete account", err);
                alert("Unable to delete account. Please try again.");
            }
        }
    }
</script>

<div class="w-full max-w-3xl mx-auto flex flex-col">
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
                <div class="flex items-center justify-between p-4 border rounded-sm bg-gray-100 dark:bg-gray-100">
                    <div>
                        <p class="font-semibold text-black dark:text-black">{account.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{account.email}</p>
                    </div>
                    <div class="flex gap-2">
                        <NavButton
                            className="p-2 rounded"
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
