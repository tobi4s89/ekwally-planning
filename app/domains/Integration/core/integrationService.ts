import { ServiceContextType, ServiceType } from '_shared/types'
import { promiseHandler } from '_shared/utils'

export default function IntegrationService(context: ServiceContextType): ServiceType {
    const { model: integrationModel, client } = context
    return {
        createIntegration: (data: any) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: any) => {
                const query = integrationModel.create(data)

                return await query.run(tx)
            })
        }),
    }
}
