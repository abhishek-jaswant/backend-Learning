const express = require('express');

const enrollment_router = express.Router();
const { createEnrollment,getEnrollment,getActiveCoursesOfStudent,getActiveStudentsOfCourse } = require('../controller/Janction-controler');
enrollment_router.post('/', createEnrollment);
enrollment_router.get('/', getEnrollment);
enrollment_router.get('/:studentId/activeCourses', getActiveCoursesOfStudent);
enrollment_router.get('/:courseId/activeStudents', getActiveStudentsOfCourse);


module.exports = enrollment_router;