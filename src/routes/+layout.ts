import { error } from "@sveltejs/kit";
import { LoadEvent } from "@sveltejs/kit";

export const load = async (event: LoadEvent) => {
    const data = await event.fetch("https://api.piquel.fr/profile/piquelchips");
    if (data.status != 200) {
        error(data.status);
    }

    const profile = await data.json();

    return {
        session: {},
        profile: profile,
        permissions: {},
    };
};
