import type { PageLoad } from "./$types";
import { error, type LoadEvent } from "@sveltejs/kit";
import { fetchAPI } from "$lib/utils/api";

export const load: PageLoad = async (event: LoadEvent) => {
    const response = await fetchAPI(event, `/profile/${event.params.profile}`);
    if (response.status != 200) {
        error(response.status);
    }
    return { data: await response.data };
};
