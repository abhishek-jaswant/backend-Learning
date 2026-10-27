

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath=path.join(__dirname,"../db.json");





const gettodos = (req, res) => {
    
    const title=req.query.title||"";
    const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
    
    const todos = data.todos.filter((todo) =>
        todo.title.toLowerCase().includes(title.toLowerCase())
    );

    if (todos.length > 0) {
        res.json({
            message: "todos retrieved successfully",
            data: todos
        });
    } else {
      res.json({
        message:"todos retrieved successfully",
        data:data.todos
    })
    }
}

const addTodo=(req,res)=>{
    const data=JSON.parse(fs.readFileSync(filepath,"utf-8"));
    data.todos.push(req.body);
    fs.writeFileSync(filepath,JSON.stringify(data,null,2));
    res.json({
        message:"todo added successfully",
        data:data.todos
    })
}

const updateTodo=(req,res)=>{
  const data=JSON.parse(fs.readFileSync(filepath,"utf-8"));
  const todo=data.todos.find((todo)=>todo.id===parseInt(req.params.id));
  if(todo){
      todo.title=req.body.title;
      todo.completed = req.body.completed;
      
      fs.writeFileSync(filepath,JSON.stringify(data,null,2));
      res.json({
          message:"todo updated successfully",
          data:todo
      })
  }else{
      res.status(404).json({
          message:"todo not found",
          data:null
      })
  }
}

const deleteTodo = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));

  const id = parseInt(req.params.id);

  const todo = data.todos.find((todo) => todo.id === id);

  if (todo) {
    data.todos = data.todos.filter((todo) => todo.id !== id);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    return res.json({
      message: "Todo deleted successfully",
      data: todo
    });
  } else {
    return res.status(404).json({
      message: "Todo not found",
      data: null
    });
  }
};

export {
    gettodos,
    addTodo,
    updateTodo,
    deleteTodo
}