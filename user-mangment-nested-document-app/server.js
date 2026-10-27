
const express = require("express");
const conectDB = require("./config/config");
const router = require("./router/router");


const app = express();

app.use(express.json());
app.use("/users", router);

conectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});