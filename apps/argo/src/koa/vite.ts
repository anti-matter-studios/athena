/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import type Koa from "koa";
import type { ViteDevServer } from "vite";

import type { ArgoLoggerContext } from "./log";


/** State derived by the {@link createAttachViteDevServerMiddleware}. */
export type ArgoViteDevServerState = {
    /** Instance of the {@link ViteDevServer} used for this request. */
    readonly vite: ViteDevServer;
};

/**
 * Function used to attach a {@link ViteDevServer} instance to the current request's context.
 *
 * @param viteDevServer The {@link ViteDevServer} instance to attach to the context.
 */
export function createAttachViteDevServerMiddleware(viteDevServer: ViteDevServer): Koa.Middleware<
    ArgoViteDevServerState,
    ArgoLoggerContext
> {
    // Build the middleware function.
    return function attachViteDevServerMiddleware(context, next) {
        // Attach the vite dev server to the context.
        Object.defineProperty(
            context.state,
            "vite",
            {
                value: viteDevServer,
                enumerable: true,
            },
        );

        // Invoke the next middleware method in the stack.
        return next();
    };
}

/**
 * Function used to handle a request with the {@link ViteDevServer} in the current context.
 * If vite handled the request, the stack stops here and no further processing is done on the request.
 */
export async function handleRequestWithViteMiddleware(
    context: Koa.ParameterizedContext<ArgoViteDevServerState, ArgoLoggerContext>,
    next: Koa.Next,
): Promise<void> {
    // Prepare a promise wrapper for Vite.
    const { promise: wasRequestHandled, resolve } = Promise.withResolvers<boolean>();

    // Handle the request with the Vite middleware.
    context.state.vite.middlewares(context.req, context.res, function onViteHandlingCompleted() {
        resolve(!context.res.writable);
    });

    // Check if Vite handled the request.
    if (await wasRequestHandled) {
        return;
    }

    // Continue the middleware stack.
    return next();
}
