const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbAdress = "mongodb://127.0.0.1:27017/mern-todo";
const passport = require("passport");

const usersRoutes = require("./routes/users.routes");
const todoRoutes = require("./routes/todo.routes");
const PORT = 9000;

const app = express();

// Register middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Connection to database
mongoose.connect(dbAdress, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

// Set up routes
app.use("/todos", todoRoutes);
app.use("/users", usersRoutes);

connection.once("open", function () {
  console.log("MongoDB connection established");
});

// Listen to port
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
