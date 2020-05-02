import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";


/*
This is where we are, continue with this Redux stuff and
maybe we'll be able to tie this whole thing together!
*/

const initialState = {};
const middleware = [thunk];

const store = createStore(
  () => [],
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSEION__()
  )
);

export default store;