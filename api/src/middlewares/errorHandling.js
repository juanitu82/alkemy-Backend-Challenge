const errors = (error, req, res, next) => {
    res.status(error.status || 500).json({
            error: {
                message: error.message,
                status: error.status,
                error: error
            }
    })
}

module.exports = errors