/*
 * Copyright © 2024 - Zimproov.
 * All rights reserved.
 */

import swc from "@rollup/plugin-swc";
import dts from "rollup-plugin-dts";
import nodeResolve, { DEFAULTS } from "@rollup/plugin-node-resolve";

/** @type import("rollup").RollupOptions[] */
const RollupConfig = [
    {
        input: "./src/index.ts",
        output: { format: "esm", dir: "dist" },
        plugins: [swc(), nodeResolve({ extensions: [...DEFAULTS.extensions, ".ts"] })],
        external: /node_modules/,
    },
    {
        input: "./src/index.ts",
        output: { dir: "dist" },
        plugins: [
            dts({ compilerOptions: { composite: false } }),
            nodeResolve({ extensions: [...DEFAULTS.extensions, ".ts"] }),
        ],
        external: /node_modules/,
    },
];

export default RollupConfig;
