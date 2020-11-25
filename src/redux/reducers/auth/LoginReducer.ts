import { ActionType } from "../../../interfaces/CommonInterface";
import { API_STATE } from "../../../utils/constants/common";

const initialState = {
  login: {
    data: {},
    state: API_STATE.DONE,
    error: null,
  },
};

const loginReducer = (state = initialState, action: ActionType): any => {
  const { type, payload } = action;
  const { login } = state;
  switch (type) {
    case "login/loading":
      login.state = API_STATE.LOADING;
      return { ...state, login };
    case "login/error":
      login.state = API_STATE.ERROR;
      login.error = payload;
      return { ...state, login };
    case "login/data":
      login.data = payload;
      login.state = API_STATE.DONE;
      return { ...state, login };
    default:
      return state;
  }
};

export { loginReducer };
