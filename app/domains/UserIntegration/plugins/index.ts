/**
 * Todo: make sure that the provided context fits the needs of this relation module
 */

const createUserIntegration = async (args: any, callback: Function, context: any) => {
    // Logic before Integration.service.createIntegration is called
    // E.g., create a UserIntegration record. Remember to create UserIntegration services that can handle it.
    // These services should be provided in the context object?? Needs a refactor
    // Get result data by using 'const result = await callback(...args)'
    console.log(args, callback, context)
}

const checkForTesting = async (args: any, result: any) => {
    const promiseResult = await result
    console.log(args, promiseResult)

    /** Don't break the flow */
    return result
}

const proxyConfig = {
    /** Todo: simplify logic by doing: */
    'Integration.transactionService': {
        createIntegration: createUserIntegration
    },
    /** instead of: (Currently working) */
    'User.transactionService.createUser': {
        after: checkForTesting
    }
}

export default proxyConfig