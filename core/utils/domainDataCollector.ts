import fs from 'node:fs'
import path from 'node:path'
import { root } from '../../express-entry'

type DomainDirectory = {
    dir: string
    name: string
}

type DomainHandler = (...args: any[]) => any

export interface DomainHandlers {
    middleware?: DomainHandler
    model?: DomainHandler
    routes?: DomainHandler
    service?: DomainHandler
}

export interface DomainObject {
    name: string
    export: DomainHandlers
}

export class DomainDataCollector {
    domains: DomainObject[]

    constructor(domains: DomainObject[]) {
        this.domains = domains
    }

    static async init() {
        const source = path.resolve(root, 'app/domains')
        const domainObjects = await DomainDataCollector.getDomainDirectories(source)
        return new this(domainObjects)
    }

    static async getValidRegisterData(data: DomainDirectory[]): Promise<DomainObject[]> {
        const validData: DomainObject[] = []

        for (const domain of data) {
            const registrationPath = path.join(domain.dir, 'module.ts')

            if (fs.existsSync(registrationPath)) {
                const module: DomainObject = (await import(registrationPath)).default

                if (module.name === domain.name && !validData.some(item => item.name === module.name)) {
                    validData.push(module)
                }
            }
        }

        return validData
    }

    static async getDomainDirectories(source: string): Promise<DomainObject[]> {
        const data = fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                dir: path.join(source, dirent.name),
                name: dirent.name
            }))

        return await DomainDataCollector.getValidRegisterData(data)
    }

    private _ensureExists(name: string): void {
        const exists = this.domains.some(domain => domain.name === name);
        if (!exists) {
            throw new Error(`Domain '${name}' has wrong registration data, or doesn't exist in the domains list.`);
        }
    }

    public getNames(): string[] {
        return this.domains.map(domain => domain.name)
    }

    public getExportByDomain(name: string): DomainObject {
        this._ensureExists(name)
        return this.domains.find(domain => domain.name === name) as DomainObject
    }

    public getExportTypeByDomain(name: string, type: keyof DomainHandlers): DomainHandler {
        const domain = this.getExportByDomain(name)
        return domain.export[type] as DomainHandler
    }
}
