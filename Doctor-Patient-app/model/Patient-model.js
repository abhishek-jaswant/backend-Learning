const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Patient', PatientSchema);    

