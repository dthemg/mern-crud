const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');

router.post('/createNew', todoController.createNew);
router.get('/getAll', todoController.getAll);
router.post('/getTodo/:id', todoController.updateById);

module.exports = router;