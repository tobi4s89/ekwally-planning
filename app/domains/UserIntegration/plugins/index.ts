import { DomainPlugin } from '_shared/services/domains'
import UserIntegrationService from '../core/UserIntegrationService'
import { DomainPluginInterface } from '_shared/types/interfaces'

export default class UserIntergrationPlugin<T> extends DomainPlugin
    implements DomainPluginInterface {

    /**
     * Define plugin methods by domain type
     */
    proxies = {
        'User.transactionService': {
            createUser: this.createUserIntegration.bind(this)
        },
    }

    /**
     * 
     * @param args 
     * @param callback 
     * @returns 
     */
    async createUserIntegration(args: any, callback: Function, context: any): Promise<T> {
        const IntegrationService = context.Integration.transactionService
        const user = await callback(...args)
        const integration = await IntegrationService.createIntegration({
            name: 'Picnic Integratie Tobias boodschappen',
            type: 'emailPassword',
            email: 'email@hotmail.com',
            password: 'password'
        })

        const userIntegrationData = {
            user: user.id,
            integration: integration.id
        }

        await (this.transactionService as UserIntegrationService)
            .createRelation(userIntegrationData)

        /** Don't break the flow */
        return user
    }
}