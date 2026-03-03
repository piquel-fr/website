import createClient, {
    type ClientOptions,
    type Middleware,
} from "openapi-fetch";
import type { paths as userPaths } from "./gen/users.d.ts";
import type { paths as emailPaths } from "./gen/email.d.ts";
import { PUBLIC_API } from "$env/static/public";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";

let refreshPromise: Promise<void> | null = null;

async function refreshAuthToken(f: typeof fetch): Promise<void> {
    const response = await f(`${PUBLIC_API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Session expired");
    }
}

const fetchOptions: ClientOptions = { credentials: "include" };

const middleware: Middleware = {
    async onResponse({ request, response, options }) {
        if (response.status !== 401) {
            return response;
        }

        if (!browser) {
            return response;
        }

        try {
            if (!refreshPromise) {
                refreshPromise = refreshAuthToken(options.fetch).finally(() => {
                    refreshPromise = null;
                });
            }
            await refreshPromise;

            return await options.fetch(request.clone(), {
                credentials: "include",
            });
        } catch (err) {
            console.log(err);
            const currentPath = browser
                ? globalThis.window.location.pathname +
                    globalThis.window.location.search
                : "/";
            goto(`/auth/login?redirectTo=${encodeURIComponent(currentPath)}`);
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
    ...fetchOptions,
});
export const email = createClient<emailPaths>({
    baseUrl: `${PUBLIC_API}/email`,
    ...fetchOptions,
});

const clients = [users, email];

for (const client of clients) {
    client.use(middleware);
}
