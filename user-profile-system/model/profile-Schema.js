const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
       
    },
   socialMediaLinks: {
    type: [String],
    default: undefined
},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

module.exports = mongoose.model('profile', profileSchema);