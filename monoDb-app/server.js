const express = require('express');
const app = express();
const connectDB = require('./config');
const router = require('./Router');

app.use(express.json());
app.use('/tasks', router);

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});