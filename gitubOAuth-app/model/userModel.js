const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
       
    },
    email: {
        type: String,
       
        unique: true
    },
    password: {
        type: String,
        
    },
    githubId: {
        type: String,
      
    }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;