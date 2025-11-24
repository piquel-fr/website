import { browser } from "$app/environment";
import { PUBLIC_API } from "$env/static/public";
import { error, redirect } from "@sveltejs/kit";

class ApiClient {
    getToken() {
        if (!browser) return null;

        const cookies = document.cookie.split(";");
        const jwt = cookies.find((cookie: string) =>
            cookie.trim().startsWith("jwt=")
        );

        return jwt ? jwt.split("=")[1] : null;
    }

    request(
        endpoint: string,
        options = {},
        fetchFunc: typeof fetch = fetch,
    ): Promise<Response> {
        const token = this.getToken();
        return fetchFunc(`${PUBLIC_API}${endpoint}`, {
            ...options,
            headers: {
                ...(token && { "Authorization": `Bearer ${token}` }),
                ...(options.headers || {}),
            },
        });
    }

    async get(
        fetchFunc: typeof fetch,
        url: URL,
        endpoint: string,
        handleError: boolean = true,
    ): Promise<{ data: any; status: number }> {
        const response = await this.request(endpoint, {}, fetchFunc);

        if (handleError) {
            switch (response.status) {
                case 200:
                    break;
                case 401:
                    redirect(307, `/auth/login?redirectTo=${url.pathname}`);
                    return {};
                default:
                    error(response.status, { message: await response.text() });
                    return {};
            }
        }

        switch (response.headers.get("Content-Type")) {
            case "application/json":
                return { data: response.json(), status: response.status };
            case "text/html":
                return { data: response.text(), status: response.status };
            case "text/plain":
                return { data: response.text(), status: response.status };
            default:
                return { data: {}, status: response.status };
        }
    }

    async docs(fetchFunc: typeof fetch, page: string) {
        const response = await this.request(
            `/docs/piqueldocs/page${page}?pathPrefix=/docs`,
            {},
            fetchFunc,
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
    }
}

export default new ApiClient();
