const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB