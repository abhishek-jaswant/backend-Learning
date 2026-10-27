const express = require('express');
const course_router = express.Router();
const { createCourse, deleteCourse,getCourse } = require('../controller/course-controller');

course_router.post('/', createCourse);
course_router.delete('/:id', deleteCourse);
course_router.get('/', getCourse);


module.exports = course_router;
