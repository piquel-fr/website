import type { LayoutLoad, LoadEvent } from "./$types";
import api from "$lib/utils/api";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch, url }: LoadEvent) => {
    const profile = await api.get(fetch, url, "/profile/");

    return { settings: { profile: await profile.data } };
};
