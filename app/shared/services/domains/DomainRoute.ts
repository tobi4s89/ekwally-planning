import { DomainComponent } from './DomainComponent'
import { ComponentContextType } from '../../types'

export abstract class DomainRoute extends DomainComponent {
    middleware: any
    transactionService: any

    constructor(context: ComponentContextType) {
        super(context)

        this.middleware = context.middleware
        this.transactionService = context.transactionService

        this.afterInit()
    }
}