/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import type Koa from "koa";
import type { ArgoLoggerContext } from "./log";
import type { ArgoIdentifiedState } from "./identifier";
import type { ArgoViteDevServerState } from "./vite";


/** Describes the {@link Koa} state for the argo application. */
export type ArgoKoaState = ArgoIdentifiedState & ArgoViteDevServerState;

/** Describes the {@link Koa} context for the argo application. */
export type ArgoKoaContext = ArgoLoggerContext;

/** Parameterized {@link Koa} context with the {@link ArgoKoaState} and {@link ArgoKoaContext} types. */
export type ArgoKoaParameterizedContext<
    State = Koa.DefaultState,
    Context = Koa.DefaultContext,
    ResponseBody = unknown
> = Koa.ParameterizedContext<
    State & ArgoKoaState,
    Context & ArgoKoaContext,
    ResponseBody
>;

/** Custom {@link Koa} type with the {@link ArgoKoaState} and {@link ArgoKoaContext} types. */
export type ArgoKoaApplication<
    State = Koa.DefaultState,
    Context = Koa.DefaultContext,
> = Koa<
    State & ArgoKoaState,
    Context & ArgoKoaContext
>;
