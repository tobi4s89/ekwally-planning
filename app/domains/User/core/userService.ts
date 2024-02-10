import { User as UserNamespace } from '_generated/interfaces'
import { DomainTransactionService } from '_shared/services/domains'
import { EdgeDB } from '_shared/types'
import { promiseHandler } from '_shared/utils'

export default class UserService extends DomainTransactionService {

    public createUser(data: UserNamespace.Account) {
        return promiseHandler.execute(data, async () => {
            return await this.client.transaction(async (tx: EdgeDB.Client) => {
                const query = this.repository.create(data)
                return await query.run(tx)
            })
        })
    }

    public updateUser(data: UserNamespace.Account, params: { id: string }) {
        return promiseHandler.execute(data, async () => {
            return await this.client.transaction(async (tx: EdgeDB.Client) => {
                const query = this.repository.update(data)
                return await query.run(tx, params)
            })
        })
    }

    public getUserById(userId: string) {
        return promiseHandler.execute(userId, async () => {
            return await this.client.transaction(async (tx: EdgeDB.Client) => {
                const query = this.repository.findById(userId)
                return await query.run(tx)
            })
        })
    }
}
