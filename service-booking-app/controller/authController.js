const User=require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {


    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });

    res.status(201).json({
      message: "User created successfully",
       
         user
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" , error: error.message});
  }
};

const login = async (req, res) => { 
   

    try {

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user ||!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "User not found or Incorrect password and email" });
        }


        const payload = { userId: user._id, role: user.role };

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m"
        });
        const refreshToken = jwt.sign( { userId: user._id.toString(), tokenType: "refresh" }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d"
        });
        
        user.refreshToken = refreshToken;
        await user.save();

       res.status(200).json({
        message: "Login successful",
          token: `${accessToken}`,
          refreshToken: `${refreshToken}`
      });
       

    } catch (error) {
        res.status(500).json({ message: "Error logging in" , error: error.message});
    }


}

module.exports = { signup, login };