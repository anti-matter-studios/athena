/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { initializeDotEnvConfiguration } from "./tools/env";
import createArgoServer from "./server";


await initializeDotEnvConfiguration();

const argo = await createArgoServer();
await argo.start();
