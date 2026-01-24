import type { LayoutLoad } from "./$types";
import api from "$lib/api";
import type { LoadEvent } from "@sveltejs/kit";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch, url }: LoadEvent) => {
    const profile = await api.get(fetch, url, "/profile/");

    return { settings: { profile: await profile.data } };
};
