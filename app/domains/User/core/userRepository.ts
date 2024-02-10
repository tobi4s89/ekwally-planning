import { User as UserNamespace } from '_generated/interfaces'
import { DomainRepositoryInterface } from '_shared/types/interfaces'
import { DomainRepository } from '_shared/services/domains'

export default class UserRepository extends DomainRepository
    implements DomainRepositoryInterface {

    public create(data: UserNamespace.Account) {
        const Account = this.queryModel.User.Account
        const Identity = this.queryModel.ext.auth.Identity

        return this.queryModel.insert(Account, {
            first_name: data.first_name,
            last_name: data.last_name,
            identity: this.queryModel.select(Identity, () => ({
                filter_single: { id: data.identity }
            }))
        })
    }

    public delete(id: string) {
        const Base = this.queryModel.User.Base

        return this.queryModel.delete(Base, () => (
            { filter_single: { id } }
        ))
    }

    public findById(id: string): Promise<UserNamespace.Account | null> {
        const Account = this.queryModel.User.Account

        return this.queryModel.select(Account, () => ({
            ...Account['*'],
            filter_single: { id }
        }))
    }

    public getAll(): Promise<UserNamespace.Account[]> {
        const Account = this.queryModel.User.Account

        return this.queryModel.select(Account, () => ({ ...Account['*'] }))
    }

    public update(data: UserNamespace.Account): Promise<UserNamespace.Account | null> {
        const q = this.queryModel
        const Account = this.queryModel.User.Account

        return q.params({ id: q.uuid }, (params: { id: string }) => {
            return q.update(Account, () => ({
                filter_single: { id: params.id },
                set: data,
            }))
        })
    }
}