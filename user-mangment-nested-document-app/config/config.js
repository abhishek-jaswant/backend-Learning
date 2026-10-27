
const mongoose = require("mongoose")

const conectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/user-mangment-nested-document-app")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

module.exports = conectDB