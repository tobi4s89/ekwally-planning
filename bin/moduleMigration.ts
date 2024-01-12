import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const modulesDir = path.join(currentDir, '../app/domains')
const schemaOutputDir = path.join(currentDir, '../core/db')
const aggregatedSchemaFile = path.join(schemaOutputDir, 'aggregated_schema.esdl')

// Function to recursively find all schema.esdl files
function findSchemaFiles(dir: string): string[] {
    let schemaFiles: string[] = []
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
            // Recursively search in subdirectories
            schemaFiles = schemaFiles.concat(findSchemaFiles(fullPath))
        } else if (item.isFile() && item.name === 'schema.esdl') {
            schemaFiles.push(fullPath)
        }
    }

    return schemaFiles
}

const schemaFiles = findSchemaFiles(modulesDir)

// Combine all schema files into one
let combinedSchema = ''
schemaFiles.forEach(schemaFilePath => {
    combinedSchema += fs.readFileSync(schemaFilePath, 'utf8') + '\n'
})

try {
    fs.writeFileSync(aggregatedSchemaFile, combinedSchema)

    console.log('Creating migration...')
    execSync(`edgedb migration create`, { stdio: 'inherit' })
    console.log('Applying migration...')
    execSync('edgedb migrate', { stdio: 'inherit' })
    console.log('Migration applied successfully.')
} catch (error) {
    console.error('An error occurred:', error)
}
