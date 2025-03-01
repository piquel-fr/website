import { PUBLIC_API } from "$env/static/public";
import { LoadEvent } from "@sveltejs/kit";

export const fetchAPI = async (
    { fetch }: LoadEvent,
    path: string,
): Promise<{ data: object; status: number }> => {
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
