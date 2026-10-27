const courseModel = require('../model/course-model');
const inrollment= require('../model/junction-Of-StudentAndCourse-model');

const createCourse = async (req, res) => {
    try {
        const course = new courseModel(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getCourse = async (req, res) => {
    try {

        const courses = await courseModel.find({isActive:true});
        res.status(200).json({
            message: 'Course fetched successfully',
            courses,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });

         await inrollment.updateMany({courseId:id},{isActive:false});
        

        res.status(200).json({
            message: 'Course deleted successfully',
            course,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};
module.exports = {
    createCourse,
    deleteCourse,
    getCourse,
};