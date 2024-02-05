import { default as Plugin } from './plugins'

const registration = {
    name: 'UserIntegration',
    type: 'relation',
    export: {
        plugin: Plugin
    }
}

export default registration