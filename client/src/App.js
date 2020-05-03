import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

// Components
import { TodoList } from "./components/todo-list.component";
import { EditTodo } from "./components/edit-todo.component";
import { CreateTodo } from "./components/create-todo.component";
import SignIn from "./components/login-user.component";
import SignUp  from "./components/sign-up-user.component";
import PrivateRoute from "./authRoutes/auth.routes";
import Dashboard from "./components/dashboard.component";

/*
Continue with part 2 here:
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
*/


// Check for jwt token
if (localStorage.jwtToken) {
  // Use stored token
  console.log("JWT token found!")
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  
  // Logout if token has expired
  const currentTime = Date.now()/1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

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
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/> 
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
