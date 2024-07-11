/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import chalk, { type ChalkInstance } from "chalk";
import { MESSAGE } from "triple-beam";
import Winston from "winston";

import { getEnvironmentStringOptional } from "@anti-matter-studios/tools/env";


/** Map of all the colours used by {@link AthenaFormat}. */
const AthenaFormatColourMap: Record<string, ChalkInstance | undefined> = {
    debug: chalk.magenta,
    info: chalk.blackBright,
    warning: chalk.yellow,
    error: chalk.red,
} as const;

/** Custom format used when logging some data. */
const AthenaFormat = Winston.format(function(info) {
    // Retrieve the metadata from the info.
    const { level /*metadata: { application, namespace, timestamp, ms }*/ } = info;

    // Prepare the output message.
    let message = (AthenaFormatColourMap[level] ?? chalk.black).call(chalk, `${level}\t`);

    // Assign the message to the info object.
    info[MESSAGE] = message;

    // Return the updated object.
    return info;
});

/** Shared logger used across the whole repository. */
const AthenaLogger = Winston.createLogger({
    level: getEnvironmentStringOptional("LOG_LEVEL") ?? "info",
    levels: { error: 0, warning: 1, info: 2, debug: 3 },
    format: Winston.format.combine(
        Winston.format.splat(),
        Winston.format.ms(),
        Winston.format.timestamp(),
        Winston.format.metadata(),
        AthenaFormat(),
    ),
    transports: [
        new Winston.transports.Console(),
        new Winston.transports.Http({}),
    ],
});

export default AthenaLogger;
