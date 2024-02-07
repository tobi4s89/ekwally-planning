import { default as Plugin } from './plugins'

const registration = {
    name: 'UserTeam',
    type: 'relation',
    export: {
        plugin: Plugin
    }
}

export default registration