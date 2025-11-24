import api from "$lib/utils/api";
import type { LoadEvent, PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url, params }: LoadEvent) => {
    const response = await api.get(
        fetch,
        url,
        `/docs/${params.instance}`,
    );
    return {
        doc: await response.data,
    };
};
