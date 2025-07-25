import { ORIGIN } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

export const handle = (({ event, resolve }) => {
    console.log(ORIGIN);
    return resolve(event, {
        // Forward all headers
        filterSerializedResponseHeaders: () => true,
    });
}) satisfies Handle;
