const express = require('express');
const mongoose = require('mongoose');

const doctor_router = require('./router/Doctor-router');
const patient_router = require('./router/patient-router');
const enrollment_router = require('./router/enrollment-router');

const connectDB=require("./config/config")
connectDB()

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/doctor', doctor_router);
app.use('/patient', patient_router);
app.use('/enrollment', enrollment_router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
