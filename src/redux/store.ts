import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./reducers/auth/LoginReducer";
import { companyReducer } from "./reducers/CompanyReducer";

const rootReducer = combineReducers({ loginReducer, companyReducer });

export default createStore(rootReducer, applyMiddleware(thunk));
