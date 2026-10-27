 const express = require('express');
 const app = express();
const port = process.env.PORT || 3000;
 
app.get('/home', (req, res) => { 
    res.json({msg:'Welcome to home page'});
});
app.get('/about', (req, res) => {
    res.json({msg:'Welcome to about page'});
});
app.get('/contact', (req, res) => {
    res.json({msg:'Welcome to contact page'});
});
 
 app.get("/{*splat}", (req, res) => {
     res.status(404).json({ msg: 'undefined route' });
 });
 
 app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
 });