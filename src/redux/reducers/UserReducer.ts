import { ActionType } from "../../interfaces/CommonInterface";
import { UserStoreState } from "../../interfaces/UserInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  userCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  userList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  userUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  reSendConfirmation: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  userCartDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const userReducer = (
  state = initialState,
  action: ActionType
): UserStoreState => {
  const { type, payload } = action;
  const {
    userCreate,
    userList,
    userUpdate,
    reSendConfirmation,
    userCartDetails,
  } = state;
  switch (type) {
    case "users/create/loading":
      userCreate.state = API_STATE.LOADING;
      return { ...state, userCreate };
    case "users/create/error":
      userCreate.state = API_STATE.ERROR;
      userCreate.error = payload;
      return { ...state, userCreate };
    case "users/create/data":
      userCreate.data = payload;
      userCreate.state = API_STATE.DONE;
      return { ...state, userCreate };

    case "users/reSendConfirmation/loading":
      reSendConfirmation.data = {};
      reSendConfirmation.state = API_STATE.LOADING;
      return { ...state, reSendConfirmation };
    case "users/reSendConfirmation/error":
      reSendConfirmation.state = API_STATE.ERROR;
      reSendConfirmation.error = payload;
      return { ...state, reSendConfirmation };
    case "users/reSendConfirmation/data":
      reSendConfirmation.data = payload;
      reSendConfirmation.state = API_STATE.DONE;
      return { ...state, reSendConfirmation };

    case "users/list/loading":
      userList.state = API_STATE.LOADING;
      return { ...state, userList };
    case "users/list/error":
      userList.state = API_STATE.ERROR;
      userList.error = payload;
      return { ...state, userList };
    case "users/list/data":
      userList.data = payload;
      userList.state = API_STATE.DONE;
      return { ...state, userList };
    case "users/list/reset":
      userList.data = {};
      return { ...state, userList };

    case "users/update/loading":
      userUpdate.state = API_STATE.LOADING;
      return { ...state, userUpdate };
    case "users/update/error":
      userUpdate.state = API_STATE.ERROR;
      userUpdate.error = payload;
      return { ...state, userUpdate };
    case "users/update/data":
      userUpdate.state = API_STATE.DONE;
      return { ...state, userUpdate };

    case "users/cartDetails/loading":
      userCartDetails.state = API_STATE.LOADING;
      return { ...state, userCartDetails };
    case "users/cartDetails/error":
      userCartDetails.state = API_STATE.ERROR;
      userCartDetails.error = payload;
      return { ...state, userCartDetails };
    case "users/cartDetails/data":
      userCartDetails.data = payload;
      userCartDetails.state = API_STATE.DONE;
      return { ...state, userCartDetails };
    default:
      return state;
  }
};

export { userReducer };
