import * as Plugin from './plugins'

/** Todo: By default the domain data collector utility should convert the name to the related domains.
 * Use (empty required) export.domains = ['User', 'Integration'] when using other non-related domain names.
 * This keeps the module compatible when adding a relation at a later stage, without changing the name.
 * Throw build error when both options does not include an existing domain.
 */
const registration = {
    name: 'UserIntegration',
    type: 'relation',
    domains: [],
    export: {
        plugin: Plugin
    }
}

export default registration