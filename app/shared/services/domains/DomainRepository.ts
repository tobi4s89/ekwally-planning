import { DomainComponent } from './DomainComponent'
import { ComponentContextType } from '../../types'

export abstract class DomainRepository extends DomainComponent {
    queryModel: any

    constructor(context: ComponentContextType) {
        super(context)

        this.queryModel = context.edgeql

        this.afterInit()
    }
}