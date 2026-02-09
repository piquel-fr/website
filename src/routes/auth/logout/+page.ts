import { type LoadEvent, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.d.ts";
import { logout } from "$lib/api/client.ts";

export const load: PageLoad = async ({ url, fetch }: LoadEvent) => {
    await logout(fetch);
    const redirectTo = url.searchParams.get("redirectTo") || "";
    redirect(307, redirectTo);
};
