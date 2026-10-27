
const studentModel = require('../model/student-model');

const inrollment= require('../model/junction-Of-StudentAndCourse-model');
const createStudent = async (req, res) => {
    try {
        const student = new studentModel(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const students = await studentModel.find({isActive:true});
        res.status(200).json({
            message: 'Student fetched successfully',
            students,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentModel.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });
                 await inrollment.updateMany({studentId:id},{isActive:false});
        res.status(200).json({
            message: 'Student deleted successfully',
            student,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occured',
            error: error.message,
        });
    }
};

module.exports = {
    createStudent,
    getStudent,
    deleteStudent,
};