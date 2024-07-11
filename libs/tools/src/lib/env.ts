/*
 * Copyright © 2024. Anti-Matter Studios.
 */


/** Error thrown when an environment variable was expected but is missing. */
export class MissingEnvironmentVariableError extends Error {
    public constructor(public readonly variable: string, cause?: unknown) {
        super(`The environment variable "${variable}" was not found`, { cause });
    }
}

/**
 * Function used to retrieve a `boolean` value from the environment.
 * The source object is determined dynamically based on the current platform.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentBoolean(variable: string): boolean {
    return stringToBoolean(getEnvironmentString(variable));
}

/**
 * Function used to retrieve a `boolean` value from the environment.
 * The source object is determined dynamically based on the current platform.
 * If the value is missing from the environment, this will return `undefined`.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentBooleanOptional(variable: string): boolean | undefined {
    return stringToBoolean(getEnvironmentStringOptional(variable));
}

/**
 * Helper function used to convert a string value to a boolean.
 *
 * @param stringValue The string value to convert.
 */
function stringToBoolean(stringValue: string): boolean;

/**
 * Helper function used to convert an optional string value to an optional boolean.
 *
 * @param stringValue The string value to convert.
 */
function stringToBoolean(stringValue: string | undefined): boolean | undefined;

/** Implementation. */
function stringToBoolean(stringValue: string | undefined): boolean | undefined {
    switch (stringValue?.toLowerCase().trim().normalize("NFD")) {
    case undefined:
        return undefined;
    case "true":
    case "on":
    case "yes":
        return true;
    default:
        return false;
    }
}

/**
 * Function used to retrieve a `number` value from the environment.
 * The source object is determined dynamically based on the current platform.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentNumber(variable: string): number {
    return stringToNumber(getEnvironmentString(variable));
}

/**
 * Function used to retrieve a `number` value from the environment.
 * The source object is determined dynamically based on the current platform.
 * If the value is missing from the environment, this will return `undefined`.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentNumberOptional(variable: string): number | undefined {
    return stringToNumber(getEnvironmentStringOptional(variable));
}

/**
 * Helper function used to convert a string value to a number.
 *
 * @param stringValue The string value to convert.
 */
function stringToNumber(stringValue: string): number;

/**
 * Helper function used to convert an optional string value to an optional number.
 *
 * @param stringValue The string value to convert.
 */
function stringToNumber(stringValue: string | undefined): number | undefined;

/** Implementation. */
function stringToNumber(stringValue: string | undefined): number | undefined {
    if (typeof stringValue === "undefined") {
        return undefined;
    }

    return parseFloat(stringValue);
}

/**
 * Function used to retrieve a `string` value from the environment.
 * The source object is determined dynamically based on the current platform.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentString(variable: string): string {
    // Get the optional value of the variable.
    const value = getEnvironmentStringOptional(variable);

    // If the value is missing, throw an error.
    if (typeof value === "undefined") {
        throw new MissingEnvironmentVariableError(variable);
    }

    return value;
}

/**
 * Function used to retrieve a `string` value from the environment.
 * The source object is determined dynamically based on the current platform.
 * If the value is missing from the environment, this will return `undefined`.
 *
 * @param variable The variable to retrieve.
 */
export function getEnvironmentStringOptional(variable: string): string | undefined {
    // If we are running in Node.js environments, retrieve the value through `process.env`.
    if (typeof process !== "undefined") {
        return process.env[variable];
    }

    // Resolve the variable through "import.meta".
    // Use a function constructor to avoid compilation errors in non-supported environments.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const getter = new Function("function(variable) { return import.meta.env[variable]; }", "variable");
    return (getter as (variable: string) => string | undefined)(variable);
}
