export class HttpClient {
    options: any

    constructor(baseUrl: string, headers: any = {}) {
        this.options = {
            baseUrl,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }
    }

    async handleResponse(response: any) {
        if (!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json()
    }

    async get(urlPath: string) {
        const response = await fetch(
            new URL(urlPath, this.options.baseUrl), {
            ...this.options,
            method: 'GET'
        })

        return await this.handleResponse(response)
    }

    async post(urlPath: string, body = {}) {
        const response = await fetch(
            new URL(urlPath, this.options.baseUrl), {
            ...this.options,
            method: 'POST',
            ...(Object.keys(body).length
                ? { body: JSON.stringify(body) }
                : {}
            ),
        })

        return await this.handleResponse(response)
    }
}