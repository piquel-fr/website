import { profile } from "$lib/api/client";
import type { LoadEvent } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types.d.ts";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch }: LoadEvent) => {
    const { data } = await profile.GET(`/`, { fetch });
    return { profile: data! };
};
