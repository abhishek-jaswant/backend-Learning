const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('enrollment', EnrollmentSchema);