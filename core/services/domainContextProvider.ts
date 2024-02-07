import { DomainComponentService } from '_shared/services'
import type {
    ContextParamsType,
    ContextResultType,
    DomainExport,
    DomainObject,
} from './index'
import { registerDomainRoutes } from '../middleware'
import { CastedProxyConfig, DomainProxyManager } from './domainProxyManager'

export const lowercaseFirst = (string: string): string => {
    if (typeof string !== 'string') return lowercaseFirst(String(string))
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export class DomainContextProvider {
    current: string
    domainHandlers: DomainExport
    type: string

    /**
     * Provide specific data for each module component type, converted from string
     * */
    provideMapper: { [key: string]: string[] } = {
        middleware: ['client, app'],
        dataAccessLayer: ['edgeql'],
        transactionService: ['client, dataAccessLayer'],
        routeHandler: ['middleware, transactionService'],
        plugin: ['dataAccessLayer', 'transactionService']
    }

    constructor(domainObject: DomainObject) {
        this.domainHandlers = domainObject.export
        this.current = domainObject.name
        this.type = domainObject.type
    }

    static async provide(
        domainObject: DomainObject,
        params: ContextParamsType
    ) {
        return new this(domainObject).handle(params)
    }

    private handle(
        { app, client, edgeql, router, proxies: CastedProxyConfig }: ContextParamsType
    ) {
        const context: ContextResultType = { app, client, edgeql }
        context[this.current] = {}

        const castObject = (services: any, arg: string) => {
            return this.provideMapper[arg]
                ? context[this.current][arg]
                : services[arg]
        }

        for (const objectType in this.provideMapper) {
            if (this.domainHandlers[objectType as keyof DomainExport] === undefined) continue
            const handlerExpression = this.provideMapper[objectType as keyof typeof this.provideMapper][0]

            // Extract arguments from the expression
            const handlerArgs = handlerExpression.split(',').map(part => part.trim())
            const ClassComponent = this.domainHandlers[objectType as keyof DomainExport]

            if (typeof ClassComponent === 'function') {
                const args = [handlerArgs.reduce((acc, arg) => ({ ...acc, [arg]: castObject(context, arg) }), {})]
                const domainMethods = handler.apply(null, args)

                context[this.current][objectType] = DomainProxyManager.applyProxyToComponent(
                    this.current, objectType, domainMethods, proxyConfig
                )
            }
        }

        return {
            [this.current]: context[this.current],
            ...(context[this.current].routeHandler
                ? { router: registerDomainRoutes.execute(router, context[this.current].routeHandler) }
                : {})
        }
    }
}