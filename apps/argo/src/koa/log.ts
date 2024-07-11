/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { format } from "node:util";
import type Koa from "koa";
import Winston from "winston";

import type { ArgoIdentifiedState } from "./identifier";
import AthenaLogger from "@anti-matter-studios/tools/logger";


/** Console-like object used to log information about the current requests. */
export interface ArgoLogger {
    /** Function used to log some debug information to the console. */
    debug(message: string, ...args: unknown[]): void;

    /** Function used to log some information to the console. */
    log(message: string, ...args: unknown[]): void;

    /** Function used to log a warning to the console. */
    warn(message: string, ...args: unknown[]): void;

    /** Function used to log an error message to the console. */
    error(message: string, ...args: unknown[]): void;

    /** Escape hatch used to access the underlying winston logger. */
    readonly logger: Winston.Logger;
}

/** Shape of the {@link Koa} context returned by {@link injectArgoLoggerMiddleware}. */
export interface ArgoLoggerContext {
    /** Winston-derived logger used for this request. */
    readonly logger: ArgoLogger;
}

/** Winston logger used for Koa middleware. */
const KoaLogger = AthenaLogger.child({
    application: "argo",
    namespace: "koa",
});

/**
 * Function used to inject the logging methods to the context.
 * The logging tool uses Winston under the hood to log corresponding messages to:
 * - the console
 * - the logfile
 * - the configured Prometheus instance
 *
 * @param context The context of the request.
 * @param next Callback used to invoke the next middleware in the stack.
 */
export async function injectArgoLoggerMiddleware(
    context: Koa.ParameterizedContext<ArgoIdentifiedState, ArgoLoggerContext>,
    next: Koa.Next,
): Promise<void> {
    // Create a child winston object.
    const logger = KoaLogger.child({ "request-id": context.state.id });

    // Inject the logger into the context.
    Object.defineProperty(
        context,
        "logger",
        {
            value: {
                debug(message: string, ...args: unknown[]) {
                    logger.debug(format(message, args), ...args);
                },
                log(message: string, ...args: unknown[]) {
                    logger.info(format(message, args), ...args);
                },
                warn(message: string, ...args: unknown[]) {
                    logger.warning(format(message, args), ...args);
                },
                error(message: string, ...args: unknown[]) {
                    logger.error(format(message, args), ...args);
                },
                logger,
            } satisfies ArgoLogger,
        },
    );

    // Invoke the next function in the middleware stack.
    try {
        await next();
    } catch (error: unknown) {
        // Log any uncaught error, then re-throw it.
        logger.error({ message: "Unhandled error in the middleware stack" });
    }
}
