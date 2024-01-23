import { sha256 } from '@edgedb/auth-core/dist/crypto'
import { ModelType } from '_shared/types'
import { IntegrationTypeMapper } from '../types'

type DataType = { [key: string]: any, type: string, password: BufferSource | string }

export default function IntegrationModel(edgeql: any): ModelType {
    const e = edgeql
    const BaseIntegration = e.BaseIntegration

    const integrationTypeMapper: IntegrationTypeMapper = {
        picnic: e.PicnicIntegration,
        trello: e.TrelloIntegration
    }

    return {
        create: async (data: DataType) => {
            if (!data.type) throw new Error('Missing integration type')
            // Hash the password if it exists
            if (data.password) data.password = await sha256(data.password)

            // Get the appropriate caller based on the integration type
            try {
                const type = integrationTypeMapper[data.type]

                return e.insert(type, data)
            } catch (error) {
                throw new Error(`Invalid integration type: ${data.type}, thrown with Error: ${error}`)
            }
        },

        delete: (id: string) => {
            return e.delete(BaseIntegration, () => ({ filter_single: { id } }));
        },

        findById: (id: any) => {
            return e.select(BaseIntegration, () => ({
                ...BaseIntegration['*'],
                filter_single: { id },
            }))
        },

        getAll: () => { },

        update: () => { },
    }
}