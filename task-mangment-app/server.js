const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const taskRoutes = require('./routes/task.routes');
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use('/tasks', taskRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 