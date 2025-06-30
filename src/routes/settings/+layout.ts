import type { LayoutLoad, LoadEvent } from "./$types";
import { fetchAPI } from "$lib/utils/api";

export const ssr = true;

export const load: LayoutLoad = async (event: LoadEvent) => {
    const response = await fetchAPI(event, "/profile");

    return { settings: { profile: await response.data } };
};
