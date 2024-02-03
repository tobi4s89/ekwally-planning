import { User as UserNamespace } from '_generated/interfaces'
import {
    ServiceContextType,
    ServiceType,
    EdgeDB
} from '_shared/types'
import { promiseHandler } from '_shared/utils'

export default function UserService(context: ServiceContextType): ServiceType {
    const { model, client } = context
    return {
        createUser: (data: UserNamespace.Account) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = model.create(data)
                return await query.run(tx)
            })
        }),
        updateUser: (data: UserNamespace.Account, params: { id: string }) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = model.update(data)
                return await query.run(tx, params)
            })
        }),
        getUserById: async (userId: string) => promiseHandler.execute(userId, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = model.findById(userId)
                return await query.run(tx)
            })
        })
    }
}
