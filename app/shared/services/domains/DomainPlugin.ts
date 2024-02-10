import { DomainComponent } from './index'
import { ComponentContextType } from '../../types'

export abstract class DomainPlugin extends DomainComponent {
    transactionService: any

    constructor(context: ComponentContextType) {
        super(context)

        this.transactionService = context.transactionService

        this.afterInit()
    }
}