import { createStore, combineReducers } from "redux";
import { loginReducer } from "./reducers/LoginReducer";

export default createStore(combineReducers({ loginReducer }), {});
