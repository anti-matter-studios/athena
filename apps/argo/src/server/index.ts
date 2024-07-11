/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { createSecureServer } from "node:http2";
import { getEnvironmentNumber, getEnvironmentString } from "@anti-matter-studios/tools/environment-manager";
import AthenaLogger from "@anti-matter-studios/tools/logger";

import type { ArgoServer } from "./types";
import parseArgoTLSOptions from "./tls";


/** Logging tool used for the server. */
const ServerLogger = AthenaLogger.child({ application: "argo", namespace: "server" });

/**
 * Function used to create the argo server instance.
 * Loads the TLS configuration with the {@link parseArgoTLSOptions} function.
 */
export default async function createArgoServer(): Promise<ArgoServer> {
    // Create the server instance.
    const server = createSecureServer(await parseArgoTLSOptions());

    // Build the Argo wrapper.
    const argo = {
        get server() {
            return server;
        },
        async start(): Promise<void> {
            // Get the port and host variables.
            const port = getEnvironmentNumber("ARGO_PORT");
            const host = getEnvironmentString("ARGO_HOST");
            const origin = getEnvironmentString("ARGO_ORIGIN");

            // Start listening for requests.
            return new Promise<void>(resolve => {
                server.listen(port, host, undefined, function() {
                    // Log the address of the server.
                    ServerLogger.log("info", `Server is listening at ${origin}`);

                    // Resolve the promise.
                    resolve();
                });
            });
        },
        stop(): Promise<void> {
            // If the server is already stopped, do nothing.
            if (!server.listening) {
                return Promise.resolve();
            }

            // Stop the server connections.
            return new Promise<void>((resolve, reject) => {
                ServerLogger.log("info", "Server is closing down");
                server.close(function(error) {
                    error ? reject(error) : resolve();
                });
            });
        },
    };

    // Stop the server when the process exits.
    process.on("beforeExit", stop);
    process.on("exit", stop);
    process.on("SIGINT", stop);
    process.on("SIGABRT", stop);

    return argo;

    /** Wrapper for {@link argo.stop}. */
    function stop() {
        void argo.stop();
    }
}
