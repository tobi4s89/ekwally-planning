import { NextFunction, Request, Response, RouteContextType, RouteType } from '_shared/types'

export default function IntegrationRoutes(context: RouteContextType): RouteType {
    return {

        /**
         * 
         */
        post: {
            '/integration/create': [
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const data = await context.service.createIntegration(req.body)

                        return res.status(201).json({ data })
                    } catch (error) {
                        next(error)
                    }
                }
            ]
        },
    }
}
