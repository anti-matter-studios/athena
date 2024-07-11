/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import type { SecureContextOptions } from "node:tls";
import {
    getEnvironmentFile,
    getEnvironmentFileOptional,
    getEnvironmentStringOptional,
} from "../tools/env";


/** Function used to load the TLS options from the `.env` configuration. */
export default async function parseArgoTLSOptions(): Promise<SecureContextOptions> {
    return {
        cert: await getEnvironmentFile("ARGO_TLS_CERT"),
        key: await getEnvironmentFile("ARGO_TLS_KEY"),
        passphrase: getEnvironmentStringOptional("ARGO_TLS_PASSPHRASE") ??
            await getEnvironmentFileOptional("ARGO_TLS_PASSPHRASE"),
    };
}
