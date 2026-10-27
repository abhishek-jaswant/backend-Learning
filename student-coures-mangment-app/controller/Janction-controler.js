
const Enrollment = require('../model/junction-Of-StudentAndCourse-model');
const studentModel = require('../model/student-model');
const courseModel = require('../model/course-model');
const mongoose = require('mongoose');

const createEnrollment = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (
            !mongoose.isValidObjectId(studentId) ||
            !mongoose.isValidObjectId(courseId)
        ) {
            return res.status(400).json({
                message: 'Invalid studentId or courseId'
            });
        }

        const activeStudent = await studentModel.findOne({
            _id: studentId,
            isActive: true
        });

        const activeCourse = await courseModel.findOne({
            _id: courseId,
            isActive: true
        });

        if (!activeStudent) {
            return res.status(400).json({
                message: 'Student not found or inactive'
            });
        }

        if (!activeCourse) {
            return res.status(400).json({
                message: 'Course not found or inactive'
            });
        }

        const enrollment = await Enrollment.create({
            studentId,
            courseId
        });

        return res.status(201).json({
            message: 'Enrollment created successfully',
            enrollment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getEnrollment = async (req, res) => {
    try {
    
const enrollment = await Enrollment.find({ isActive: true })
    .populate('studentId', 'name')
    .populate('courseId', 'title');
        res.status(200).json({
            message: 'Enrollment fetched successfully',
            enrollment,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};


//return all active courses of student

const getActiveCoursesOfStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
     
        const activeCourses = await Enrollment.find({ "studentId": studentId, isActive: true })
            .populate('courseId', 'title');
        res.status(200).json({
            message: 'Active Courses of Student fetched successfully',
            activeCourses,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};

//return all active students of course
const getActiveStudentsOfCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const activeStudents = await Enrollment.find({ courseId: courseId, isActive: true })
            .populate('studentId', 'name');
        res.status(200).json({
            message: 'Active Students of Course fetched successfully',
            activeStudents,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};
module.exports = { createEnrollment,getEnrollment,getActiveCoursesOfStudent,getActiveStudentsOfCourse };    
