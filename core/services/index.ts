import { Application, Router } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '_generated/edgeql-js'

export type DomainDirectory = {
    dir: string
    name: string
}

export type DomainHandler = (...args: any[]) => { [key: string]: Function }
export type DomainProxyConfig = { [key: string]: { [key: string]: Function } }

export interface DomainExport {
    middleware?: DomainHandler
    dataAccessLayer?: DomainHandler
    routeHandler?: DomainHandler
    transactionService?: DomainHandler
    plugin?: DomainProxyConfig
}

export interface DomainObject {
    name: string
    export: DomainExport
    type: 'module' | 'relation'
}

export type ContextParamsType = {
    app: Application
    client: Client
    edgeql: typeof EdgeQL
    router: Router
}

export type ContextResultType = {
    app: Application
    client: Client
    edgeql: typeof EdgeQL
    [key: string]: any
}

export * from './domainDataCollector'
export * from './domainContextProvider'
export * from './domainProxyManager'