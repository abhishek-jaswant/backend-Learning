const express = require("express")

const enrollment_router = express.Router()

const { createEnrollment,getListofPatientsofDoctor,getListofDoctorsofPatient,totalConsultation,resentConsultation } = require("../controller/enrollment-logic")

enrollment_router.post("/", createEnrollment) 
enrollment_router.get("/:doctorId/patients", getListofPatientsofDoctor)
enrollment_router.get("/:patientId/doctors", getListofDoctorsofPatient)
enrollment_router.get("/:doctorId/consultations/count", totalConsultation)
enrollment_router.get("/consultations/recent", resentConsultation)
module.exports = enrollment_router