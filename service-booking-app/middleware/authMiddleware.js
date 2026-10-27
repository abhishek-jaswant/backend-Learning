// const jwt = require('jsonwebtoken');

// const authMiddleware = (role) => {

//     return (req, res, next) => {

//         let decoded;
//         try {
//             const authHeader = req.headers.authorization;

//            if (!authHeader || !authHeader.startsWith('bearer ')) {
//                return res.status(401).json({
//                   message: 'Token not found. Please login again.'
//                      });
//                }
            
//             const token = authHeader.split(' ')[1];

//             if (token) {
//              decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//             } else {
//                 res.status(400).json({ message: "token not found please login again" });
//             }

//         } catch (error) {

//             if(error.message=="jwt expired"){
//                 //we need to genrate newAccess and newRefresh token
//                 //check the validity of the refferesh token and issue new access and  token
//                 let refreshToken =req.headers.refreshToken.split(' ')[1];
//                 let refreshTokenDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//                 if (refreshTokenDecoded) {
//                  let newAccessToken = jwt.sign({ userId: refreshTokenDecoded.userId, role: refreshTokenDecoded.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
//                  decoded = jwt.verify(newAccessToken, process.env.JWT_ACCESS_SECRET);
//                 } else {
//                 res.status(401).json({ message: "refresh token expired please login again" });
//                 }
//             } else {
//                 res.status(401).json({ message: "somthing went wrong" });
//             }
//         }

//         if (decoded) {
                    
//                     if (role.includes(decoded.role)) {
//                         req.user = decoded.userId;
//                         next();
//                     } else {
//                         res.status(401).json({ message: "Login Failed please login again" });
//                      }
//                 } else {
//                     res.status(400).json({ message: "login failed please login again" });
                    
//                 }

//     }
// }

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { 
    try { 
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        if (!authHeader || !authHeader.startsWith("bearer ")) {
      return res.status(401).json({
        message: "Access token required"
      });
        }
        
        const token = authHeader.split(" ")[1];
        console.log( "Token is ----> ", token);
        
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        console.log("decoded is ----> ", decoded);
        req.user = decoded
        console.log("user is ----> ", req.user);
        next();

    } catch (error) { 
     return res.status(401).json({
      message: "Invalid or expired access token"
    });
    }
}

const autorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({
            message: "Admin access denied"
        });
    }
    next();
}

module.exports = { authMiddleware, autorizeAdmin }; 

  