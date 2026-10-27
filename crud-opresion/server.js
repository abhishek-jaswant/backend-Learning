const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'db.json');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/dishes", (req, res) => {
  const dish = req.body;
  console.log(dish);
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  data.dishes.push(dish);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  res.json({
    message: "Dish added successfully",
    data: data.dishes,
   });
});

app.get("/dishes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  res.json({
    message: "Dishes retrieved successfully",
    data: data.dishes,
  });
});


app.get("/dishes/get", (req, res) => {
    console.log("SEARCH ROUTE HIT!");
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));

  const name = req.query.name||"";

  
  const dishes = data.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(name.toLowerCase())
  );

  console.log("mething dishes", dishes);
  
  if (dishes.length > 0) {
    res.json({
      message: "Dishes retrieved successfully",
      data: dishes
    });
  } else {
    res.status(404).json({
      message: "Dish not found",
      data: []
    });
  }
});

app.get("/dishes/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  const dish = data.dishes.find((dish) => dish.id === parseInt(req.params.id));
  if (dish) {
    res.json({
      message: "Dish retrieved successfully",
      data: dish,
    });
  } else {
    res.status(404).json({
      message: "Dish not found",
      data: null,
    });
  }
});

app.put("/dishes/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  const dish = data.dishes.find((dish) => dish.id === parseInt(req.params.id));
  if (dish) {
    dish.name = req.body.name;
    dish.price = req.body.price;
    dish.category = req.body.category;
    res.json({
      message: "Dish updated successfully",
      data: dish,
    });
  } else {
    res.status(404).json({
      message: "Dish not found",
      data: null,
    });
  }
});

app.delete("/dishes/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  const dish = data.dishes.find((dish) => dish.id === parseInt(req.params.id));
  if (dish) {
    data.dishes = data.dishes.filter((dish) => dish.id !== parseInt(req.params.id));
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    res.json({
      message: "Dish deleted successfully",
      data: dish,
    });
  } else {
    res.status(404).json({
      message: "Dish not found",
      data: null,
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});