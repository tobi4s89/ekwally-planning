import { DomainComponent } from './DomainComponent'
import { ComponentContextType } from '../../types'

export abstract class DomainTransactionService extends DomainComponent {
    client: any
    repository: any

    constructor(context: ComponentContextType) {
        super(context)

        this.client = context.client
        this.repository = context.dataAccessLayer

        this.afterInit()
    }
}