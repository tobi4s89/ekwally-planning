import type {
    ContextParamsType,
    ContextResultType,
} from './index'
import { registerDomainRoutes } from '../middleware'
import { DomainDataCollector, DomainHandlers, DomainObject } from '../utils'

export const lowercaseFirst = (string: string): string => {
    if (typeof string !== 'string') return lowercaseFirst(String(string))
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export class DomainProviderService {
    current: string
    domainHandlers: DomainHandlers
    type: string

    /** Determain which domain components can be manipulated */
    domainPluginHandlers: string[] = [
        'service',
        'routes'
    ]

    /**
     * Provide specific data for each module component type, converted from string
     * Todo: Shorten string values to params only: e.g. middleware: ['client', 'app']
     * */
    provideMapper: { [key: string]: string[] } = {
        middleware: ['domainHandlers.middleware(client, app)'],
        model: ['domainHandlers.model(edgeql)'],
        service: ['domainHandlers.service(client, model)'],
        routes: ['domainHandlers.routes(middleware, service)'],
    }

    constructor(domainObject: DomainObject) {
        this.domainHandlers = domainObject.export
        this.current = domainObject.name
        this.type = domainObject.type
    }

    static async provide(
        name: string,
        params: ContextParamsType,
        domainCollector: DomainDataCollector
    ) {
        return new this(
            domainCollector.getExportByDomain(name)
        ).handle(params)
    }

    private handle({ app, client, edgeql, router }: ContextParamsType) {
        const context: ContextResultType = { app, client, edgeql }
        context[this.current] = {}

        const castObject = (services: any, arg: string, isKeyValue = false) => {
            return this.provideMapper[arg]
                ? context[this.current][arg]
                : services[arg]
        }

        for (const objectType in this.provideMapper) {
            if (this.domainHandlers[objectType as keyof DomainHandlers] === undefined) continue
            const handlerExpression = this.provideMapper[objectType as keyof typeof this.provideMapper][0]

            // Extract handler name and arguments from the expression
            const [handlerPath, argsString] = handlerExpression.split('(')
            const handlerArgs = argsString.replace(')', '').split(',').map(part => part.trim())
            const handlerName = handlerPath.split('.')[1]

            const handler = this.domainHandlers[handlerName as keyof DomainHandlers]
            if (handler) {
                const args = handlerArgs.length === 1
                    ? [castObject(context, handlerArgs[0])]
                    : [handlerArgs.reduce((acc, arg) => ({ ...acc, [arg]: castObject(context, arg) }), {})]

                context[this.current][objectType] = handler.apply(null, args)
            }
        }

        if (this.type === 'relation') {
            /** 
             * Todo: Provide domain with type relation with related domain data
             */
        }

        return {
            [this.current]: context[this.current],
            ...(context[this.current].routes
                ? { router: registerDomainRoutes.execute(router, context[this.current].routes) }
                : {})
        }
    }
}