import { PUBLIC_API } from "$env/static/public";
import type { LoadEvent } from "@sveltejs/kit";

export const fetchAPI = async (
    { fetch }: LoadEvent,
    path: string,
): Promise<{ data: any; status: number }> => {
    const response = await fetch(`${PUBLIC_API}${path}`, {
        credentials: "include",
    });

    console.log(response.headers.get("Content-Type"))

    if (response.headers.get("Content-Type") == "application/json") {
        return {
            data: response.json(),
            status: response.status,
        };
    }

    return { data: {}, status: response.status };
};
