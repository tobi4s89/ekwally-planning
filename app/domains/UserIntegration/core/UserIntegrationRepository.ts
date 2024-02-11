import { UserIntegration as UserIntegrationNamespace } from '_generated/interfaces'
import { DomainRepository } from '_shared/services/domains'
import { DomainRepositoryInterface } from '_shared/types/interfaces'

export default class IntegrationRepository extends DomainRepository
    implements DomainRepositoryInterface {

    public create(data: UserIntegrationNamespace.Relation) {
        const Relation = this.queryModel.UserIntegration.Relation
        const User = this.queryModel.User.Base
        const Integration = this.queryModel.Integration.Base

        return this.queryModel.insert(Relation, {
            user: this.queryModel.select(User, () => ({
                filter_single: { id: data.user }
            })),
            integration: this.queryModel.select(Integration, () => ({
                filter_single: { id: data.integration }
            }))
        })
    }
}