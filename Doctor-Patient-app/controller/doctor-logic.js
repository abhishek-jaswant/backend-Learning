

const Doctor = require('../model/Doctor-model');
const Patient = require('../model/Patient-model');
const enrollment = require('../model/enrollment-model');

const createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports={createDoctor}