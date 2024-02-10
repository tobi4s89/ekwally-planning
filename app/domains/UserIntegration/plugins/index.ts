import { DomainPlugin } from '_shared/services/domains'
import { DomainPluginInterface } from '_shared/types/interfaces'

export default class UserIntergrationPlugin extends DomainPlugin
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
    async createUserIntegration(args: any, callback: Function, context: any) {
        const [data] = args
        const integrationData = {
            name: 'Picnic Integratie Tobias boodschappen',
            type: 'emailPassword',
            email: 'tvanegten@hotmail.com',
            password: 'tobbrzb'
        }
        const userId = data.identity
        const integrationId = await context.Integration.transactionService.createIntegration(integrationData)

        console.log(userId, integrationId)

        return await callback(...args)
    }
}