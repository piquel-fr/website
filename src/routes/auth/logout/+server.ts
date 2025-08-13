import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies, url }) => {
    cookies.delete("jwt", { path: "/" });
    const redirectTo = url.searchParams.get("redirectTo") || "";
    redirect(307, redirectTo);
};
