/*
 * Copyright © 2024. Anti-Matter Studios.
 */

/** The expected shape for the configuration loaded by the rollup tool. */
export interface AthenaRollupConfiguration {

}

/** Expected format for the configuration loaded  */
export type AthenaRollupConfigurationSource =
    AthenaRollupConfiguration |
    (() => AthenaRollupConfiguration) |
    Promise<AthenaRollupConfiguration> |
    (() => Promise<AthenaRollupConfiguration>);

/** Shape of the module that exports the configuration. */
export type AthenaRollupConfigurationModule = { default: AthenaRollupConfigurationSource };
