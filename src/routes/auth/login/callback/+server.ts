import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies, url }) => {
    const token = url.searchParams.get("token") || "";
    cookies.set("jwt", token, { path: "/" });

    const redirectTo = url.searchParams.get("redirectTo") || "";
    redirect(307, redirectTo);
};
