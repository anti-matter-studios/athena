/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import type { Http2SecureServer } from "node:http2";


/** Wrapper object used to manipulate a {@link Http2SecureServer} instance. */
export interface ArgoServer {
    /** The underlying server instance. */
    readonly server: Http2SecureServer;

    /** Starts the server. */
    start(): Promise<void>;

    /** Stops the server. */
    stop(): Promise<void>;
}
