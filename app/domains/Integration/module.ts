import * as Module from './core'

const registration = {
    name: 'Integration',
    type: 'module',
    export: {
        model: Module.IntegrationModel,
        routes: Module.IntegrationRoutes,
        service: Module.IntegrationService,
    }
}

export default registration