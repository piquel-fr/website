import type { PageLoad } from "./$types.d.ts";
import { profile } from "$lib/api/client.ts";
import type { LoadEvent } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }: LoadEvent) => {
    const response = profile.GET(`/{user}`, {
        params: { path: { user: params.profile ? params.profile : "" } },
        fetch,
    });

    return { profileData: (await response).data };
};
