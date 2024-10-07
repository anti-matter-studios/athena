/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { JscTarget } from "@swc/core";
import swc from "@rollup/plugin-swc";


/** Wrapper for the options passed to the {@link swc} plugin. */
export interface SWCPluginConfiguration {
    /** If set, allows TSX in the source file. */
    readonly tsx?: boolean;
    /** If set, uses TSX class decorators. */
    readonly decorators?: boolean;
    /** The target ECMAScript version for the compiler. */
    readonly target?: JscTarget;
}

/**
 * Helper used to create the SWC plugin.
 *
 * @param mode The current compilation mode.
 * @param [options] The options passed to the plugin.
 */
export default function createSWCPlugin(
    mode: "development" | "production",
    {
        tsx = false,
        decorators = false,
        target = "esnext"
    }: SWCPluginConfiguration = {}
) {
    return swc({
        swc: {
            jsc: {
                externalHelpers: true,
                parser: { syntax: "typescript", tsx, decorators },
                target,
                loose: false,
                transform: {
                    legacyDecorator: false,
                    decoratorMetadata: decorators,
                    react: {
                        runtime: "automatic",
                        development: mode === "development",
                        refresh: mode === "development",
                    }
                },
                keepClassNames: true,
            },
            isModule: true
        }
    });
}
