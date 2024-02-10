import * as Module from './core'
import { default as Plugin } from './plugins'

const registration = {
    name: 'UserIntegration',
    type: 'relation',
    export: {
        dataAccessLayer: Module.UserIntegrationRepository,
        plugin: Plugin,
        transactionService: Module.UserIntegrationService,
    }
}

export default registration