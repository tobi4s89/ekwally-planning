/**
 * Todo: make sure that the provided context fits the needs of this relation module
 */

const createUserIntegration = async (args: { first_name: string }[] = [], callback: Function, context: any) => {
    // Logic before Integration.service.createIntegration is called
    // E.g., create a UserIntegration record. Remember to create UserIntegration services that can handle it.
    // These services should be provided in the context object?? Needs a refactor
    // Get result data by using 'const result = await callback(...args)'
    console.log('------UserIntegration', args, callback, context)
    const [data, ...others] = args
    data.first_name = 'TEST'
    return await callback(data, ...others)
}

const proxyConfig = {
    'Integration.transactionService': {
        createIntegration: createUserIntegration
    },
    'User.transactionService': {
        createUser: createUserIntegration
    }
}

export default proxyConfig