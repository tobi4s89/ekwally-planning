import { RouteContextType, RouteType } from '_shared/types'

export default function UserRoutes(context: RouteContextType): RouteType {
    const { middleware, service: userService } = context
    return {
        get: {
            '/auth/signout': [
                middleware.signout,
                (req: any, res: any) => res.redirect('/account/login'),
            ],
            '/auth/verify': [
                middleware.emailPassword.verify,
                (req: any, res: any) => res.redirect('/account')
            ],
        },
        post: {
            '/auth/signup': [
                middleware.emailPassword.signUp(`${process.env.BASE_URL}/auth/verify`),
                async (req: any, res: any, next: any) => {
                    try {
                        const data = await userService.createAccount({
                            ...req.body.accountData,
                            identity_id: req.tokenData?.identity_id || ''
                        })

                        return res.status(201).json({
                            data,
                            redirectUrl: '/account'
                        })
                    } catch (error) {
                        res.status(500).end(`Error from the server: ${await res.text()}`)
                        next(error)
                    }
                }
            ],
            '/auth/signin': [
                middleware.emailPassword.signIn,
                async (req: any, res: any) => {
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
