import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./reducers/auth/LoginReducer";
import { signUpReducer } from "./reducers/auth/SignUpReducer";
import { companyReducer } from "./reducers/CompanyReducer";
import { restaurentReducer } from "./reducers/RestaurentReducer";
import { userReducer } from "./reducers/UserReducer";
import { activateAccountReducer } from "./reducers/auth/ActivateAccountReducer";

const rootReducer = combineReducers({
  loginReducer,
  companyReducer,
  signUpReducer,
  activateAccountReducer,
  userReducer,
  restaurentReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
