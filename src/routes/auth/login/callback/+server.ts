import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies, url }) => {
    const token = url.searchParams.get("token") || "";
    cookies.set("jwt", token, {
        domain: "api.piquel.fr",
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 178200,
    });

    const redirectTo = url.searchParams.get("redirectTo") || "";
    redirect(307, redirectTo);
};
