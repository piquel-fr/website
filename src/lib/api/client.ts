import createClient, { type Middleware } from "openapi-fetch";
import type { paths as profilePaths } from "./gen/profile.d.ts";
import type { paths as emailPaths } from "./gen/email.d.ts";
import { PUBLIC_API } from "$env/static/public";
import { browser } from "$app/environment";
import { error, redirect } from "@sveltejs/kit";
import { page } from "$app/state";

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
    async onResponse({ response }) {
        switch (response.status) {
            case 200:
                break;
            case 401:
                redirect(
                    307,
                    `/auth/login?redirectTo=${page ? page.url.pathname : ""}`,
                );
                break;
            default:
                error(response.status, { message: await response.text() });
                break;
        }
    },
    onError({ error }) {
        return new Error(`API Error: ${error}`);
    },
};

export const profile = createClient<profilePaths>({
    baseUrl: `${PUBLIC_API}/profile`,
});
export const email = createClient<emailPaths>({
    baseUrl: `${PUBLIC_API}/email`,
});

const clients = [profile, email];

for (const client of clients) {
    client.use(middleware);
}
