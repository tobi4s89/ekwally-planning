import { ComponentContextType } from '../../types'

export abstract class DomainComponent {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(context: ComponentContextType) { }
    protected afterInit() { }
}