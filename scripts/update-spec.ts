import fs from "node:fs";
import process from "node:process";
import "@std/dotenv/load";
import openapiTS, { astToString } from "openapi-typescript";

const outDir = "./src/lib/api/gen";
await fs.mkdir(outDir, { recursive: true });

const specs = ["profile", "email"];

async function syncSpec(name: string) {
    const ast = await openapiTS(
        new URL(
            `${process.env.PUBLIC_API}/specification/${name}.json`,
            import.meta.url,
        ),
    );
    const contents = astToString(ast);
    fs.writeFileSync(`./src/lib/api/gen/${name}.d.ts`, contents);
}

for (const spec of specs) {
    await syncSpec(spec);
}
