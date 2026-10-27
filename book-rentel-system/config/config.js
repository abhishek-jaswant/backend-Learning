
const mongoose = require('mongoose');

const conectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/book-rentel-system");
        console.log('Connected to MongoDB');
     
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = conectDB;