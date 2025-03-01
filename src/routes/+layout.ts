import type { LayoutLoad, LayoutParams } from "./$types";
import { PUBLIC_API } from "$env/static/public";

export const ssr = true;

export const load: LayoutLoad = async ({ fetch, error }: LayoutParams) => {
    const response = await fetch(`${PUBLIC_API}/profile`, {
        credentials: "include",
    });
    let profile;
    let loggedIn = false;
    if (response.status == 200) {
        profile = await response.json();
        loggedIn = true;
    } else if (response.status == 401) {
        return;
    } else {
        error(response.status);
    }

    return {
        profile,
        loggedIn,
    };
};
