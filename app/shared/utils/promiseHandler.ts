export const promiseHandler = {
    execute: async <T, R>(data: T, method: (data: T) => Promise<R>): Promise<R> => {
        try {
            return await method(data);
        } catch (err: unknown) {
            // Assuming err is of type Error for better error message handling
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            throw new Error(`An error occurred while executing the method: ${errorMessage}`);
        }
    }
}

export default promiseHandler