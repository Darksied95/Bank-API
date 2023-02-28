const CustomError = require('./customError')

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    return res.status(500).json({ error: err.message })
}

module.exports = errorHandler