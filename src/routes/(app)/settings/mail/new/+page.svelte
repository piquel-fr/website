<script lang="ts">
    import NavButton from "$lib/components/NavButton.svelte";
    import Button from "$lib/components/Button.svelte";
    import type { PageProps } from "./$types";
    import { email } from "$lib/api/client";
    import { goto } from "$app/navigation";
    import { PUBLIC_API } from "$env/static/public";

    let { data }: PageProps = $props();

    let form = $state({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    let loading = $state(false);
    let error = $state("");

    async function handleSubmit(e: Event) {
        e.preventDefault();
        loading = true;
        error = "";

        // Validate form
        if (!form.name || !form.email || !form.username || !form.password) {
            error = "All fields are required";
            loading = false;
            return;
        }

        if (!form.email.includes("@")) {
            error = "Please enter a valid email address";
            loading = false;
            return;
        }

        try {
            // call the API
            const response = await fetch(`${PUBLIC_API}/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    username: form.username,
                    password: form.password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            // redirect after success
            goto('/settings/mail');
        } catch (err) {
            console.error(err);
            error = err instanceof Error ? err.message : "Failed to create account. Please try again.";
        } finally {
            loading = false;
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

    <h1 class="text-3xl font-bold mb-6 text-black dark:text-black">Add New Mail Account</h1>

    <form onsubmit={handleSubmit} class="space-y-6">
        {#if error}
            <div class="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                <p class="text-red-800 dark:text-red-200">{error}</p>
            </div>
        {/if}

        <div>
            <label for="name" class="block text-sm font-medium mb-2 text-black dark:text-black">
                Display Name
            </label>
            <input
                type="text"
                id="name"
                placeholder="e.g., Personal Email, Work Email"
                bind:value={form.name}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">A friendly name to identify this account</p>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium mb-2 text-black dark:text-black">
                Email Address
            </label>
            <input
                type="email"
                id="email"
                placeholder="user@example.com"
                bind:value={form.email}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">The email address for this account</p>
        </div>

        <div>
            <label for="username" class="block text-sm font-medium mb-2 text-black dark:text-black">
                Username
            </label>
            <input
                type="text"
                id="username"
                placeholder="user@example.com or username"
                bind:value={form.username}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Login credentials for connecting to the email account</p>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium mb-2 text-black dark:text-black">
                Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="••••••••"
                bind:value={form.password}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Password for connecting to the email account</p>
        </div>

        <div class="flex gap-3 pt-4">
            <button
                type="submit"
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Account"}
            </button>
            <NavButton
                className="px-6 py-2 rounded"
                dest="/settings/mail"
                popOut={false}
            >
                Cancel
            </NavButton>
        </div>
    </form>
</div>
