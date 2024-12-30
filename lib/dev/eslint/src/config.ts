/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

/**
 * Module used to create some basic ESLint configuration.
 *
 * @module @anti-matter-studios/eslint/config
 */

import { config } from "typescript-eslint";

import TypescriptESLintConfigs from "./plugins/typescript.js";
import ReactESLintConfigs from "./plugins/react.js";

/**
 * Default configuration of the Arcadia project.
 * Provides some common-sense TypeScript linting rules
 * that should be followed for all projects of the repository.
 *
 * Note: No React rule is provided by this configuration,
 * see {@link DefaultReactConfiguration} for the React rules.
 */
export const DefaultConfiguration = config(...TypescriptESLintConfigs);

/**
 * Default configuration for React-based Arcadia packages.
 * Provides some common-sense React-based linting rules.
 *
 * Note: This configuration already provides the {@link DefaultConfiguration}.
 */
export const DefaultReactConfiguration = config(...DefaultConfiguration, ...ReactESLintConfigs);

/** Helper used to provide some typings for the ESLint configuration.  */
export const createESLintConfiguration = config;
