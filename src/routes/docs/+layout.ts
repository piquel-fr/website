import type { LayoutLoad, LoadEvent } from "./$types";
import { fetchDocsPage } from "$lib/utils/api";

export const load: LayoutLoad = async (event: LoadEvent) => {
    const response = await fetchDocsPage(event, "/summary.md");
    return { summary: await response.data };
};
