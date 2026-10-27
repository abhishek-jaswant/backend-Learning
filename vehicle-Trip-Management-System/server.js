const express = require("express");
const connectDB = require("./config/config");
const router = require("./router/vehicle-router");

const app = express();

app.use(express.json());
app.use("/vehicles", router);

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});