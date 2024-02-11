import { DomainTransactionService } from '_shared/services/domains'
import { EdgeDB } from '_shared/types'
import { DomainTransactionServiceInterface } from '_shared/types/interfaces'
import { promiseHandler } from '_shared/utils'
import { CreateIntegrationDataType } from '../types'

export default class IntegrationService extends DomainTransactionService
    implements DomainTransactionServiceInterface {

    public createIntegration(data: CreateIntegrationDataType) {
        return promiseHandler.execute(data, async () => {
            return await this.client.transaction(async (tx: EdgeDB.Client) => {
                const query = await this.repository.create(data)

                return await query.run(tx)
            })
        })
    }
}