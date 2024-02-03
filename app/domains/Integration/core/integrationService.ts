import { EdgeDB, ServiceContextType, ServiceType } from '_shared/types'
import { promiseHandler } from '_shared/utils'

import { CreateIntegrationDataType } from '../types'

export default function IntegrationService(context: ServiceContextType): ServiceType {
    const { model: integrationModel, client } = context
    return {
        createIntegration: (data: CreateIntegrationDataType) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = integrationModel.create(data)

                return await query.run(tx)
            })
        }),
    }
}
