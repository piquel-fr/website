import { PUBLIC_API } from "$env/static/public";
import type { Handle, HandleFetch } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;

export const handleFetch: HandleFetch = ({ request, event, fetch }) => {
    if (request.url.startsWith(PUBLIC_API)) {
        const cookies = event.request.headers.get("cookie");

        if (cookies) {
            request.headers.set("cookie", cookies);
        }
    }

    return fetch(request);
};
