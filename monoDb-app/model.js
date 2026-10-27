

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    status: {
        type: String,
        
    },
    dueDate: {
        type: Date,
        
    },
});

module.exports = mongoose.model('taskDB', TaskSchema);