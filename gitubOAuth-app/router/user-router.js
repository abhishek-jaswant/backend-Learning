const express = require("express")
const router = express.Router()
const passport = require("../Strategy/GitHub-Strategy")

const jwt = require("jsonwebtoken")



//start github auth
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));


//gitub redirect here
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failed', session: false }),
(req, res)=>{
      // Successful authentication, redirect home.
    const user = req.user
    
    console.log("user is--->", user)
    
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:120});
      res.status(200).json({
          message: "Login successful",
          token: token,
          user: {
        id: user._id,
        githubId: user.githubId,
        username: user.name,
        email: user.email
      }

      });

   
    });
  

router.get("/failed", (req, res) => {
  res.status(401).json({
    message: "GitHub login failed"
  });
});


module.exports = router