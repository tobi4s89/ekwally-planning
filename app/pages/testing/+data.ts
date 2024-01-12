
import { createHttpClient } from "_shared/services"
export default function data(pageContext: any) {
    const service = createHttpClient(process.env.BASE_URL || 'https://localhost')

    const test = async () => {
        const response = await service.post('/integration/create', {
            is_active: true,
            name: 'Picnic integration',
            email: 'tvanegten@hotmail.com',
            password: 'tobbrzb'
        })

        return response
    }

    console.log(pageContext)

    test().then(
        (res) => console.log(res)
    )

    return {
        title: 'Testing',
    }
}