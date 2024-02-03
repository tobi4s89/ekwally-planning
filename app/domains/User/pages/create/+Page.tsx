import { PureComponent } from 'react'
import { redirect } from 'vike/abort'
import { AccountCreate } from '../../components'
import { createHttpClient } from '_shared/services'

type MyState = {
    formData: any,
    repeatedPassword: string
}

class AccountCreatePage extends PureComponent<{}, MyState> {
    constructor(props: any) {
        super(props)

        this.state = {
            formData: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
            },
            repeatedPassword: '',
        }
    }

    containerFunctions = {
        onChange: this.handleChange.bind(this),
        onSubmit: this.handleSubmit.bind(this),
        validatePassword: this.validatePassword.bind(this)
    }

    containerProps() {
        const { formData, repeatedPassword } = this.state

        return {
            formData,
            repeatedPassword
        }
    }

    handleChange(e: any) {
        e.preventDefault()

        this.setState(({ formData }) => ({
            formData: {
                ...formData,
                [e.target.name]: e.target.value
            }
        }))
    }

    async handleSubmit(e: any) {
        e.preventDefault()

        const { formData } = this.state
        const { email, password, ...accountData } = formData

        const body = {
            email,
            password,
            accountData
        }

        try {
            const request = createHttpClient(window.location.origin)
            const response = await request.post('/auth/signup', body)

            throw redirect(response.redirectUrl)
        } catch (error) {
            console.error('There was an error submitting the form:', error)
        }
    }

    validatePassword(e: any) {
        e.preventDefault()
        this.setState({
            repeatedPassword: e.target.value
        })
    }

    render() {
        return (
            <AccountCreate
                {...this.containerFunctions}
                {...this.containerProps()}
            />
        )
    }
}

export default AccountCreatePage
