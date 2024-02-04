import type {
    ContextParamsType,
    ContextResultType,
} from './index'
import { registerDomainRoutes } from '../middleware'
import { CastedProxyConfig, ProxyManager } from './proxyManager'
import { DomainExport, DomainObject } from '../utils'

export const lowercaseFirst = (string: string): string => {
    if (typeof string !== 'string') return lowercaseFirst(String(string))
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export class DomainProviderService {
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
        routeHandler: ['middleware, transactionService']
    }

    constructor(domainObject: DomainObject) {
        this.domainHandlers = domainObject.export
        this.current = domainObject.name
        this.type = domainObject.type
    }

    static async provide(
        domainObject: DomainObject,
        params: ContextParamsType,
        proxyConfig: CastedProxyConfig
    ) {
        return new this(domainObject).handle(params, proxyConfig)
    }

    private handle(
        { app, client, edgeql, router }: ContextParamsType,
        proxyConfig: CastedProxyConfig
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
            const handler = this.domainHandlers[objectType as keyof DomainExport]

            if (typeof handler === 'function') {
                const args = [handlerArgs.reduce((acc, arg) => ({ ...acc, [arg]: castObject(context, arg) }), {})]
                const domainMethods = handler.apply(null, args)

                context[this.current][objectType] = ProxyManager.applyProxyBehaviorToDomainComponent(
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