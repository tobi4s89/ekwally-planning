class HttpClient {
    options: any

    constructor(baseUrl: string, headers: any) {
        this.options = {
            baseUrl,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }
    }

    handleResponse = async (response: any) => {
        if (!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json()
    }

    get = async (path: string) => {
        const response = await fetch(
            new URL(path, this.options.baseUrl), {
            ...this.options,
            method: 'GET'
        })

        return this.handleResponse(response)
    }

    post = async (path: string, body = {}) => {
        const response = await fetch(
            new URL(path, this.options.baseUrl), {
            ...this.options,
            method: 'POST',
            ...(Object.keys(body).length
                ? { body: JSON.stringify(body) }
                : {}
            ),
        })

        return this.handleResponse(response)
    }
}

const createRequestClient = (baseUrl: string, headers = {}) => new HttpClient(baseUrl, headers)

export default createRequestClient