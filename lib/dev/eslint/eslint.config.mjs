/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { config, configs } from "typescript-eslint";

export default config(...configs.strictTypeChecked, {
    languageOptions: {
        parserOptions: {
            projectService: true,
            project: "tsconfig.lib.json",
        },
    },
});
