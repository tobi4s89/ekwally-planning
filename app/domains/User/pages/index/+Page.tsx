import { PureComponent } from 'react'

import { AccountView } from '../../components'

class AccountPage extends PureComponent {
    containerFunctions = {}

    containerProps() {
        return {}
    }

    render() {
        return (
            <AccountView
                { ...this.containerFunctions }
                { ...this.containerProps() }
            />
        )
    }
}

export default AccountPage
