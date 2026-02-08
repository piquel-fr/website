import createClient, { type Middleware } from "openapi-fetch";
import type { paths as userPaths } from "./gen/users.d.ts";
import type { paths as emailPaths } from "./gen/email.d.ts";
import { PUBLIC_API } from "$env/static/public";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

let refreshPromise: Promise<void> | null = null;

async function refreshAuthToken(): Promise<void> {
    const response = await fetch(`${PUBLIC_API}/auth/refresh`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Session expired");
    }
}

const middleware: Middleware = {
    async onResponse({ request, response }) {
        if (response.status === 401) {
            if (!browser) {
                return response;
            }

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshAuthToken().finally(() => {
                        refreshPromise = null;
                    });
                }
                await refreshPromise;

                return await fetch(request.clone());
            } catch (err) {
                const currentPath = browser
                    ? globalThis.window.location.pathname +
                        globalThis.window.location.search
                    : "/";
                redirect(
                    307,
                    `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`,
                );
            }
        }
        return response;
    },
    onError({ error }) {
        console.error("API Network Error:", error);
        return new Response("Network Error", { status: 503 });
    },
};

export const users = createClient<userPaths>({
    baseUrl: `${PUBLIC_API}/users`,
});
export const email = createClient<emailPaths>({
    baseUrl: `${PUBLIC_API}/email`,
});

const clients = [users, email];

for (const client of clients) {
    client.use(middleware);
}
