import { $PicnicIntegration, $TrelloIntegration } from '../../../../core/db/edgeql-js/modules'
import Types from '../../../../core/db/edgeql-js/modules/integration'

export { $PicnicIntegration, $TrelloIntegration }

export declare interface IntegrationTypeMapper {
    [key: string]: $PicnicIntegration | $TrelloIntegration
}

export declare interface IntegrationModelObjectType {
    types: {
        BaseIntegration: typeof Types.BaseIntegration
        PicnicIntegration: typeof Types.PicnicIntegration
        TrelloIntegration: typeof Types.TrelloIntegration
    }
}