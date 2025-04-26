import type { LayoutLoad, LoadEvent } from "./$types";
import { error } from "@sveltejs/kit";
import { fetchDocsPage } from "$lib/utils/docs";

export const load: LayoutLoad = async (event: LoadEvent) => {
    const response = await fetchDocsPage(event, "/summary");
    if (response.status != 200)
        error(response.status);

    return { summary: await response.data }
};
