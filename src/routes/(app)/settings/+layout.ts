import { users } from "$lib/api/client";
import type { LoadEvent } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types.d.ts";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch }: LoadEvent) => {
    const { data } = await users.GET(`/self`, { fetch });
    return { settings: { user: data! } };
};
