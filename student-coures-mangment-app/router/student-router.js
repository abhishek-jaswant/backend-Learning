const express = require('express');
const student_router = express.Router();  
const { createStudent,getStudent,deleteStudent } = require('../controller/student-controller');
student_router.get('/:id',getStudent);
student_router.post('/', createStudent);
student_router.delete('/:id', deleteStudent);

module.exports = student_router;