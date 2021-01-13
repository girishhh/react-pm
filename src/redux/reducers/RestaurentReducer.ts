import { ActionType } from "../../interfaces/CommonInterface";
import { RestaurentStoreState } from "../../interfaces/RestaurentInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  restaurentList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  restaurentDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  restaurentUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  restaurentCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  restaurentDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const restaurentReducer = (
  state = initialState,
  action: ActionType
): RestaurentStoreState => {
  const { type, payload } = action;
  const {
    restaurentList,
    restaurentDetails,
    restaurentUpdate,
    restaurentCreate,
    restaurentDelete,
  } = state;
  switch (type) {
    case "restaurents/list/loading":
      restaurentList.state = API_STATE.LOADING;
      return { ...state, restaurentList };
    case "restaurents/list/error":
      restaurentList.state = API_STATE.ERROR;
      restaurentList.error = payload;
      return { ...state, restaurentList };
    case "restaurents/list/data":
      restaurentList.data = payload;
      restaurentList.state = API_STATE.DONE;
      return { ...state, restaurentList };

    case "restaurents/details/loading":
      restaurentDetails.state = API_STATE.LOADING;
      return { ...state, restaurentDetails };
    case "restaurents/details/error":
      restaurentDetails.state = API_STATE.ERROR;
      restaurentDetails.error = payload;
      return { ...state, restaurentDetails };
    case "restaurents/details/data":
      restaurentDetails.data = payload;
      restaurentDetails.state = API_STATE.DONE;
      return { ...state, restaurentDetails };

    case "restaurents/update/loading":
      restaurentUpdate.state = API_STATE.LOADING;
      return { ...state, restaurentUpdate };
    case "restaurents/update/error":
      restaurentUpdate.state = API_STATE.ERROR;
      restaurentUpdate.error = payload;
      return { ...state, restaurentUpdate };
    case "restaurents/update/data":
      restaurentUpdate.state = API_STATE.DONE;
      return { ...state, restaurentUpdate };

    case "restaurents/create/loading":
      restaurentCreate.state = API_STATE.LOADING;
      return { ...state, restaurentCreate };
    case "restaurents/create/error":
      restaurentCreate.state = API_STATE.ERROR;
      restaurentCreate.error = payload;
      return { ...state, restaurentCreate };
    case "restaurents/create/data":
      restaurentCreate.state = API_STATE.DONE;
      return { ...state, restaurentCreate };

    case "restaurents/delete/loading":
      restaurentDelete.state = API_STATE.LOADING;
      return { ...state, restaurentDelete };
    case "restaurents/delete/error":
      restaurentDelete.state = API_STATE.ERROR;
      restaurentDelete.error = payload;
      return { ...state, restaurentDelete };
    case "restaurents/delete/data":
      restaurentDelete.state = API_STATE.DONE;
      return { ...state, restaurentDelete };
    default:
      return state;
  }
};

export { restaurentReducer };
