/*
 * Copyright © 2024. Anti-Matter Studios.
 */

/* eslint-disable */
export default {
    displayName: "argo-e2e",
    preset: "../../jest.preset.cjs",
    globalSetup: "<rootDir>/src/support/global-setup.ts",
    globalTeardown: "<rootDir>/src/support/global-teardown.ts",
    setupFiles: ["<rootDir>/src/support/test-setup.ts"],
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]s$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.spec.json",
            },
        ],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/argo-e2e",
};
