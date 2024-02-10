import hostname from '@small-tech/cross-platform-hostname'
import https from '@small-tech/https'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'node:fs'
import os from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderPage } from 'vike/server'
import 'dotenv/config'
import 'isomorphic-unfetch'

import connectDatabase, { client, edgeql } from './core/db/client'
import {
    errorHandlingMiddleware,
    DomainContextProvider,
    DomainDataCollector,
} from './core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const isProduction = process.env.NODE_ENV === "production"
const root = __dirname

export { root }

connectDatabase().catch(console.error)

startServer()

async function startServer() {
    const router = express.Router()
    const app = express();
    const domainCollector = await DomainDataCollector.init()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(compression())

    if (isProduction) {
        const sirv = (await import('sirv')).default
        app.use(sirv(`${root}/dist/client`))
    } else {
        // Instantiate Vite's development server and integrate its middleware to our server.
        // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
        // and would unnecessarily bloat our server in production.)
        const certificateDirectory = join(os.homedir(), '.small-tech.org', 'auto-encrypt-localhost')
        const cert = fs.readFileSync(join(certificateDirectory, 'localhost.pem'), 'utf-8')
        const key = fs.readFileSync(join(certificateDirectory, 'localhost-key.pem'), 'utf-8')

        const vite = await import("vite");
        const viteDevMiddleware = (
            await vite.createServer({
                root,
                server: {
                    middlewareMode: true,
                    https: {
                        cert,
                        key
                    }
                },
            })
        ).middlewares;
        app.use(viteDevMiddleware);
    }

    /**
     * Domain registration
     * 
     * Todo: Move all proxy and domain registration logic to specific service/util
     */
    let proxies = {}
    const domainContext: { [key: string]: any } = {}
    const contextParams = { app, router, client, edgeql, proxies }

    for (const name of domainCollector.getNames()) {
        const {
            router: routeMiddleware,
            [name]: currentContext
        }: { [key: string]: any } = await DomainContextProvider.provide(
            domainCollector.getDomainByName(name),
            contextParams,
            domainContext
        )

        if (routeMiddleware) app.use(routeMiddleware)

        Object.assign(domainContext, { [name]: currentContext })
        console.log('--------------CURRENTCONTEXT-----', { [name]: currentContext })
    }

    /**
     * Handling errors
     */
    app.use(errorHandlingMiddleware)

    /**
     * Vike route
     *
     * @link {@see https://vike.dev}
     **/
    app.all("*", async (req, res, next) => {
        const pageContextInit = {
            domainContext,
            urlOriginal: req.originalUrl
        }
        const pageContext = await renderPage(pageContextInit)
        const { httpResponse } = pageContext
        if (httpResponse === null) return next()

        const { body, statusCode, headers, earlyHints } = httpResponse
        if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
        headers.forEach(([name, value]) => res.setHeader(name, value))
        res.status(statusCode)
        // For HTTP streams use httpResponse.pipe() instead, see https://vike.dev/stream
        res.send(body)
    });

    const server = isProduction ? https.createServer({ domains: [hostname] }, app) : https.createServer(app)
    server.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, () => {
        console.log(`Server running at https://${isProduction ? hostname : 'localhost'}`)
    })
}
