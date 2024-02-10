import createExpressAuth, { ExpressAuth } from '@edgedb/auth-express'
import { DomainMiddleware } from '_shared/services/domains'

export default class AuthMiddleware extends DomainMiddleware {
  private auth?: ExpressAuth;

  async afterInit() {
    this.auth = createExpressAuth(this.client, {
      baseUrl: process.env.BASE_URL || 'https://localhost',
    });

    this.appInstance.use(await this.auth.createSessionMiddleware())
  }
}