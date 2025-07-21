import { PUBLIC_API } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();

        const response = await fetch(`${PUBLIC_API}/profile`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "PUT",
            body: JSON.stringify({
                username: data.get("username"),
                name: data.get("name"),
                image: data.get("image"),
            }),
        });

        if (response.status != 200) {
            error(response.status, { message: await response.text() });
        }
    },
} satisfies Actions;
