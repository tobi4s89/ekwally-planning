const getCurrentUserId = () => {
    // Todo: get current user id
}

/**
 * Todo: Use generated event handlers to interact with related domain handlers
 * where 'originalMethod' is just an alias for the service createIntegration() method
 */
export const Integration = {
    'service.createIntegration': async (args: any[], originalMethod: Function) => {
        // created integration data, acts as an 'after' hook event
        const integrationData = await originalMethod(args)
        const userId = getCurrentUserId()

        // Todo: save UserIntegration
        // persistUserIntegration({ integration: integrationData.id, user: userId })

        // Don't break the flow
        return integrationData
    }
}