/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { getJestProjectsAsync } from "@nx/jest";


export default async () => ({
    projects: await getJestProjectsAsync(),
});
