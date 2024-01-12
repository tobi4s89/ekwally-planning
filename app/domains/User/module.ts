import * as Module from './core'

const registration = {
    name: 'User',
    type: 'module',
    export: {
        middleware: Module.AuthMiddleware,
        model: Module.UserModel,
        routes: Module.UserRoutes,
        service: Module.UserService,
    }
}

export default registration