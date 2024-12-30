/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { config, configs } from "typescript-eslint";

/** Configuration used for TypeScript. */
const TypescriptESLintConfigs = config(
    ...configs.strictTypeChecked,
    /** Override some rules. */
    {
        languageOptions: {
            /** Provide some defaults for the TypeScript parser. */
            parserOptions: {
                projectService: true,
                project: ["tsconfig.json", "tsconfig.lib.json", "tsconfig.app.json", "tsconfig.spec.json"],
            },
        },
        rules: {
            /** Disable @typescript-eslint/no-invalid-void until issue [typescript-eslint/typescript-eslint#8113](https://github.com/typescript-eslint/typescript-eslint/issues/8113) is fixed. */
            "@typescript-eslint/no-invalid-void-type": ["off"],
        },
    },
);
export default TypescriptESLintConfigs;
