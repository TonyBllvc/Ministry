// Handles a catch-all for routes that does not exist
const notFound = (req, res, next ) => {
    const error = new Error(`Not Found - ${req.originalURL}`)
    res.status(404)
    next(error)
}

// Handles a ctach-all for errors that occurr in the route
const errorHandler = (err, req, res, next ) => {
    // ## To handle error that resumeble status.ok ##
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resourse not found'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {
    notFound,
    errorHandler
}