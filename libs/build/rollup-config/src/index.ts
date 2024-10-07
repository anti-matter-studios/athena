#!/bin/env node
/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { rollup } from "rollup";
import createRollupOptions from "./lib/config";
import AthenaBuildArguments from "./lib/yargs";

export type { RollupConfiguration } from "./lib/config";
export type { SWCPluginConfiguration } from "./lib/plugins/swc";



// Create the rollup configuration.
const options = await createRollupOptions("development", { dts: true });

// Run rollup.
for (const option of options) {
    // Prepare the build.
    const build = await rollup(option);

    // Run the build.
    if (Array.isArray(option.output)) {
        for (const output of option.output) {
            await build.write(output);
        }
    } else if (option.output) {
        await build.write(option.output);
    }

    await build.close();
}
