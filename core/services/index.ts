import { Application, Router } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '../db/edgeql-js'
import { ExclusiveTuple } from '../db/edgeql-js/typesystem'
import Types from '../db/edgeql-js/modules/integration'
import { exclusivesToFilterSingle, SelectFilterExpression } from '../db/edgeql-js/select'

export interface DomainExportType {
    middleware?: any
    model?: Function
    service?: Function
    routes?: Function
}

export type EdgeQLSelectModifiers = {
    filter: SelectFilterExpression
    filter_single: exclusivesToFilterSingle<ExclusiveTuple> | SelectFilterExpression
}

export type EdgeQLType = typeof EdgeQL & EdgeQLSelectModifiers

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
    edgeql: EdgeQLType,
    types: typeof Types,
    [key: string]: any
}

export * from './domainProviderService'