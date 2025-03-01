import { PUBLIC_API } from "$env/static/public";
import type { LoadEvent } from "@sveltejs/kit";

export const fetchAPI = async (
    { fetch }: LoadEvent,
    path: string,
): Promise<{ data: any; status: number }> => {
    const response = await fetch(
        `${PUBLIC_API}${path}`,
        {
            credentials: "include",
        },
    );

    const status = response.status;
    const data = response.json();

    return { data, status };
};
