const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json());


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 5, // limit each IP to 100 requests per windowMs
  message: 'Too many requests please try again later',
});

app.get('/api/public', (req, res) => {
   
    res.json({ message: 'this is a public route' });
});

app.get("/api/limited", limiter, (req, res) => {
  res.json({ message: "you have access to this limited" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); 