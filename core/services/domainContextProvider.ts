import type {
    ContextParamsType,
    ContextResultType,
    DomainComponentInterface,
    DomainExport,
    DomainObject,
} from '../types'
import { registerDomainRoutes } from '../middleware'
import { DomainProxyManager } from './domainProxyManager'
import { classToObject } from '../utils/classToObject'

export const lowercaseFirst = (string: string): string => {
    if (typeof string !== 'string') return lowercaseFirst(String(string))
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export class DomainContextProvider {
    globalContext: any
    context: ContextResultType
    current: DomainObject

    /**
     * Provide specific data for each module component type, converted from string
     * */
    provideMapper: { [key: string]: string[] } = {
        middleware: ['client', 'app'],
        dataAccessLayer: ['edgeql'],
        transactionService: ['client', 'dataAccessLayer'],
        routeHandler: ['middleware', 'transactionService'],
        plugin: ['transactionService']
    }

    constructor(domainObject: DomainObject, globalContext: any) {
        this.context = {}
        this.current = domainObject
        this.globalContext = globalContext
    }

    static async provide(
        domainObject: DomainObject,
        params: ContextParamsType,
        globalContext: any
    ) {
        return new this(domainObject, globalContext).handle(params)
    }

    private handle(
        { app, client, edgeql, router, proxies }: ContextParamsType
    ) {
        const contextParams: ContextResultType = { app, client, edgeql }

        for (const componentType in this.provideMapper) {
            if (this.current.export[componentType as keyof DomainExport] === undefined) continue

            const DomainComponent = this.current.export[componentType as keyof DomainExport] as DomainComponentInterface
            const handlerArgs = this.provideMapper[componentType as keyof typeof this.provideMapper]
            const domainObject = classToObject(
                new DomainComponent(handlerArgs.reduce((acc, arg) => (
                    { ...acc, [arg]: this.context[arg] ?? contextParams[arg] }
                ), {}))
            )

            if ('plugin' === componentType && 'proxies' in domainObject) {
                const currentProxy = DomainProxyManager.castProxyConfig(domainObject.proxies)

                proxies = DomainProxyManager.mergeProxyConfigs(
                    proxies,
                    currentProxy
                )
            }

            this.context[componentType] = DomainProxyManager.applyProxyToComponent(
                this.current.name,
                componentType,
                domainObject,
                proxies,
                this.globalContext
            )
        }

        return {
            [this.current.name]: this.context,
            ...(this.context.routeHandler
                ? { router: registerDomainRoutes.execute(router, this.context.routeHandler) }
                : {})
        }
    }
}