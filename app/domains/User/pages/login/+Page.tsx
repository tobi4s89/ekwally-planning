import { PureComponent } from 'react'

import { AccountLogin } from '../../components'
import { HttpClient } from '_shared/services/api'

type MyState = {
    user: any,
}

class AccountLoginPage extends PureComponent<{}, MyState> {
    constructor(props: any) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
    }

    containerFunctions = {
        onChange: this.handleChange.bind(this),
        onSubmit: this.handleSubmit.bind(this)
    }

    containerProps() {
        const { user } = this.state

        return { user }
    }

    handleChange(e: any) {
        this.setState((state) => ({
            user: {
                ...state.user,
                [e.target.name]: e.target.value
            }
        }))
    }

    async handleSubmit(e: any) {
        e.preventDefault()

        const { user } = this.state

        try {
            const http = new HttpClient(window.location.origin)
            await http.post('/auth/signin', user)
        } catch (error) {
            console.error('There was an error submitting the form:', error)
        }
    }

    render() {
        return (
            <AccountLogin
                {...this.containerFunctions}
                {...this.containerProps()}
            />
        )
    }
}

export default AccountLoginPage
