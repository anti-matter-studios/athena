/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { readFile } from "node:fs/promises";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { filterPackagesFromDir } from "@pnpm/filter-workspace-packages";
import type { PackageNode } from "@pnpm/workspace.pkgs-graph";
import type { Project } from "@pnpm/types";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import {
    getEnvironmentString,
    getEnvironmentStringOptional,
    MissingEnvironmentVariableError,
} from "@anti-matter-studios/tools/environment-manager";


// Re-export all the environment manager functions.
export * from "@anti-matter-studios/tools/environment-manager";

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

/** Flag used by {@link initializeDotEnvConfiguration}  */
let wasInitialized = false;

/**
 * Function used to initialize `dotenv` if needed.
 * Loads the `.env` files from the current working directory and the workspace root.
 * Uses the current mode to determine which file should be loaded, and in what order.
 */
export async function initializeDotEnvConfiguration() {
    // If the configuration was loaded, do nothing.
    if (wasInitialized) {
        return;
    }
    wasInitialized = true;

    // Get the current environment.
    const environment = getEnvironmentStringOptional("NODE_ENV") ?? "development";

    // Search for the pnpm workspace directory.
    const workspaceRoot = await findWorkspaceDir(process.cwd());
    if (typeof workspaceRoot === "undefined") {
        throw new Error("Not in a pnpm workspace!");
    }

    // Search the current package root in the workspace.
    const packages = await filterPackagesFromDir(
        workspaceRoot,
        [{ filter: getEnvironmentString("npm_package_name"), followProdDepsOnly: false }],
        {
            prefix: "@anti-matter-studios",
            workspaceDir: workspaceRoot,
        },
    );

    // Retrieve the root from the matched packages.
    const matched = Object.values(packages.selectedProjectsGraph as Record<string, PackageNode<Project>>);
    const root = matched.at(0)?.package.rootDir;
    if (typeof root === "undefined") {
        throw new Error("Failed to resolve the current package's root!");
    }

    // Initialize dotenv.
    expand(
        config({
            path: [
                `${workspaceRoot}/.env`,
                `${workspaceRoot}/.env.${environment}`,
                `${root}/.env`,
                `${root}/.env.${environment}`,
            ],
            encoding: "UTF-8",
        }),
    );
}
