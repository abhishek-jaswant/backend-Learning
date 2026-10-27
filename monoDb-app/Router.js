const express = require('express');
const router = express.Router();
const Task = require('./model');


router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({ message: 'Task added successfully' });
});

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json({
        message: 'All tasks',
        tasks,
    });
   
})

router.patch("/:id", async (req, res) => {
    const {status,title} = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, {status,title});
    res.json({
        message: 'Task updated successfully',
    });
});

router.delete("/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json({
        message: 'Task deleted successfully',
    });
});

module.exports = router;
