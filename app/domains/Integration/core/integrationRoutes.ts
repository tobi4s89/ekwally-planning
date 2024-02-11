import { NextFunction, Request, Response } from '_shared/types'
import { DomainRouteInterface } from '_shared/types/interfaces'
import { DomainRoute } from '_shared/services/domains'

export default class IntegrationRoutes extends DomainRoute
    implements DomainRouteInterface {

    /**
     * 
     */
    post = {
        '/integration/create': [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const data = await this.transactionService.createIntegration(req.body)

                    return res.status(201).json({ data })
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}
