import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import { TodoList } from "./components/todo-list.component";
import { EditTodo } from "./components/edit-todo.component";
import { CreateTodo } from "./components/create-todo.component";
import { SignIn } from "./components/login-user.component";
import { SignUp } from "./components/sign-up-user.component";


/*
Continue with part 2 here:
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
*/


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              MERN-stack App
            </Link>
            <div className="navbar">
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
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link">
                    Sign up
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
        <Route path="/login" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
      </Router>
    </Provider>
  );
}

export default App;
