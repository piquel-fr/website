import { LoadEvent } from "@sveltejs/kit";

export const prerender = true;

export const load = async (event: LoadEvent) => {
    const profile = await event.fetch(
        'https://api.piquel.fr/profile/piquelchips',
    );

    return {
        session: {},
        profile: profile,
        permissions: {},
    };
};
