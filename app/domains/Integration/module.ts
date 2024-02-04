import * as Module from './core'

const registration = {
    name: 'Integration',
    type: 'module',
    export: {
        dataAccessLayer: Module.IntegrationRepository,
        routeHandler: Module.IntegrationRoutes,
        transactionService: Module.IntegrationService,
    }
}

export default registration