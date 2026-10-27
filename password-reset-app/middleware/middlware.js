
const jwt = require('jsonwebtoken');
const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({
        message: "Access token required"
    });
}
        const token = authHeader.split(" ")[1];


        const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({msg:"Error occured while verifying token",err:err.message});
    }
};

module.exports = middleware;