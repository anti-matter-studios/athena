/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { rollup, type RollupOptions, type InputOption, type OutputOptions } from "rollup";
import { join } from "node:path";
import { readFile, stat } from "node:fs/promises";
import { Stats } from "node:fs";

import createSWCPlugin, { type SWCPluginConfiguration } from "./plugins/swc";
import createNodeResolvePlugin from "./plugins/node-resolve";
import createDTSPlugin from "./plugins/dts";
import AthenaBuildArguments from "./yargs";


/** Configuration provided to the {@link createRollupOptions} factory. */
export interface RollupConfiguration {
    /** The mapped input to compile. */
    readonly input?: InputOption;
    /** If set, compiles an ECMAScript module version of the package. */
    readonly esm?: boolean;
    /** If set, compiles a CommonJS module version of the package. */
    readonly cjs?: boolean;
    /** If set, bundles the declarations from the package. */
    readonly dts?: boolean;

    /** {@link createSWCPlugin} options. */
    readonly swc?: SWCPluginConfiguration;
}

/**
 * Factory function used to generate the {@link RollupOptions}
 * from a given {@link RollupConfiguration} source.
 *
 * @param mode The current compilation mode.
 * @param [configuration] The configuration to parse.
 */
export default async function createRollupOptions(
    mode: "development" | "production",
    {
        input = "src/index.ts",
        esm = true,
        cjs = false,
        dts = true,
        swc
    }: RollupConfiguration = {}
): Promise<RollupOptions[]> {
    // Prepare the configuration list.
    const configurations: RollupOptions[] = [];

    // Prepare the common ouput options.
    const output: OutputOptions = {
        assetFileNames: "assets/[name]-[hash:8].[ext]",
        banner: "/*\n * Copyright © 2024. Anti-Matter Studios.\n */\n\n",
        chunkFileNames: "chunks/[format]/[name]-[hash:8].js",
        compact: true,
        dir: "dist",
        entryFileNames: "[name].[format].js",
        hashCharacters: "base36",
        sourcemap: true,
        sourcemapExcludeSources: true,
        sourcemapFileNames: "map/[name]-[hash:8].map.js",
    };

    // Prepare all the required plugins.
    const swcPlugin = createSWCPlugin(mode, swc);
    const nodeResolvePlugin = createNodeResolvePlugin();
    const dtsPlugin = createDTSPlugin();

    // Create the ESM options.
    if (esm) {
        configurations.push({
            input,
            output: { ...output, format: "esm", },
            plugins: [swcPlugin, nodeResolvePlugin],
        });
    }

    // Create the CJS options.
    if (cjs) {
        configurations.push({
            input,
            output: { ...output, format: "cjs", },
            plugins: [swcPlugin, nodeResolvePlugin],
        });
    }

    // Create the DTS options.
    if (dts) {
        configurations.push({
            input,
            output: { ...output, entryFileNames: "types/[name].d.ts" },
            plugins: [dtsPlugin, nodeResolvePlugin],
        });
    }

    // Return the configuration(s).
    return configurations;
}

/**
 * Helper used to load the rollup configuration from the current working directory.
 * Searches for an "athena-config.config.js" file.
 */
export default async function loadRollupConfiguration(): Promise<RollupConfiguration> {
    // Check if a configuration file was provided.
    let { config: filepath } = (await AthenaBuildArguments);
    if (typeof filepath !== "undefined") {

    }
    const filepath = join(process.cwd(), (await AthenaBuildArguments).config);

    /**
     * Tries to load the configuration from the given relative filepath.
     *
     * @param filepath The file path to try.
     */
    async function tryLoadConfigurationFromFilepath(filepath: string): Promise<RollupConfiguration> {
        // Check if the file exists.
        filepath = join(process.cwd(), filepath);
        let stats: Stats;
        try {
            stats = await stat(filepath);
        } catch (e: unknown) {
            // TODO: Handle the different error cases.
            throw new Error(`Failed to find a file at path "${filepath}"`);
        }

        // Check if the item is a file.
        if (!stats.isFile()) {
            throw new Error(`Path "${filepath}" does not point to a file`);
        }

        // Read the contents of the file.
        let contents: string;
        try {
            contents = await readFile(filepath, "utf-8");
        } catch (e: unknown) {
            throw new Error(`Failed to read the file at "${filepath}"`);
        }

        // Bundle the sources using rollup.
        const sources = await rollup({ input: filepath, output: { format: "esm" } });
    }
}
