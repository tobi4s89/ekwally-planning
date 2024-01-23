import { ExpressAuth } from '@edgedb/auth-express'
import type { Client } from 'edgedb'
import { Application, RequestHandler } from 'express'

type RouteHandlers = { [path: string]: RequestHandler[] }

export declare module '@small-tech/https'
export declare module '@small-tech/cross-platform-hostname'
export declare module '@edgedb/auth-core'
export declare module 'postcss-font-magician'

export type * from '_generated/interfaces'

export declare type HookFunction = (args: any[], originalMethod: Function) => Promise<void> | void;
export declare type ServiceMethod = (...args: any[]) => Promise<any>;
export declare type MethodWrapper = (method: ServiceMethod, instance: any) => ServiceMethod;

export declare type ResponseType = { data: any, redirectUrl?: path }
export declare type ServiceType = { [method: string]: Function }
export declare type ServiceContextType = { client: Client, model: ModelType }
export declare type MiddlewareType = ExpressAuth | any
export declare type MiddlewareContextType = { app: Application, client: Client }
export declare type ModelType = { create: Function<T>, delete: Function<T>, findById: Function<T>, getAll: Function<T>, update: Function<T> }
export declare type ModelContextType = { edgeql: any }
export declare type RouteType = { get?: RouteHandlers, post?: RouteHandlers }
export declare type RouteContextType = { middleware: MiddlewareType, service: ServiceType }