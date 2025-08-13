import type { PageLoad } from "./$types";
import api from "$lib/utils/api";
import type { LoadEvent } from "@sveltejs/kit";

export const load: PageLoad = async ({ fetch, url, params }: LoadEvent) => {
    const response = await api.get(fetch, url, `/profile/${params.profile}/`);
    return { profileData: await response.data };
};
