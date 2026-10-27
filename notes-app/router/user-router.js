const express = require("express")
const Userrouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require("../model/user-model")
const authMiddleware = require("../middleware/auth-middleware")

const saltRounds = 10;

Userrouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    message: "Error generating hash",
                    error: err.message
                });
            }
            try {
                console.log("hashpassword is --->",hash)
                const user = await userModel.create({
                    name,
                    email,
                    password: hash
                });
                return res.status(201).json({
                    message: "User created successfully"
                });
            } catch (error) {
                console.log("error is--->", error.message);

                return res.status(500).json({
                    message: "Error creating user",
                    error: error.message
                })
            }
        })
     } catch (error) {
        console.log("error is--->",error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }

})
 
Userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        bcrypt.compare(password, user.password, async function (err, result) {
           
         
            try {
                if (result) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

                    return res.status(200).json({
                        message: "Login successful",
                        token: token
                    });
                } else {
                    return res.status(400).json({
                        message: err.message
                    });
                }
            } catch (error) {
                console.log("error is--->", error.message)

                return res.status(500).json({
                    message: "Error generating token",
                    error: error.message
                })
            }
        } )

    } catch (error) {
        console.log("error is--->",error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
    
})
    

Userrouter.get("/profile",authMiddleware, async (req, res) => {
    try {
        console.log("req.userId is--->",req.userId)
        const user = await userModel.findById(req.userId).select("password");
        console.log("user is--->",user)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        console.log("error is--->",error.message)
    }
})


module.exports = Userrouter
