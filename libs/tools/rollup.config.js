/*
 * Copyright © 2024. Anti-Matter Studios.
 */

const { withNx } = require("@nx/rollup/with-nx");

module.exports = withNx(
    {
        main: "./src/index.ts",
        outputPath: "../../dist/libs/tools",
        tsConfig: "./tsconfig.lib.json",
        compiler: "swc",
        format: ["cjs", "esm"],
        assets: [{ input: ".", output: ".", glob: "*.md" }],
        external: "all",
        generateExportsField: false,
        deleteOutputPath: true,
    },
    {
        input: {
            "env": "./src/lib/env.ts",
            "logger": "./src/lib/logger.ts",
        },
    },
);
