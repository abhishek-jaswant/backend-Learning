const express = require('express');
const student_router = require('./router/student-router');
const course_router = require('./router/course-router');
const enrollment_router = require('./router/janctionOfsutentAndCourse-router');
const connectDB = require('./config/config');
connectDB();

const app = express();
app.use(express.json());
app.use("/student", student_router);
app.use("/course", course_router);
app.use("/enrollment", enrollment_router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
