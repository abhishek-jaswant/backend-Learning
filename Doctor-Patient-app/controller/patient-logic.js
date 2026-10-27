const Doctor = require('../model/Doctor-model');
const Patient = require('../model/Patient-model');
const enrollment = require('../model/enrollment-model');



const addpatient = async (req, res) => {
    try {

        const patient = new Patient(req.body);
        await patient.save();   

        res.status(201).json({
            message: 'Patient created successfully',
            patient
        });
        
    }
    catch (error)
    {
        res.status(500).json({ error:error.message});
    }
}


const activePatient = async (req, res) => {
    try {
        const gender = req.query.gender





        const patient = await Patient.find({ gender:gender, isActive: true });

        return res.status(200).json({
            message: 'List of patients fetched successfully',
            data: patient
        });

    }
        catch (error) {
            return res.status(500).json({
                message: 'Error getting list of patients',
                error: error.message
            });
    }
    
}
      
        
      
module.exports = { addpatient, activePatient };