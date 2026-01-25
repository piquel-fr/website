import { PUBLIC_API } from "$env/static/public";

const response = await fetch(`${PUBLIC_API}/auth/policy.json`);

if (response.status != 200) {
    throw new Error(`Failed to fetch auth policy: ${response.statusText}`);
}

if (response.headers.get("Content-Type") != "application/json") {
    throw new Error(
        `Auth policy is not json: ${response.headers.get("Content-Type")}`,
    );
}

export default await response.json();
