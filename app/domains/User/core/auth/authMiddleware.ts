import createExpressAuth, { ExpressAuth } from '@edgedb/auth-express'
import { MiddlewareContextType } from '_shared/types'

export default function AuthMiddleware(context: MiddlewareContextType): ExpressAuth {
  const { app, client } = context

  const auth = createExpressAuth(client, {
    baseUrl: process.env.BASE_URL || 'https://localhost',
  })

  app.use(auth.createSessionMiddleware())

  return auth
}