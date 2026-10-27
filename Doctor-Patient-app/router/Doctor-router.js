const express = require("express")

const doctor_router = express.Router()

const { createDoctor } = require("../controller/doctor-logic")

doctor_router.post("/", createDoctor)

module.exports = doctor_router