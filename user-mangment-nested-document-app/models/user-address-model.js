const mongoose = require("mongoose")


const userAddressSchema = new mongoose.Schema({
    street: {
        require: true,
        type:String
    },
    city: {
        require: true,
        type:String
    },
    state: {
        require: true,
        type:String
    },  
    pincode: {
        require: true,
        type:Number
    },  
    country: {
        require: true,
        type: String,
        default: "India"
    }
  
})

const userSchema = new mongoose.Schema({
    name: {
        require: true,
        type:String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    age: {
        require: true,
        type: Number
    },
    address: [userAddressSchema],

    
  
})

 const users = mongoose.model("user", userSchema)
const usersaddress = mongoose.model("userAddress", userAddressSchema)

module.exports = {
    users,
    usersaddress
}