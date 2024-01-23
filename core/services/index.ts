import { Application, Router } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '_generated/edgeql-js'

export interface DomainExportType {
    middleware?: any
    model?: Function
    service?: Function
    routes?: Function
}

export type ContextParamsType = {
    app: Application
    client: Client
    domains: string[]
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
