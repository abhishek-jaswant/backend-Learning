const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
  
})
const Notesmodel = mongoose.model("notes", notesSchema) 
module.exports = Notesmodel