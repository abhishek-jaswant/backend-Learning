
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    const token = authHeader.split(" ")[1];
    console.log("token is--->",token)

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            req.userId = decoded.id;
            console.log("userId is--->",req.userId)
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }    
  
};


module.exports = authMiddleware;

