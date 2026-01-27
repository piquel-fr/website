import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-node';

// temporary. waiting on https://github.com/pngwn/MDsveX/pull/735
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: [
        mdsvex({
            extensions: [".svx", ".md"],
            layout: join(__dirname, "./src/lib/components/docs/DocsLayout.svelte")
        })
    ],
    kit: {
        alias: {
            "$types": "./src/types"
        },
        adapter: adapter()
    },
    extensions: [".svelte", ".svx", ".md"]
};
