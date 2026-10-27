const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/users/get', (req, res) => {
    res.json({
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com"
    });
});
   
app.get("/users/list", (req, res) => {
    res.json([
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Doe", "email": "jane@example.com" },
  { "id": 3, "name": "Bob Smith", "email": "bob@example.com" }
]
);
})
 
app.get("/{*splat}", (req, res) => {
  res.status(404).json({ msg: 'undefined route' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});