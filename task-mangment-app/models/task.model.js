const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        unique: true,
    },
    description: {
        type: String,    
    },
   priority: {
        type: String, 
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
   isComplete: {
        type: Boolean,
        default: false,
    },
   completionDate: {
        type: Date,
        default: Date.now,
    },
   dueDate: {
        type: Date,
        default: Date.now,
    },
    
}); 
module.exports = mongoose.model('taskDB', taskSchema);