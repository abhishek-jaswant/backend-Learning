
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../model/userModel");

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  process.env.GITHUB_CALLBACK_URL
  },
    async (accessToken, refreshToken, profile, done) => {
     
        try {
            const gitubId = String(profile.id)
            const username = profile.username
            const email = profile.emails?.[0]?.value || null;
            console.log("email is--->", email)
            console.log("profile is--->", profile)

            let user = await User.findOne({ githubId: gitubId });

            console.log("existingUser is--->", user)
            
            if (!user) {
                //create user
                 user = await User.create({
                    name: username,
                    email,
                    githubId: gitubId
                });
              
            } else {
                user.name = username
                user.email = email
                user.githubId = gitubId 
                await user.save()     

            }

            return done(null, user)
                //create user)
            

        }catch(error){
            console.log("error is--->", error.message)
           
            return done(error)
        }
            

  }
));


module.exports = passport