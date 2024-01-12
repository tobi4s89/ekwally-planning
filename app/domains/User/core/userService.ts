import { ServiceContextType, ServiceType } from '_shared/types'
import { promiseHandler } from '_shared/utils'

export default function UserService(context: ServiceContextType): ServiceType {
    const { model, client } = context
    return {
        createAccount: (data: any) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: any) => {
                const query = model.create(data)
                return await query.run(tx)
            })
        }),
        getUserById: async (userId: any) => promiseHandler.execute(userId, async () => {
            return await client.transaction(async (tx: any) => {
                const query = model.findById(userId)
                return await query.run(tx)
            })
        })
    }
}
