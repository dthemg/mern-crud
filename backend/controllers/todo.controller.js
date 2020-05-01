const Todo = require('../models/todo.model'); 

// Check that everything works, then continue from here

exports.createNew = (req, res) => {
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'Todo added successfully'})
    })
    .catch(err => {
      res.status(500).send('Server error when addind')
    });
  console.log("Create new called");
}

exports.updateById = (req, res) => {
  console.log("Update by ID called");
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).send(`Todo with id ${req.params.id} not found`);
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo.save()
      .then(todo => {
        res.json("Todo was updated")
      })
      .catch(err => {
        res.status(500).send("Server error when updating")
      });
    }
  });
}

exports.getAll = (req, res) => {
  Todo.find(function(err, todos) {
    if (err) {
      console.error(err);
    } else {
      res.json(todos);
    }
  });
}

exports.getOne = (req, res) => {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    res.json(todo);
  })
  console.log("Get one called");
}