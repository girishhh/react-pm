import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./reducers/auth/LoginReducer";

const rootReducer = combineReducers({ loginReducer });

export default createStore(rootReducer, applyMiddleware(thunk));
