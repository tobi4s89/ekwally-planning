import { Application } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '_generated/edgeql-js'

import { RouteHandlers } from './index'
import {
    DomainMiddleware,
    DomainRepository,
    DomainTransactionService,
} from '../services/domains'

export interface DomainMiddlewareInterface {
    client: Client
    appInstance: Application
}

export interface DomainPluginInterface {
    transactionService: DomainTransactionService
    proxies: { [key: string]: { [key: string]: ProxyConfigEntry } }
    [methodName: string]: Function<Promise<any>>
}

export interface DomainRepositoryInterface {
    queryModel: typeof EdgeQL
    create: Function<Promise<any>>
    delete: Function<Promise<any>>
    findById: Function<Promise<any>>
    getAll: Function<Promise<any>>
    update: Function<Promise<any>>
}

export interface DomainRouteInterface {
    middleware: DomainMiddleware
    transactionService: DomainTransactionService
    get?: RouteHandlers
    post?: RouteHandlers
}

export interface DomainTransactionServiceInterface {
    client: Client
    repository: DomainRepository,
    [methodName: string]: Function<Promise<any>>
}