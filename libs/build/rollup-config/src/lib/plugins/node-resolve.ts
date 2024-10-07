/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import nodeResolve, { DEFAULTS } from "@rollup/plugin-node-resolve";

/**
 * Helper used to create the NodeResolve plugin.
 */
export default function createNodeResolvePlugin() {
    return nodeResolve({
        // Add support for ".ts" extensions.
        extensions: [...DEFAULTS.extensions, ".ts"]
    });
}
