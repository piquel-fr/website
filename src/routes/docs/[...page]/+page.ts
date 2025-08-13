import type { LoadEvent, PageLoad } from "./$types";
import api from "$lib/utils/api";

export const load: PageLoad = async ({ fetch, params }: LoadEvent) => {
    const response = await api.docs(fetch, `/${params.page}`);
    return { summary: await response.data };
};
