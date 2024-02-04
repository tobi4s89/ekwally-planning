import { Application, Router } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '_generated/edgeql-js'

export interface DomainExport {
    middleware?: any
    dataAccessLayer?: Function
    transactionService?: Function
    routeHandler?: Function
    plugin?: Function
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

export * from './domainProviderService'
export * from './domainProxyFactory'
export * from './proxyManager'