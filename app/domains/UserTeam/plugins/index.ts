import { PluginInterface } from '_shared/types/interfaces'
import { PluginService } from '_shared/services'

export default class UserTeamPlugin extends PluginService implements PluginInterface {
    proxies = {
        'Integration.transactionService': {
            createIntegration: this.createUserTeam
        },
        'User.transactionService': {
            createUser: this.createUserTeam
        }
    }

    public async createUserTeam(args: any, callback: Function) {
        console.log(args, callback)
    }
}