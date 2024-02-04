import { User as UserNamespace } from '_generated/interfaces'
import {
    ServiceContextType,
    ServiceType,
    EdgeDB
} from '_shared/types'
import { promiseHandler } from '_shared/utils'

export default function UserService(context: ServiceContextType): ServiceType {
    const { dataAccessLayer: userRepository, client } = context

    return {

        /**
         * @param {UserNamespace.Account} data
         * @return {Promise}
         */
        createUser: (data: UserNamespace.Account) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = userRepository.create(data)
                return await query.run(tx)
            })
        }),

        /**
         * @param {UserNamespace.Account} data
         * @param {{ id: string }} params
         * @return {Promise<any>}
         */
        updateUser: (data: UserNamespace.Account, params: { id: string }) => promiseHandler.execute(data, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = userRepository.update(data)
                return await query.run(tx, params)
            })
        }),

        /**
         * @param {string} userId
         * @return {Promise}
         */
        getUserById: async (userId: string) => promiseHandler.execute(userId, async () => {
            return await client.transaction(async (tx: EdgeDB.Client) => {
                const query = userRepository.findById(userId)
                return await query.run(tx)
            })
        })
    }
}
