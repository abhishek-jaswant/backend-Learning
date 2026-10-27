const express = require("express")

const patient_router = express.Router()

const { addpatient,activePatient } = require("../controller/patient-logic")

patient_router.post("/", addpatient) 
patient_router.get("/", activePatient)

module.exports = patient_router