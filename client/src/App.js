import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { TodoList } from "./components/todo-list.component";
import { EditTodo } from "./components/edit-todo.component";
import { CreateTodo } from "./components/create-todo.component";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            MERN-stack App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
      </div>
      <Route path="/" exact component={TodoList} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={CreateTodo} />
    </Router>
  );
}

export default App;
