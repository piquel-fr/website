import { PUBLIC_API } from "$env/static/public";

const response = await fetch(`${PUBLIC_API}/config.json`);

if (response.status != 200) {
    throw new Error(`Failed to fetch config: ${response.statusText}`);
}

if (response.headers.get("Content-Type") != "application/json") {
    throw new Error(
        `Config is not json: ${response.headers.get("Content-Type")}`,
    );
}

export default await response.json();
