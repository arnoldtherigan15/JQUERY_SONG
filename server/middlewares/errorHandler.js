module.exports = (err, req, res, next) => {
    const status = 500 || err.status
    const errors = []
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
            errors.push('email is being used')
            break
        case "SequelizeValidationError":
            err.errors.forEach(errData => {
                errors.push(errData.message)
            });
            break
        case "JsonWebTokenError":
            errors.push('invalid token')
            break
        default:
            errors.push(err.msg || 'internal server error')
        break;
    }
    res.status(status).json({
        errors
    })
    
}