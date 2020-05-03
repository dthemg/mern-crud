import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import URIs from "../config/uris";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(URIs.register, userData)
    .then(res => history.push("/login")) // Redirects user to login page
    .catch(err => dispatch ({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post(URIs.login, userData)
    .then(res => {
      // Save login to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set authentication token to header
      setAuthToken(token);
      // Decode token to retrieve data
      const decoded = jwt_decode(token);
      // Set user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove authentication header for requests
  setAuthToken(false);
  // Set user to empty object
  dispatch(setCurrentUser({}));
};
