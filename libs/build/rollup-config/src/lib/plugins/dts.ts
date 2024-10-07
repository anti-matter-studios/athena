/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import dts from "rollup-plugin-dts";


/** Wrapper for the options passed to the {@link dts} plugin. */
export interface DTSPluginConfiguration {
    /** Path to the tsconfig file. */
    readonly tsconfig?: string;
}

/**
 * Helper used to create the DTS plugin.
 *
 * @param [options] The options passed to the plugin.
 */
export default function createDTSPlugin(
    {
        tsconfig
    }: DTSPluginConfiguration = {}
) {
    return dts({
        tsconfig,
        compilerOptions: {
            // Force-disable the composite flag.
            composite: false,
        }
    });
}
