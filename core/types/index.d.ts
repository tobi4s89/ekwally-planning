import { Application, Router } from 'express'
import { Client } from 'edgedb'
import EdgeQL from '_generated/edgeql-js'

export type DomainDirectory = {
    dir: string
    name: string
}

export type DomainHandler = (...args: any[]) => { [key: string]: Function }
export type DomainProxyConfig = { [key: string]: { [key: string]: Function } }
export type ProxyConfigFunction = (...args: any[]) => any
export type ProxyConfigEntry = ProxyConfigFunction | ProxyConfigFunction[]
export type ProxyConfig = { [domainMethod: string]: ProxyConfigEntry }
export type CastedProxyConfig = {
    [domain: string]: {
        [type: string]: {
            [key: string]: ProxyConfigEntry
        }
    }
}

export interface DomainComponentInterface {
    new(context: any): any
}
export interface DomainExport {
    dataAccessLayer?: DomainComponentInterface
    middleware?: DomainComponentInterface
    routeHandler?: DomainComponentInterface
    transactionService?: DomainComponentInterface
    plugin?: DomainComponentInterface
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
    proxies: CastedProxyConfig
}

export type ContextResultType = {
    app?: Application
    client?: Client
    edgeql?: typeof EdgeQL
    [key: string]: any
}