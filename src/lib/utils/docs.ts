import { PUBLIC_DOCS_API } from "$env/static/public";
import type { LoadEvent } from "@sveltejs/kit";

export const fetchDocsPage = async (
    { fetch }: LoadEvent,
    page: string,
): Promise<{ data: any; status: number }> => {
    const response = await fetch(`${PUBLIC_DOCS_API}${page}`, {
        credentials: "include",
    });

    if (response.headers.get("Content-Type") == "text/html") {
        return {
            data: response.text(),
            status: response.status,
        };
    }

    return { data: {}, status: response.status };
};
