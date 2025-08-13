import type { Handle, HandleFetch } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;

export const handleFetch: HandleFetch = ({ event, request, fetch }) => {
    request.headers.set("Authorization", `Bearer ${event.cookies.get("jwt")}`);
    return fetch(request);
};
