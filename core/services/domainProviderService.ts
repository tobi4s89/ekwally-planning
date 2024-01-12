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

export const parseEgdeQLObject = (e: any, domain: string, domains: string[]): any => {
    const availableDomains = domains.map(name => lowercaseFirst(name))
    const types = {}
    const strippedEdgeQLObject: any = {}

    for (const key in e) {
        if (!availableDomains.includes(key)) strippedEdgeQLObject[key] = e[key]
        if (lowercaseFirst(domain) === key && Reflect.has(e, lowercaseFirst(domain))) {
            Object.assign(types, Reflect.get(e, lowercaseFirst(domain)))
        }
    }

    return { edgeql: strippedEdgeQLObject, types }
}

export class DomainProviderService {
    current: string
    domainHandlers: DomainHandlers

    provideMapper: { [key: string]: string[] } = {
        middleware: ['domainHandlers.middleware(client, app)'],
        model: ['domainHandlers.model(edgeql, types)'],
        service: ['domainHandlers.service(client, model)'],
        routes: ['domainHandlers.routes(middleware, service)']
    }

    constructor(domainObject: DomainObject) {
        this.current = domainObject.name
        this.domainHandlers = domainObject.export
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

    private handle({ app, client, domains, edgeql: e, router }: ContextParamsType) {
        const { edgeql, types } = parseEgdeQLObject(e, this.current, domains)

        console.log('------------------------types', types)
        console.log('------------------------edge', edgeql)
        const context: ContextResultType = { app, client, edgeql, types }
        context[this.current] = {}

        const castObject = (services: any, arg: string, isKeyValue = false) => {
            return this.provideMapper[arg]
                ? context[this.current][arg]
                : services[arg]
        }

        for (const type in this.provideMapper) {
            if (this.domainHandlers[type as keyof DomainHandlers] === undefined) continue
            const handlerExpression = this.provideMapper[type as keyof typeof this.provideMapper][0]

            // Extract handler name and arguments from the expression
            const [handlerPath, argsString] = handlerExpression.split('(')
            const handlerArgs = argsString.replace(')', '').split(',').map(part => part.trim())
            const handlerName = handlerPath.split('.')[1]

            const handler = this.domainHandlers[handlerName as keyof DomainHandlers]
            if (handler) {
                const args = handlerArgs.length === 1
                    ? [castObject(context, handlerArgs[0])]
                    : [handlerArgs.reduce((acc, arg) => ({ ...acc, [arg]: castObject(context, arg) }), {})]

                context[this.current][type] = handler.apply(null, args)
            }
        }

        return {
            [this.current]: context[this.current],
            ...(context[this.current].routes
                ? { router: registerDomainRoutes.execute(router, context[this.current].routes) }
                : {})
        }
    }
}