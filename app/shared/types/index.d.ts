import { ExpressAuth } from '@edgedb/auth-express'
import type { Client } from 'edgedb'
import { Application, RequestHandler } from 'express'


type RouteHandlers = { [path: string]: RequestHandler[] }
export declare type ResponseType = { data: any, redirectUrl?: path }

export declare type ServiceType = { [method: string]: Function }
export declare type ServiceContextType = { client: Client, model: ModelType }
export declare type MiddlewareType = ExpressAuth | any
export declare type MiddlewareContextType = { app: Application, client: Client }
export declare type ModelType = { create: Function<T>, delete: Function<T>, findById: Function<T>, getAll: Function<T>, update: Function<T> }
export declare type ModelContextType = { edgeql: any }
export declare type RouteType = { get?: RouteHandlers, post?: RouteHandlers }
export declare type RouteContextType = { middleware: MiddlewareType, service: ServiceType }