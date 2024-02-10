import { sha256 } from '@edgedb/auth-core/dist/crypto'
import { CreateIntegrationDataType, IntegrationTypeMapper, IntegrationTypeMapperValueOf } from '../types'

import { Integration as IntegrationNamespace } from '_generated/interfaces'
import { DomainRepository } from '_shared/services/domains'

export default class IntegrationRepository extends DomainRepository {

    integrationTypeMapper: IntegrationTypeMapper = {
        api: this.queryModel.Integration.Api,
        emailPassword: this.queryModel.Integration.EmailPassword,
    }

    private dynamicFieldsForType = (integration: IntegrationTypeMapperValueOf<IntegrationTypeMapper>) => {
        const anyIntegration = integration as any
        return this.queryModel.is(integration, { ...anyIntegration['*'] })
    }

    private parseUint8ArrayToBase64(uint8Array: Uint8Array): string {
        const array = Array.from(uint8Array)
        return btoa(String.fromCharCode.apply(null, array))
    }

    public async create(data: CreateIntegrationDataType) {
        if (!data.type || !this.integrationTypeMapper[data.type]) {
            throw new Error(`Invalid or missing integration type: ${data.type}`);
        }

        if (data.password) {
            const hashedPassword = await sha256(data.password)
            data.password_hash = this.parseUint8ArrayToBase64(hashedPassword)
        }

        const integrationType = this.integrationTypeMapper[data.type]
        const { type, password, ...integrationData } = data

        return this.queryModel.insert(integrationType, integrationData);
    }

    public delete(id: string) {
        const Base = this.queryModel.Integration.Base

        return this.queryModel.delete(Base, () => ({ filter_single: { id } }));
    }

    public findById(id: string): Promise<any> {
        const Base = this.queryModel.Integration.Base
        const integrationFields = Object.values(this.integrationTypeMapper).map(this.dynamicFieldsForType)

        return this.queryModel.select(Base, () => ({
            ...Base['*'],
            ...Object.assign({}, ...integrationFields),
            filter_single: { id },
        }))
    }

    public getAll(): Promise<any> {
        const Base = this.queryModel.Integration.Base
        const integrationFields = Object.values(this.integrationTypeMapper).map(this.dynamicFieldsForType)

        return this.queryModel.select(Base, () => ({ ...Base['*'], ...Object.assign({}, ...integrationFields) }))
    }

    public update(data: IntegrationNamespace.Base): Promise<any> {
        const q = this.queryModel
        const Base = this.queryModel.Integration.Base

        return q.params({ id: q.uuid }, (params: { id: string }) => {
            return q.update(Base, () => ({
                filter_single: { id: params.id },
                set: data,
            }))
        })
    }
}