const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    res.send('this is home page');
});
app.get("/contact", (req, res) => {
    res.send("this is contact page");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});