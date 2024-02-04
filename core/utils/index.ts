export * from './domainDataCollector'

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