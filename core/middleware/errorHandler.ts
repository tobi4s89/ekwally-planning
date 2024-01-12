import { ErrorRequestHandler } from 'express'

const errorHandlingMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Error:', err)

    const statusCode = err.statusCode || 500
    const isProduction = process.env.NODE_ENV === 'production'

    const errorInfo = {
        status: 'error',
        message: isProduction && statusCode === 500 ? 'Internal Server Error' : err.message,
        ...(isProduction ? {} : { stack: err.stack })
    }

    res.status(statusCode).json(errorInfo)
};

export default errorHandlingMiddleware