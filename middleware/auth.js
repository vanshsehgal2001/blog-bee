const jwt = require('jsonwebtoken')
const User = require('../modals/User')

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ msg: "Token not found" })
    }

    try {
        const decodedVal = jwt.verify(token, 'secret')
        req.user = decodedVal.user
        next()
    } catch (error) {
        console.log(error.message)
        if (error.message === "jwt malformed" || error.message === "invalid signature") {
            return res.status(400).json({ msg: "Token invalid" })
        }
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = authMiddleware