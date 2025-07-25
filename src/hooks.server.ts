import type { Handle } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;
