const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');

router.get('/getAll', todoController.getAll);
router.get('/getOne/:id', todoController.getOne);

router.post('/createNew', todoController.createNew);
router.post('/update/:id', todoController.updateById);
router.post('/delete/:id', todoController.deleteById);

module.exports = router;