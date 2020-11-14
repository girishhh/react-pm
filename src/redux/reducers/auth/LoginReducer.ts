import { ActionType } from "../../../interfaces/CommonInterface";
import AuthService from "../../../services/api/AuthService";

const initialState = {};
const loginReducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "login":
      AuthService.login(payload.email, payload.password);
      return state;
    default:
      return state;
  }
};

export { loginReducer };
