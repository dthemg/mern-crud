const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 9000;
const dbAdress = 'mongodb://127.0.0.1:27017/mern-todo';
const todoRoutes = require('./routes/todo.routes');

const app = express();

// Register middleware
app.use(cors());
app.use(bodyParser.json());

// Connection to database
mongoose.connect(dbAdress, {
  useNewUrlParser: true
});
const connection = mongoose.connection;

// Set up routes
app.use("/", todoRoutes);


connection.once('open', function() {
  console.log("MongoDB connection established")
});

// Listen to port
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});