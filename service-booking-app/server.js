require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/user-router");
const bookingRouter = require("./router/bookingRoutes");
const config = require("./config/config");
config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/auth", userRouter);
app.use("/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




