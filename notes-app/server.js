const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const connectDB = require("./config/config")



const userRouter = require("./router/user-router")
const notesRouter = require("./router/notes-router")
require("dotenv").config()
app.use(express.json())

connectDB()

app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})