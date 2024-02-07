import { sha256 } from '@edgedb/auth-core/dist/crypto'
import { RepositoryContextType, RepositoryType } from '_shared/types'
import { CreateIntegrationDataType, IntegrationTypeMapper, IntegrationTypeMapperValueOf } from '../types'

export default function IntegrationRepository(context: RepositoryContextType): RepositoryType {
    const e = context.edgeql
    const Base = e.Integration.Base
    const integrationTypeMapper: IntegrationTypeMapper = {
        api: e.Integration.Api,
        emailPassword: e.Integration.EmailPassword,
    }
    const dynamicFieldsForType = (integration: IntegrationTypeMapperValueOf<IntegrationTypeMapper>) => {
        const anyIntegration = integration as any
        return e.is(integration, { ...anyIntegration['*'] })
    }

    return {

        /**
         * @param {CreateIntegrationDataType} data
         * @return {Promise<any>}
         */
        create: async (data: CreateIntegrationDataType) => {
            if (!data.type || !integrationTypeMapper[data.type]) {
                throw new Error(`Invalid or missing integration type: ${data.type}`);
            }

            if (data.password) data.password_hash = await sha256(data.password)

            const integrationType = integrationTypeMapper[data.type]
            const { type, password, ...integrationData } = data

            return e.insert(integrationType, integrationData);
        },

        /**
         * @param {string} id
         * @return {type}
         */
        delete: (id: string) => {
            return e.delete(Base, () => ({ filter_single: { id } }));
        },

        /**
         * @param {string} id
         * @return {type}
         */
        findById: (id: string) => {
            const integrationFields = Object.values(integrationTypeMapper).map(dynamicFieldsForType);

            return e.select(Base, () => ({
                ...Base['*'],
                ...Object.assign({}, ...integrationFields),
                filter_single: { id },
            }))
        },

        getAll: () => { },

        update: () => { },
    }
}