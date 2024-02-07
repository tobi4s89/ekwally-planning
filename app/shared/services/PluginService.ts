import { RepositoryType, ServiceType } from '../types'

export default class PluginService {
    transactionService: ServiceType
    repository: RepositoryType

    constructor(context: any) {
        this.transactionService = context.transactionService
        this.repository = context.dataAccessLayer
    }

    static init(context: any) {
        return new this(context)
    }
}