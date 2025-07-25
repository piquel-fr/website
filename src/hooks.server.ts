import type { Handle } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    console.log("Request headers:", {
        origin: event.request.headers.get("origin"),
        host: event.request.headers.get("host"),
        "x-forwarded-host": event.request.headers.get("x-forwarded-host"),
        "x-forwarded-proto": event.request.headers.get("x-forwarded-proto"),
        referer: event.request.headers.get("referer"),
    });
    console.log("Environment ORIGIN:", "https://piquel.fr");

    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;
