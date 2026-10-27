import express from 'express';
const app = express();
const port = process.env.PORT || 3000;          
 
import { gettodos,
    addTodo,
    updateTodo,
    deleteTodo} from './controller/controller.js';
import datamidleware from './midleware/controller-midleware.js';

app.use(express.json());

app.get("/todos", gettodos);
app.post("/todos", addTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);


app.use((req, res) => {
  res.status(404).json({
    message: "Unknown route",
    data: null
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

