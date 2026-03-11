<script lang="ts">
    import NavButton from "$lib/components/NavButton.svelte";
    import Button from "$lib/components/Button.svelte";
    import type { PageProps } from "./$types";

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
            // TODO: Call API to create new mail account
            console.log("Creating mail account:", form);
            // Redirect to mail accounts page after successful creation
            // navigate('/settings/mail');
        } catch (err) {
            error = "Failed to create account. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<div class="w-full max-w-3xl mx-auto flex flex-col py-8">
    <NavButton
        className="mb-6 p-2 px-4 rounded text-black hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        dest="/settings/mail"
        popOut={false} 
    >
        ← Back to Mail Accounts
    </NavButton>

    <h1 class="text-3xl font-bold mb-6 text-black dark:text-gray-100">Add New Mail Account</h1>

    <form onsubmit={handleSubmit} class="space-y-6">
        {#if error}
            <div class="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                <p class="text-red-800 dark:text-red-200">{error}</p>
            </div>
        {/if}

        <div>
            <label for="name" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
                Display Name
            </label>
            <input
                type="text"
                id="name"
                placeholder="e.g., Personal Email, Work Email"
                bind:value={form.name}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">A friendly name to identify this account</p>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
                Email Address
            </label>
            <input
                type="email"
                id="email"
                placeholder="user@example.com"
                bind:value={form.email}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">The email address for this account</p>
        </div>

        <div>
            <label for="username" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
                Username
            </label>
            <input
                type="text"
                id="username"
                placeholder="user@example.com or username"
                bind:value={form.username}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg_gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Login credentials for connecting to the email account</p>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
                Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="••••••••"
                bind:value={form.password}
                class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Password for connecting to the email account</p>
        </div>

        <div class="flex gap-3 pt-4">
            <Button
                type="submit"
                useCardClasses={true}
                className="px-6 py-2"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Account"}
            </Button>
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
