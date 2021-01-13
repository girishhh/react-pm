import { ActionType } from "../../interfaces/CommonInterface";
import { UserStoreState } from "../../interfaces/UserInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  createUser: {
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
};

const userReducer = (
  state = initialState,
  action: ActionType
): UserStoreState => {
  const { type, payload } = action;
  const { createUser, reSendConfirmation } = state;
  switch (type) {
    case "createUser/loading":
      createUser.state = API_STATE.LOADING;
      return { ...state, createUser };
    case "createUser/error":
      createUser.state = API_STATE.ERROR;
      createUser.error = payload;
      return { ...state, createUser };
    case "createUser/data":
      createUser.data = payload;
      createUser.state = API_STATE.DONE;
      return { ...state, createUser };

    case "reSendConfirmation/loading":
      reSendConfirmation.data = {};
      reSendConfirmation.state = API_STATE.LOADING;
      return { ...state, reSendConfirmation };
    case "reSendConfirmation/error":
      reSendConfirmation.state = API_STATE.ERROR;
      reSendConfirmation.error = payload;
      return { ...state, reSendConfirmation };
    case "reSendConfirmation/data":
      reSendConfirmation.data = payload;
      reSendConfirmation.state = API_STATE.DONE;
      return { ...state, reSendConfirmation };
    default:
      return state;
  }
};

export { userReducer };
