/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

declare module "eslint-plugin-react-hooks" {
    import { ESLint, Linter } from "eslint";
    export const configs: { recommended: Linter.Config };
    export const rules: ESLint.Plugin["rules"];
}
