import { Application, RequestHandler } from 'express'
import {
    DomainMiddleware,
    DomainRepository,
    DomainTransactionService
} from '_shared/services/domains'

export type * as EdgeDB from 'edgedb'
export type * as EdgeQLJS from '_generated/edgeql-js'
export { NextFunction, Request, Response } from 'express'
export { Application }

export type RouteHandlers = { [path: string]: RequestHandler[] }
export type RouteType = { get?: RouteHandlers, post?: RouteHandlers }

export declare module '@small-tech/https'
export declare module '@small-tech/cross-platform-hostname'
export declare module '@edgedb/auth-core'
export declare module 'postcss-font-magician'

export declare type ResponseType = { data: any, redirectUrl?: path }
export declare type ComponentContextType = {
    app: Application
    client: EdgeDB.Client
    dataAccessLayer: DomainRepository
    edgeql: EdgeQLJS
    middleware: DomainMiddleware
    transactionService: DomainTransactionService
}