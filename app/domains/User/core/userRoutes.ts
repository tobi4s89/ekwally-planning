import { Request, Response, RouteContextType, RouteType } from '_shared/types'
import { CustomRequest } from '../types'

export default function UserRoutes(context: RouteContextType): RouteType {
    const { middleware, service: userService } = context
    return {
        get: {
            '/auth/signout': [
                middleware.signout,
                (req: Request, res: Response) => res.redirect('/account/login'),
            ],
            '/auth/verify': [
                middleware.emailPassword.verify,
                (req: Request, res: Response) => res.redirect('/account')
            ],
        },
        post: {
            '/auth/signup': [
                middleware.emailPassword.signUp(`${process.env.BASE_URL}/auth/verify`),
                async (req: CustomRequest, res: Response, next: any) => {
                    try {
                        const data = await userService.createUser({
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
                middleware.emailPassword.signIn,
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
        },
    }
}
