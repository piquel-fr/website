import { error } from "@sveltejs/kit";
import { LoadEvent } from "@sveltejs/kit";

export const load = async (event: LoadEvent) => {
    const data = await event.fetch("https://api.piquel.fr/profile");
    
    let loggedIn = false
    if (data.status == 401) {
        loggedIn = false
    } else if (data.status != 200) {
        error(data.status);
    }
    loggedIn = true

    const profile = await data.json();

    return {
        loggedIn,
        profile,
        permissions: {},
    };
};
