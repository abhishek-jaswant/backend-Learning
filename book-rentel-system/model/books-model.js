const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    
    },
    rentedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]
});

module.exports = mongoose.model('book', bookSchema);