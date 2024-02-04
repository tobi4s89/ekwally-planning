import { EdgeDB, ServiceContextType, ServiceType } from '_shared/types'
import { promiseHandler } from '_shared/utils'

import { CreateIntegrationDataType } from '../types'

export default function IntegrationService(context: ServiceContextType): ServiceType {
    const { dataAccessLayer: integrationRepository, client } = context

    return {

        /**
         * @param {CreateIntegrationDataType} data
         * @return {Promise}
         */
        createIntegration: (data: CreateIntegrationDataType) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = integrationRepository.create(data)

                return await query.run(tx)
            })
        }),
    }
}
