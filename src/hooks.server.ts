import { ORIGIN } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    const originalOrigin = event.request.headers.get("origin");

    if (!originalOrigin) {
        const forwardedProto = event.request.headers.get("x-forwarded-proto") || "https";
        const forwardedHost = event.request.headers.get("x-forwarded-host") || event.request.headers.get("host");

        if (forwardedHost) {
            const reconstructedOrigin = `${forwardedProto}://${forwardedHost}`;

            const newHeaders = new Headers(event.request.headers);
            newHeaders.set("origin", reconstructedOrigin);

            const newRequest = new Request(event.request.url, {
                method: event.request.method,
                headers: newHeaders,
                body: event.request.body,
            });

            event.request = newRequest;
            console.log("Reconstructed Origin header:", reconstructedOrigin);
        }
    }

    console.log("Request headers:", {
        origin: event.request.headers.get("origin"),
        host: event.request.headers.get("host"),
        "x-forwarded-host": event.request.headers.get("x-forwarded-host"),
        "x-forwarded-proto": event.request.headers.get("x-forwarded-proto"),
        referer: event.request.headers.get("referer"),
    });
    console.log("Environment ORIGIN:", ORIGIN);

    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;
