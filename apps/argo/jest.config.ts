/*
 * Copyright © 2024. Anti-Matter Studios.
 */

/* eslint-disable */
export default {
    displayName: "argo",
    preset: "../../jest.preset.cjs",
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]s$": [
            "ts-jest",
            { tsconfig: "<rootDir>/tsconfig.spec.json" },
        ],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/apps/argo",
};
