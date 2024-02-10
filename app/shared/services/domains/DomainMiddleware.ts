import { DomainComponent } from './DomainComponent'
import {
    Application,
    ComponentContextType,
    EdgeDB
} from '../../types'

export abstract class DomainMiddleware extends DomainComponent {
    client: EdgeDB.Client
    appInstance: Application

    constructor(context: ComponentContextType) {
        super(context)

        this.client = context.client
        this.appInstance = context.app

        this.afterInit()
    }
}