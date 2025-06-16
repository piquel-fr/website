import { PUBLIC_API, PUBLIC_DOCS_API } from "$env/static/public";
import { error, type LoadEvent } from "@sveltejs/kit";

export async function fetchAPI(
    { fetch }: LoadEvent,
    path: string,
): Promise<{ data: any; status: number }> {
    const response = await fetch(`${PUBLIC_API}${path}`, {
        credentials: "include",
    });

    switch (response.status) {
        case 200:
            break;
        case 401:
        default:
            error(response.status);
    }

    if (response.headers.get("Content-Type") == "application/json") {
        return {
            data: response.json(),
            status: response.status,
        };
    }

    return { data: {}, status: response.status };
}

export async function fetchDocsPage(
    { fetch }: LoadEvent,
    page: string,
    root: string,
): Promise<{ data: Promise<string>; status: number }> {
    const response = await fetch(
        `${PUBLIC_DOCS_API}/${page}?root=${root}&tailwind`,
    );

    if (response.status != 200) {
        error(response.status);
    }

    if (response.headers.get("Content-Type") == "text/html") {
        return {
            data: response.text(),
            status: response.status,
        };
    }

    return {
        data: new Promise((resolve) => resolve("")),
        status: response.status,
    };
}
