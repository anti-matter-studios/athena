/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import createArgoServer from "./server";


const argo = await createArgoServer();
await argo.start();
