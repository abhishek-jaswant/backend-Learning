
require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const connectDB = require("./config/config")
const router = require("./router/user-router")



console.log("Client ID loaded:", !!process.env.GITHUB_CLIENT_ID);
console.log("Client Secret loaded:", !!process.env.GITHUB_CLIENT_SECRET);
app.use(express.json())


connectDB()

app.use("/",router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})