import type { PageLoad } from "./$types.d.ts";
import { users } from "$lib/api/client";
import type { LoadEvent } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }: LoadEvent) => {
    const { data } = await users.GET(`/{user}`, {
        params: { path: { user: params.user ? params.user : "" } },
        fetch,
    });

    return { userData: data! };
};
