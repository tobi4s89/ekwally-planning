import { createClient } from 'edgedb'
export { default as edgeql } from './edgeql-js'

export const client = createClient()

async function connect() {
    try {
        await client.ensureConnected()
        console.log("EdgeDB connected successfully")
    } catch (e) {
        console.error(e)
    }
}

export default connect
