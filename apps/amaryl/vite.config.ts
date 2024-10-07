/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { defineConfig, type ServerOptions, type UserConfig } from "vite";


/** Create the vite configuration. */
export default defineConfig(async function buildAmarylViteConfig() {
    return {
        root: __dirname,
        base: "/",

        // Set up the dev server.
        server: await buildAmarylViteDevServerConfig(),
    };
});

/** Helper function used to parse the vite server configuration from the environment variables. */
async function buildAmarylViteDevServerConfig(): Promise<ServerOptions> {
    console.log(process.env);

    return {};
}
