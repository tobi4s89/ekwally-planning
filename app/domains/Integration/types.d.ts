import { Integration as IntegrationNamespace } from '_generated/interfaces'

export interface IntegrationTypeMapper {
    api: IntegrationNamespace.Api
    emailPassword: IntegrationNamespace.EmailPassword
}

export type CreateIntegrationDataType = {
    api_key?: string
    api_token?: string
    email?: string
    password?: BufferSource | string
    password_hash?: Uint8Array
    type?: keyof IntegrationTypeMapper
}

export type IntegrationTypeMapperValueOf<T> = T[keyof T]