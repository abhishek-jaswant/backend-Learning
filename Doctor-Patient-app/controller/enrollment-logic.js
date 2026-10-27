

const Enrollment = require('../model/enrollment-model');
const Doctor = require('../model/Doctor-model');
const Patient = require('../model/Patient-model');
const mongoose = require('mongoose');

const createEnrollment = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body;

        // Validate ObjectIds
        if (
            !mongoose.isValidObjectId(doctorId) ||
            !mongoose.isValidObjectId(patientId)
        ) {
            return res.status(400).json({
                message: 'Please provide valid doctorId and patientId'
            });
        }

        // Check whether doctor and patient exist
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(404).json({
                message: 'Doctor or Patient not found'
            });
        }

        // Check whether both are active
        if (!doctor.isActive || !patient.isActive) {
            return res.status(400).json({
                message: 'Doctor and Patient must be active'
            });
        }

        // Create enrollment
        const newEnrollment = new Enrollment({
            doctorId,
            patientId
        });

        await newEnrollment.save();

        return res.status(201).json({
            message: 'Enrollment created successfully',
            data: newEnrollment
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating enrollment',
            error: error.message
        });
    }
};


const  getListofPatientsofDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(doctorId)) {
            return res.status(400).json({
                message: 'Please provide valid doctorId'
            });
        }

        // Check whether doctor exist
        const doctor = await Doctor.findById(doctorId);

        if (!doctor && doctor.isActive) {
            return res.status(404).json({
                message: 'Doctor not found or inactive'
            });
        }

        // Get list of patients
const patients = await Enrollment.find({doctorId,isActive: true}).populate('patientId', 'name').select('patientId consultedAt').sort({ consultedAt: -1 });

        return res.status(200).json({
            message: 'List of patients fetched successfully',
            data: patients
        });
    }
        catch (error) {
            return res.status(500).json({
                message: 'Error getting list of patients',
                error: error.message
            });
    }
    
}


const getListofDoctorsofPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(patientId)) {
            return res.status(400).json({
                message: 'Please provide valid patientId'
            });
        }

        // Check whether patient exist
        const patient = await Patient.findById(patientId);

        if (!patient && patient.isActive) {
            return res.status(404).json({
                message: 'Patient not found or inactive'
            });
        }

        // Get list of doctors
        const doctors = await Enrollment.find({patientId,isActive: true}).populate('doctorId', 'name').select('consultedAt name').sort({ consultedAt: -1 });

        return res.status(200).json({
            message: 'List of doctors fetched successfully',
            data: doctors
        });
    }
        catch (error) {
            return res.status(500).json({
                message: 'Error getting list of doctors',
                error: error.message
            });
    }
    
}


const totalConsultation = async (req, res) => {
    try { 
        const { doctorId } = req.params;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(doctorId)) {
            return res.status(400).json({
                message: 'Please provide valid doctorId'
            });
        }
            const doctor = await Doctor.findById(doctorId);

            if (!doctor) {
                return res.status(404).json({
                    message: 'Doctor not found or inactive'
                }); 
            }

            // Get total consultation
            const totalConsultation = await Enrollment.countDocuments({ doctorId });
            return res.status(200).json({
                message: 'Total consultation fetched successfully',
                data: totalConsultation
            });
        
    }catch (error) {
        return res.status(500).json({
            message: 'Error getting total consultation',
            error: error.message
        });
    }
}


const resentConsultation = async (req, res) => {
    try {
        const data = await Enrollment.find({ isActive: true }).populate('doctorId', 'name').populate('patientId', 'name').select('consultedAt doctorId patientId notes').sort({ consultedAt: -1 }).limit(5);
        
        if (data.length === 0) {
            return res.status(404).json({
                message: 'No consultation found'
            }); 
        }

        return res.status(200).json({
            message: 'Consultation fetched successfully',
            data: data
        }); 
        

    }catch (error) {
        return res.status(500).json({
            message: 'Error getting total consultation',
            error: error.message
        });
    }
}


module.exports = { createEnrollment, getListofPatientsofDoctor, getListofDoctorsofPatient, totalConsultation, resentConsultation };

