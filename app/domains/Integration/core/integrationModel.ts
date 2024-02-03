import { sha256 } from '@edgedb/auth-core/dist/crypto'
import { ModelContextType, ModelType } from '_shared/types'
import { CreateIntegrationDataType, IntegrationTypeMapper } from '../types'

export default function IntegrationModel(context: ModelContextType): ModelType {
    const e = context.edgeql
    const Base = e.Integration.Base
    const integrationTypeMapper: IntegrationTypeMapper = {
        picnic: e.Integration.Picnic,
        trello: e.Integration.Trello
    }

    return {
        create: async (data: CreateIntegrationDataType) => {
            if (!data.type || !integrationTypeMapper[data.type]) {
                throw new Error(`Invalid or missing integration type: ${data.type}`);
            }

            if (data.password) data.password_hash = await sha256(data.password)

            const type = integrationTypeMapper[data.type]
            const integrationData = { ...data }

            delete integrationData.type
            delete integrationData.password

            return e.insert(type, integrationData);
        },

        delete: (id: string) => {
            return e.delete(Base, () => ({ filter_single: { id } }));
        },

        findById: (id: any) => {
            return e.select(Base, () => ({
                ...Base['*'],
                filter_single: { id },
            }))
        },

        getAll: () => { },

        update: () => { },
    }
}