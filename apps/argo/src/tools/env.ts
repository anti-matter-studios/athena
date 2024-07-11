/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { readFile } from "node:fs/promises";
import {
    getEnvironmentString,
    getEnvironmentStringOptional,
    MissingEnvironmentVariableError,
} from "@anti-matter-studios/tools/env";


// Re-export all the environment manager functions.
export * from "@anti-matter-studios/tools/env";

/** Error thrown by {@link getEnvironmentFileOptional} when a file error occurs. */
export class EnvironmentFileReadError extends Error {
    public constructor(public readonly variable: string, public readonly filepath: string, cause?: unknown) {
        super(`Failed to read the "${variable}_FILE" (${filepath}) file`, { cause });
    }
}

/**
 * Function used to read a file from the environment.
 * Uses {@link getEnvironmentString} to resolve the variable.
 *
 * @param variable The variable to retrieve.
 * @param encoding The encoding of the file, defaults to `utf-8`.
 */
export async function getEnvironmentFile(variable: string, encoding: BufferEncoding = "utf-8"): Promise<string> {
    // Read the file.
    const file = await getEnvironmentFileOptional(variable, encoding);

    // If the data was not found, throw an error.
    if (typeof file === "undefined") {
        throw new MissingEnvironmentVariableError(`${variable}_FILE`);
    }

    return file;
}

/**
 * Function used to read a file from the environment.
 * Uses {@link getEnvironmentString} to resolve the variable.
 * If the file variable does not exist, this returns `undefined`.
 *
 * @param variable The variable to retrieve.
 * @param encoding The encoding of the file, defaults to `utf-8`.
 */
export async function getEnvironmentFileOptional(
    variable: string,
    encoding: BufferEncoding = "utf-8",
): Promise<string | undefined> {
    // Get the file path from the environment.
    const filepath = getEnvironmentStringOptional(`${variable}_FILE`);
    if (typeof filepath === "undefined") {
        return Promise.resolve(undefined);
    }

    // Read the file contents.
    return readFile(filepath, encoding).catch((cause: unknown) => {
        throw new EnvironmentFileReadError(variable, filepath, cause);
    });
}
