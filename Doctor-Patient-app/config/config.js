const mongoose = require('mongoose');

const conectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/studentcourseapp');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
};

module.exports = conectDB;