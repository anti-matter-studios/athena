/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import type { Http2SecureServer } from "node:http2";
import { randomUUID } from "node:crypto";
import type { ViteDevServer } from "vite";
import Koa from "koa";

import type { ArgoKoaApplication } from "./types";
import { createAttachViteDevServerMiddleware, handleRequestWithViteMiddleware } from "./vite";
import { injectRequestIdentifierMiddleware } from "./identifier";
import { injectArgoLoggerMiddleware } from "./log";


/**
 * Creates a new {@link Koa} application for the Argo application.
 * Applies all the middleware necessary for compatibility with the {@link ViteDevServer}.
 *
 * @param server The HTTP/2 secure server instance used by the application.
 * @param viteDevServer The {@link ViteDevServer} instance of the application.
 */
export default function createArgoKoaApplication(
    server: Http2SecureServer,
    viteDevServer: ViteDevServer,
): ArgoKoaApplication {
    // Create a new Koa application.
    const koa = new Koa();

    // Attach the request listener to the server.
    addKoaRequestListener(server, koa);

    // Attach the middleware stack to the application.
    return koa
        .use(injectRequestIdentifierMiddleware)
        .use(injectArgoLoggerMiddleware)
        .use(createAttachViteDevServerMiddleware(viteDevServer))
        .use(handleRequestWithViteMiddleware);
}

/**
 * Simple helper used to attach the provided {@link Koa} instance to the server.
 *
 * @param server The server that the application should attach to.
 * @param application The application to attach on to the server.
 */
function addKoaRequestListener(server: Http2SecureServer, application: Koa) {
    // Attach Koa to the server instance.
    server.addListener("request", function handleRequestWithKoa(request, response) {
        // Handle the request with Koa.
        application.callback()(request, response).catch(onUnhandledKoaError);

        /**
         * Catch handler for the {@link Koa} middleware wrapper.
         * Logs the error to the console.
         * Returns the error to the client, if possible.
         *
         * @param error The error that occurred.
         */
        function onUnhandledKoaError(error: unknown) {
            // Log the error to the console.
            console.error("Unhandled error in the Koa middleware stack: ");
            console.error(error);

            // Send an error report to the client if possible.
            if (response.writable) {
                // Prepare the error.
                const document = JSON.stringify({
                    errors: [
                        {
                            id: randomUUID(),
                            title: "Unhandled Server Error",
                            detail:
                                "An unhandled error occurred on the server. " +
                                "Contact the server administrator if the error is recurrent.",
                            status: "500",
                            code: "0xff01",
                            links: {
                                about: {
                                    href: "https://akane.shimoka.dev/docs/errors/0xff01",
                                    rel: "about",
                                    title: "Error Explanations - 0xff01 (Unhandled Server Error)",
                                    type: "text/html",
                                    hreflang: ["fr-FR", "en-GB"],
                                },
                            },
                        },
                    ],
                    jsonapi: {
                        version: "1.1",
                        profile: [],
                        ext: [],
                    },
                });

                // Send the headers to the client, if possible.
                if (!response.headersSent) {
                    response.writeHead(
                        500,
                        {
                            "Content-Type": "application/vnd.api+json",
                            "Content-Length": document.length,
                        },
                    );
                }

                // Send the data to the client.
                response.end(document);
            }
        }
    });
}
