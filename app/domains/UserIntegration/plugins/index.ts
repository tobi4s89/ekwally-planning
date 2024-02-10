import { DomainPlugin } from '_shared/services/domains'
import UserIntegrationService from '../core/UserIntegrationService'

export default class UserIntergrationPlugin extends DomainPlugin {

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
    async createUserIntegration(args: any, callback: Function, { Integration: { transactionService: IntegrationService } }: any) {
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