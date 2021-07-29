import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { addressReducer } from "./reducers/AddressReducer";
import { activateAccountReducer } from "./reducers/auth/ActivateAccountReducer";
import { loginReducer } from "./reducers/auth/LoginReducer";
import { signUpReducer } from "./reducers/auth/SignUpReducer";
import { cartItemReducer } from "./reducers/CartItemReducer";
import { companyReducer } from "./reducers/CompanyReducer";
import { foodCategoryReducer } from "./reducers/FoodCategoryReducer";
import { foodItemReducer } from "./reducers/FoodItemReducer";
import { menuItemReducer } from "./reducers/MenuItemReducer";
import { menuReducer } from "./reducers/MenuReducer";
import { orderReducer } from "./reducers/OrderReducer";
import { restaurentReducer } from "./reducers/RestaurentReducer";
import { userReducer } from "./reducers/UserReducer";


const rootReducer = combineReducers({
  loginReducer,
  companyReducer,
  signUpReducer,
  activateAccountReducer,
  userReducer,
  restaurentReducer,
  foodCategoryReducer,
  foodItemReducer,
  menuItemReducer,
  menuReducer,
  cartItemReducer,
  addressReducer,
  orderReducer,
});


const composeEnhancers = composeWithDevTools({trace: true});


export default createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));
