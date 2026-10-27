const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    name: String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
   
    
})

const model=mongoose.model("login",loginSchema)

module.exports=model