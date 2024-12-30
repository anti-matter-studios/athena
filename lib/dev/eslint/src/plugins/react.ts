/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import type { Linter } from "eslint";
import ReactConfigs from "eslint-plugin-react";
import ReactHooks from "eslint-plugin-react-hooks";

/** Configuration used for React. */
const ReactESLintConfigs: Linter.Config[] = [
    ReactConfigs.configs.flat?.["jsx-runtime"] as Linter.Config,
    {
        ...ReactHooks.configs.recommended,
        plugins: {
            "react-hooks": ReactHooks,
        },
    },
    /** Override some rules. */
    {
        rules: {},
    },
];
export default ReactESLintConfigs;
