import { ActivateAccountStoreState } from "../../../interfaces/ActivateAccountInterface";
import { ActionType } from "../../../interfaces/CommonInterface";
import { API_STATE } from "../../../utils/constants/common";

const initialState = {
  activateAccount: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const activateAccountReducer = (
  state = initialState,
  action: ActionType
): ActivateAccountStoreState => {
  const { type, payload } = action;
  const { activateAccount } = state;
  switch (type) {
    case "activateAccount/loading":
      activateAccount.state = API_STATE.LOADING;
      return { ...state, activateAccount };
    case "activateAccount/error":
      activateAccount.state = API_STATE.ERROR;
      activateAccount.error = payload;
      return { ...state, activateAccount };
    case "activateAccount/data":
      activateAccount.data = payload;
      activateAccount.state = API_STATE.DONE;
      return { ...state, activateAccount };
    default:
      return state;
  }
};

export { activateAccountReducer };
