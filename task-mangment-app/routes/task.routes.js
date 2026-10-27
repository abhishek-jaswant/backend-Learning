
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const taskMiddleware = require('../middleware/task.middleware');

router.get('/', taskController.getAllTasks);
router.get('/priority', taskController.getTaskByPriority);
router.post('/', taskMiddleware, taskController.addTask);
router.patch('/:id', taskMiddleware, taskController.updateTask);
router.delete('/:id', taskController.delettask);

module.exports = router;
