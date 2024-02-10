import { Request, Response } from '_shared/types'
import { DomainRouteInterface } from '_shared/types/interfaces'
import { CustomRequest } from '../types'
import { DomainRoute } from '_shared/services/domains'

export default class UserRoutes extends DomainRoute
    implements DomainRouteInterface {

    /**
     * Add auth middleware and callbacks to the 'get' routes method
     */
    get = {
        '/auth/signout': [
            this.middleware.auth.signout,
            (req: Request, res: Response) => res.redirect('/account/login'),
        ],
        '/auth/verify': [
            this.middleware.auth.emailPassword.verify,
            (req: Request, res: Response) => res.redirect('/account')
        ],
    }

    /**
     * Add auth middleware and callbacks to the 'post' routes method
     */
    post = {
        '/auth/signup': [
            this.middleware.auth.emailPassword.signUp(`${process.env.BASE_URL}/auth/verify`),
            async (req: CustomRequest, res: Response, next: any) => {
                try {
                    const data = await this.transactionService.createUser({
                        ...req.body?.accountData || {},
                        identity: req.tokenData?.identity_id || ''
                    })


                    return res.status(201).json({
                        data,
                        redirectUrl: '/account'
                    })
                } catch (error) {
                    res.status(500).end(`Error from the server: ${error}`)
                    next(error)
                }
            }
        ],
        '/auth/signin': [
            this.middleware.auth.emailPassword.signIn,
            async (req: CustomRequest, res: Response) => {
                if (!(await req.session?.isSignedIn())) {
                    return res.status(401).json({
                        redirectUrl: '/account/login'
                    })
                }

                return res.status(201).json({
                    redirectUrl: '/account'
                })
            }
        ],
    }
}
