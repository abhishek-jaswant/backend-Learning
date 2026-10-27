const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/student-coures-mangment-app');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;