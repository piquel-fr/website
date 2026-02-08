import createClient, { type Middleware } from "openapi-fetch";
import type { paths as userPaths } from "./gen/users.d.ts";
import type { paths as emailPaths } from "./gen/email.d.ts";
import { PUBLIC_API } from "$env/static/public";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

function getToken() {
    if (!browser) return null;

    const cookies = document.cookie.split(";");
    const jwt = cookies.find((cookie: string) =>
        cookie.trim().startsWith("jwt=")
    );

    return jwt ? jwt.split("=")[1] : null;
}

const middleware: Middleware = {
    onRequest({ request }) {
        const token = getToken();
        request.headers.set("Authorization", `Bearer ${token}`);
        return request;
    },
    onResponse({ response }) {
        const currentPath = browser
            ? globalThis.window.location.pathname +
                globalThis.window.location.search
            : "/";

        if (response.status == 401) {
            redirect(
                307,
                `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`,
            );
        }
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
