import { ActionType } from "../../../interfaces/CommonInterface";
import { LoginStoreState } from "../../../interfaces/LoginInterface";
import { SignUpStoreState } from "../../../interfaces/SignUpInterface";
import { API_STATE } from "../../../utils/constants/common";

const initialState = {
  signUp: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const signUpReducer = (
  state = initialState,
  action: ActionType
): SignUpStoreState => {
  const { type, payload } = action;
  const { signUp } = state;
  switch (type) {
    case "signUp/loading":
      signUp.state = API_STATE.LOADING;
      return { ...state, signUp };
    case "signUp/error":
      signUp.state = API_STATE.ERROR;
      signUp.error = payload;
      return { ...state, signUp };
    case "signUp/data":
      signUp.data = payload;
      signUp.state = API_STATE.DONE;
      return { ...state, signUp };
    default:
      return state;
  }
};

export { signUpReducer };
