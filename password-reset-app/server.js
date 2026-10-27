require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectDB = require('./config/config');
const User = require('./model/user-model');
const authmiddleware = require('./middleware/middlware');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
   
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});


connectDB();

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exsistinguser= await User.findOne({email});
        if(exsistinguser){
            return res.status(400).json({msg:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
      const   user = await User.create({name,email,password:hashedPassword});
        const token = jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:"15m"});
        return res.status(200).json({msg:"User created successfully",token});
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({msg:"Error occured while creating user",err:err.message});
        
    }
 })
app.post("/login", authmiddleware, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({msg:"Invalid password"});
        }

        // const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: 10 });
        
        return res.status(200).json({msg:"User logged in successfully",});
       

        
    } catch (err) {
       
        return res.status(500).json({msg:"Error occured while logging in",err:err.message});
    }
 })
app.post("/forgot-password", async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const resetToken = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "5m" });
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `Reset Password Link: ${resetLink}`,
          });
          return res.status(200).json({msg:"Password reset link sent successfully"});


    } catch (err) {

        return res.status(500).json({msg:"Error occured while sending password reset link",err:err.message});
        
     }
 })
app.post("/reset-password/:token", async (req, res) => { 
         const { token } = req.params;
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log(decoded);
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log(decoded);
        const user = await User.findOne({_id:decoded.userId});
        if(!user){
            return res.status(400).json({msg:"Invalid token"});
        }
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({msg:"Password reset successfully"});
        
    } catch (err) {
        
        return res.status(500).json({msg:"Error occured while resetting password",err:err.message});
    }
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port localhost:${process.env.PORT || 3000}`);
});