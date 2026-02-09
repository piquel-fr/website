import { redirect } from "@sveltejs/kit";
import { PUBLIC_API } from "$env/static/public";

export const load = () => {
    redirect(307, `${PUBLIC_API}/auth/logout`);
};
