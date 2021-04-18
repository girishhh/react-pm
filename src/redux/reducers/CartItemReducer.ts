import { ActionType } from "../../interfaces/CommonInterface";
import { CartItemStoreState } from "../../interfaces/CartItemInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  cartItemCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  cartItemUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  cartRefresh: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  cartItemDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const cartItemReducer = (
  state = initialState,
  action: ActionType
): CartItemStoreState => {
  const { type, payload } = action;
  const { cartItemUpdate, cartItemCreate, cartRefresh, cartItemDelete } = state;
  switch (type) {
    case "cart-items/create/loading":
      cartItemCreate.state = API_STATE.LOADING;
      return { ...state, cartItemCreate };
    case "cart-items/create/error":
      cartItemCreate.state = API_STATE.ERROR;
      cartItemCreate.error = payload;
      return { ...state, cartItemCreate };
    case "cart-items/create/data":
      cartItemCreate.state = API_STATE.DONE;
      return { ...state, cartItemCreate };

    case "cart-items/update/loading":
      cartItemUpdate.state = API_STATE.LOADING;
      return { ...state, cartItemUpdate };
    case "cart-items/update/error":
      cartItemUpdate.state = API_STATE.ERROR;
      cartItemUpdate.error = payload;
      return { ...state, cartItemUpdate };
    case "cart-items/update/data":
      cartItemUpdate.state = API_STATE.DONE;
      return { ...state, cartItemUpdate };

    case "cart-items/delete/loading":
      cartItemDelete.state = API_STATE.LOADING;
      return { ...state, cartItemDelete };
    case "cart-items/delete/error":
      cartItemDelete.state = API_STATE.ERROR;
      cartItemDelete.error = payload;
      return { ...state, cartItemDelete };
    case "cart-items/delete/data":
      cartItemDelete.state = API_STATE.DONE;
      return { ...state, cartItemDelete };

    case "cart-items/refreshCart/loading":
      cartRefresh.state = API_STATE.LOADING;
      return { ...state, cartRefresh };
    case "cart-items/refreshCart/error":
      cartRefresh.state = API_STATE.ERROR;
      cartRefresh.error = payload;
      return { ...state, cartRefresh };
    case "cart-items/refreshCart/data":
      cartRefresh.state = API_STATE.DONE;
      return { ...state, cartRefresh };
    default:
      return state;
  }
};

export { cartItemReducer };
