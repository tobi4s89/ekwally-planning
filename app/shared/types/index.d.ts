import { ExpressAuth } from '@edgedb/auth-express'
import { Application, RequestHandler } from 'express'


export type * as EdgeDB from 'edgedb'
export type * as EdgeQLJS from '_generated/edgeql-js'
export { NextFunction, Request, Response } from 'express'

type RouteHandlers = { [path: string]: RequestHandler[] }

export declare module '@small-tech/https'
export declare module '@small-tech/cross-platform-hostname'
export declare module '@edgedb/auth-core'
export declare module 'postcss-font-magician'

export declare type HookFunction = (args: any[], originalMethod: Function) => Promise<void> | void;
export declare type ServiceMethod = (...args: any[]) => Promise<any>;
export declare type MethodWrapper = (method: ServiceMethod, instance: any) => ServiceMethod;

export declare type ResponseType = { data: any, redirectUrl?: path }
export declare type ServiceType = { [method: string]: Function }
export declare type ServiceContextType = { client: EdgeDB.Client, model: ModelType }
export declare type MiddlewareType = ExpressAuth | any
export declare type MiddlewareContextType = { app: Application, client: Client }
export declare type ModelType = { create: Function<T>, delete: Function<T>, findById: Function<T>, getAll: Function<T>, update: Function<T> }
export declare type ModelContextType = { edgeql: EdgeQLJS }
export declare type RouteType = { get?: RouteHandlers, post?: RouteHandlers }
export declare type RouteContextType = { middleware: MiddlewareType, service: ServiceType }