import { Integration as IntegrationNamespace } from '_generated/interfaces'

export interface IntegrationTypeMapper {
    api: typeof IntegrationNamespace.Api
    emailPassword: typeof IntegrationNamespace.EmailPassword
}

export type CreateIntegrationDataType = {
    api_key?: string
    api_token?: string
    email?: string
    name: string
    password?: BufferSource | string
    password_hash?: string
    type: keyof IntegrationTypeMapper
}

export type IntegrationTypeMapperValueOf<T> = T[keyof T]