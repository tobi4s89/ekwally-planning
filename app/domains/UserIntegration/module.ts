import * as Plugin from './plugins'

/** Todo: By default the domain data collector utility should convert the name to the related domains.
 * Use export.domains = ['User', 'Integration'] when using a different non-related domain name.
 * This keeps the module compatible when adding a relation at a later stage, without changing the name.
 * Throw build error when both options does not include an existing domain.
 */
const registration = {
    name: 'UserIntegration',
    type: 'relation',
    export: {
        domains: [],
        plugin: Plugin
    }
}

export default registration