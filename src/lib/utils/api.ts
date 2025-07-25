import { PUBLIC_API } from "$env/static/public";
import { error, type LoadEvent, redirect } from "@sveltejs/kit";

export const fetchAPI = async (
    { fetch, url }: LoadEvent,
    path: string,
    handleError: boolean = true,
): Promise<{ data: any; status: number }> => {
    const response = await fetch(`${PUBLIC_API}${path}`, {
        credentials: "include",
    });

    if (handleError) {
        switch (response.status) {
            case 200:
                break;
            case 401:
                redirect(307, `/auth/login?redirectTo=${url.pathname}`);
                break;
            default:
                error(response.status, { message: await response.text() });
                break;
        }
    }

    if (response.headers.get("Content-Type") == "application/json") {
        return {
            data: response.json(),
            status: response.status,
        };
    }

    return { data: {}, status: response.status };
};

export const fetchDocsPage = async (
    { fetch }: LoadEvent,
    page: string,
    root: string,
): Promise<{ data: Promise<string>; status: number }> => {
    const response = await fetch(
        `${PUBLIC_API}/docs${page}?root=${root}`,
    );

    if (response.status != 200) {
        error(response.status, { message: await response.text() });
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
};
