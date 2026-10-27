const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization
        console.log("authHeader is--->",authHeader)
        
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
        return res.status(401).json({
            message: "Token is missing"
        })
    }

    const token = authHeader.split(" ")[1]


        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded is--->",decoded)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid token or token has expired"
        })
    }
}
module.exports = authMiddleware