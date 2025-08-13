import type { LoadEvent, PageLoad } from "./$types";
import api from "$lib/utils/api";

export const load: PageLoad = async ({ fetch }: LoadEvent) => {
    const response = await api.docs(fetch, "/");
    return { summary: await response.data };
};
