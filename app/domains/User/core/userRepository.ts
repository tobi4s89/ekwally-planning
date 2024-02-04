import { User as UserNamespace, ext } from '_generated/interfaces'
import { RepositoryContextType, RepositoryType } from '_shared/types'

export default function UserRepository(context: RepositoryContextType): RepositoryType {
    const e = context.edgeql
    const Identity: ext.auth.Identity = e.ext.auth.Identity
    const Base = e.User.Base
    const Account = e.User.Account

    return {

        /**
         * @param {UserNamespace.Account} data
         * @return {Promise<UserNamespace.Account>}
         */
        create: (data: UserNamespace.Account): Promise<UserNamespace.Account> => {
            return e.insert(Account, {
                first_name: data.first_name,
                last_name: data.last_name,
                identity: e.select(Identity, () => ({
                    filter_single: { id: data.identity }
                }))
            })
        },

        /**
         * @param {string} id
         * @return {type}
         */
        delete: (id: string) => {
            return e.delete(Base, () => (
                { filter_single: { id } }
            ))
        },

        /**
         * @param {string} id
         * @return {Promise<UserNamespace.Account | null>}
         */
        findById: (id: string): Promise<UserNamespace.Account | null> => e.select(Account, () => ({
            ...Account['*'],
            filter_single: { id }
        })),

        /**
         * @return {Promise<UserNamespace.Account[]>}
         */
        getAll: (): Promise<UserNamespace.Account[]> => {
            return e.select(Account, () => ({ ...Account['*'] }))
        },

        /**
         * 
         * @param data 
         * @returns 
         */
        update: (data: UserNamespace.Account): Promise<UserNamespace.Account | null> => {
            return e.params({ id: e.uuid }, (params: { id: string }) => {
                return e.update(Account, () => ({
                    filter_single: { id: params.id },
                    set: data,
                }))
            })
        },
    }
}