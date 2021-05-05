import { CartStoreState } from "../../interfaces/CartInterface";
import { ActionType } from "../../interfaces/CommonInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  cartUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  cartDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const cartReducer = (
  state = initialState,
  action: ActionType
): CartStoreState => {
  const { type, payload } = action;
  const { cartUpdate, cartDetails } = state;
  switch (type) {
    case "carts/update/loading":
      cartUpdate.state = API_STATE.LOADING;
      return { ...state, cartUpdate };
    case "carts/update/error":
      cartUpdate.state = API_STATE.ERROR;
      cartUpdate.error = payload;
      return { ...state, cartUpdate };
    case "carts/update/data":
      cartUpdate.state = API_STATE.DONE;
      return { ...state, cartUpdate };

    case "carts/details/loading":
      cartDetails.state = API_STATE.LOADING;
      return { ...state, cartDetails };
    case "carts/details/error":
      cartDetails.state = API_STATE.ERROR;
      cartDetails.error = payload;
      return { ...state, cartDetails };
    case "carts/details/data":
      cartDetails.data = payload;
      cartDetails.state = API_STATE.DONE;
      return { ...state, cartDetails };
    default:
      return state;
  }
};

export { cartReducer };
