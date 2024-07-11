/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { randomUUID } from "node:crypto";
import type Koa from "koa";


/** Type alias for the state built by the {@link injectRequestIdentifierMiddleware}. */
export type ArgoIdentifiedState = {
    /** A unique identifier for this request. */
    readonly id: string;
};

/** Function used to inject a unique identifier to the request's context. */
export async function injectRequestIdentifierMiddleware(
    context: Koa.ParameterizedContext<ArgoIdentifiedState>,
    next: Koa.Next,
): Promise<void> {
    // Inject the identifier to the context.
    Object.defineProperty(
        context.state,
        "id",
        {
            value: randomUUID(),
            enumerable: true,
        },
    );

    // Move on to the next middleware in the stack.
    return next();
}
