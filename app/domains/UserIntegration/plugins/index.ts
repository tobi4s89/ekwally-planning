/**
 * Todo: make sure that the provided context fits the needs of this relation module
 */

const createUserIntegration = async (args, callback) => {
    // Logic after Integration.service.createIntegration is called
    // E.g., create a UserIntegration record. Remember to create UserIntegration services that can handle it.
    // These services should be provided in the context object??
}

const checkForTesting = async (args: any, result: any) => {
    const promiseResult = await result
    console.log(args, promiseResult)
}

const proxyConfig = {
    /** Todo: simplify logic by doing: */
    'Integration.transactionService': {
        createIntegration: createUserIntegration
    },
    /** Currently working - instead of: */
    'User.transactionService.createUser': {
        after: checkForTesting
    }
}

export default proxyConfig