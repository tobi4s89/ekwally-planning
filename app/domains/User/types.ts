import { User as UserNamespace } from '_generated/interfaces'
import { Request } from '_shared/types'
export interface CustomRequest extends Request {
    body: { accountData: UserNamespace.Account },
    session: { isSignedIn: () => Promise<boolean> }
    tokenData: { identity_id: string }
}