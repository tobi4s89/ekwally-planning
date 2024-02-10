import { PureComponent } from 'react'
import { AccountCreate } from '../../components'
import { HttpClient } from '_shared/services/api'

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
            const http = new HttpClient(window.location.origin)
            const response = await http.post('/auth/signup', body)

            window.location.href = response.redirectUrl
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

export default function Page() {
    return <AccountCreatePage />
}
