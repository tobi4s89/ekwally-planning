import { Router } from 'express'
import { RouteType } from '_shared/types'

type ValidRouterMethods = 'get' | 'post'

function isValidRouterMethod(method: string): method is ValidRouterMethods {
    return ['get', 'post'].includes(method)
}

export const registerDomainRoutes = {
    execute: (router: Router, routes: RouteType) => {
        Object.entries(routes).forEach(([method, routeHandlers]) => {
            if (isValidRouterMethod(method)) {
                Object.entries(routeHandlers).forEach(([path, handlers]) => {
                    (router[method as ValidRouterMethods])(path, ...handlers)
                })
            }
        })

        return router
    }
}