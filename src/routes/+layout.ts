import type { LayoutLoad } from "./$types";
import { error, type LoadEvent } from "@sveltejs/kit";
import api from "$lib/api";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch, url }: LoadEvent) => {
    const response = await api.get(fetch, url, "/profile/", false);

    if (response.status == 401) {
        return {};
    } else if (response.status != 200) {
        error(response.status);
    }

    return { profile: await response.data };
};
