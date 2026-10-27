const express = require("express")
const app = express()
require('dotenv').config()
const router = require("./router/loginRouter")
const port = process.env.PORT || 3000

const connectDB = require("./config/config")
connectDB()

app.use(express.json())
app.use("/app",router)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})