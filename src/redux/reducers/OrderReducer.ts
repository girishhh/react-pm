import { ActionType } from "../../interfaces/CommonInterface";
import { OrderStoreState } from "../../interfaces/OrderInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  orderCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const orderReducer = (
  state = initialState,
  action: ActionType
): OrderStoreState => {
  const { type, payload } = action;
  const { orderCreate } = state;
  switch (type) {
    case "orders/create/loading":
      orderCreate.state = API_STATE.LOADING;
      return { ...state, orderCreate };
    case "orders/create/error":
      orderCreate.state = API_STATE.ERROR;
      orderCreate.error = payload;
      return { ...state, orderCreate };
    case "orders/create/data":
      orderCreate.state = API_STATE.DONE;
      return { ...state, orderCreate };

    default:
      return state;
  }
};

export { orderReducer };
