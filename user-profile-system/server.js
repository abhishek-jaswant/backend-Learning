const express = require('express');
const conectDB = require('./config/config');
const user_router = require('./router/user-router');
const profile_router = require('./router/profile-router');
conectDB();

const app = express();
app.use(express.json());
app.use("/user", user_router);
app.use("/profile", profile_router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});