import type { LoadEvent, PageLoad } from "@sveltejs/kit";
import api from "$lib/utils/api";

export const load: PageLoad = async ({ fetch, url }: LoadEvent) => {
    let limit = url.searchParams.get("limit");
    if (limit == null) {
        limit = "10";
    }
    let offset = url.searchParams.get("offset");
    if (offset == null) {
        offset = "0";
    }

    const listResponse = await api.get(
        fetch,
        url,
        `/docs/?own&limit=${limit}&offset=${offset}`,
    );
    const countResponse = await api.get(fetch, url, "/docs/?count");

    return {
        docs: {
            instances: await listResponse.data,
            limit: parseInt(limit),
            offset: parseInt(offset),
            count: parseInt(await countResponse.data),
        },
    };
};
