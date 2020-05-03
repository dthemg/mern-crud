import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

/*
This is where we are, continue with this Redux stuff and
maybe we'll be able to tie this whole thing together!
*/

const initialState = {};
const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  componseEnhancer(applyMiddleware(thunk))
);

export default store;