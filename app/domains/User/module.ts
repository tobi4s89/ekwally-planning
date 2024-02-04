import * as Module from './core'

const registration = {
    name: 'User',
    type: 'module',
    export: {
        middleware: Module.AuthMiddleware,
        dataAccessLayer: Module.UserRepository,
        routeHandler: Module.UserRoutes,
        transactionService: Module.UserService,
    }
}

export default registration