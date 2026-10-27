const express = require('express');
const conectDB = require('./config/config');
const user_router = require('./router/user-router');
const book_router = require('./router/book-router');
conectDB();

const app = express();
app.use(express.json());
app.use("/user", user_router);
app.use("/book", book_router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});