import type { PageLoad } from "./$types.d.ts";
import { profile } from "$lib/api/client";
import type { LoadEvent } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }: LoadEvent) => {
    const { data } = await profile.GET(`/{user}`, {
        params: { path: { user: params.profile ? params.profile : "" } },
        fetch,
    });

    return { profileData: data! };
};
