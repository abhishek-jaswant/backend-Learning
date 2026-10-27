

const Task = require('../models/task.model');

const getAllTasks = async (req, res) => {
   try{
    const tasks = await Task.find();
    res.json({
        message: 'All tasks',
        tasks,
    });
    }
    catch(err){
        res.json({
            message: 'Error occured',
            error: err.message,
        });
    }
};


const getTaskByPriority = async (req, res) => {
  try {
    const priority = req.query.priority;

    const task = priority
      ? await Task.find({ priority })
      : await Task.find();

    res.status(200).json({
      message: "Tasks fetched successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
};

const addTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({
            message: "Task added successfully",
            task,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurred",
            error: err.message,
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, isComplete } = req.body;

        const task = await Task.findByIdAndUpdate(id, {
            title,
            description,
            priority,
            isComplete,
            completionDate: Date.now(),
        });
      
        res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurred",
            error: err.message,
        });

    }
}

const delettask= async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
};

module.exports = {
    getAllTasks,
    getTaskByPriority,
    addTask,
    updateTask,
    delettask,
};