import { DomainTransactionService } from '_shared/services/domains'
import { EdgeDB } from '_shared/types'
import { DomainTransactionServiceInterface } from '_shared/types/interfaces'
import { promiseHandler } from '_shared/utils'

export default class UserIntegrationService extends DomainTransactionService
    implements DomainTransactionServiceInterface {

    public createRelation(data: { user: string, integration: string }) {
        return promiseHandler.execute(data, async () => {
            return await this.client.transaction(async (tx: EdgeDB.Client) => {
                const query = this.repository.create(data)

                return await query.run(tx)
            })
        })
    }
}