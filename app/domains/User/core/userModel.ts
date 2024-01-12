import { ModelType } from '_shared/types'

export default function UserModel(edgeql: any, types: { [key: string]: any }): ModelType {
    const e = edgeql
    const Identity = e.ext.auth.Identity
    const User = types.User
    const Account = types.Account

    return {
        create: (data: any) => {
            return e.insert(Account, {
                first_name: data.first_name,
                last_name: data.last_name,
                identity: e.select(Identity, () => ({
                    filter_single: { id: data.identity_id }
                }))
            })
        },

        delete: (id: string) => {
            return e.delete(User, () => (
                { filter_single: { id } }
            ))
        },

        findById: (id: any) => e.select(User, () => ({
            ...User['*'],
            filter_single: { id }
        })),

        getAll: () => { },

        update: () => { },
    }
}