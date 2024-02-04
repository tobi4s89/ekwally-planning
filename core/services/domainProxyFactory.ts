export class DomainProxyFactory {
    /**
     * Determain which domain components can be manipulated
     */
    componentProxyHandlers: string[] = [
        'dataAccessLayer',
        'transactionService'
    ]

    private handle() {
        // logic to create a proxy from a domainMethod, using this.componentProxyHandlers to only make it possible to include these component types
    }
}