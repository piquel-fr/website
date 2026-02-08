import { PUBLIC_API } from "$env/static/public";
import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch: HandleFetch = ({ request, event, fetch }) => {
    if (request.url.startsWith(PUBLIC_API)) {
        const cookies = event.request.headers.get("cookie");

        if (cookies) {
            request.headers.set("cookie", cookies);
        }
    }

    return fetch(request);
};
