var jwt = require('jsonwebtoken')

//jwt.sign('payload', 'privateKey');
function generateToken(detail) {
    return jwt.sign(detail, process.env.SECRET)
}

//jwt.verify(token, secretOrPublicKey, [options, callback])
function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }