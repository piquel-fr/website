import type { PageLoad, LoadEvent } from "./$types";
import { error } from "@sveltejs/kit";
import { fetchDocsPage } from "$lib/utils/docs";

export const load: PageLoad = async (event: LoadEvent) => {
    const response = await fetchDocsPage(event, "/");
    if (response.status != 200)
        error(response.status);

    return { summary: await response.data }
};
