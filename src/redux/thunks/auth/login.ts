import { Dispatch } from "react";
import { LoginAction, LoginPayload } from "../../../interfaces/LoginInterface";
import AuthService from "../../../services/api/AuthService";

export function login(formData: LoginPayload) {
  return async function loginThunk(dispatch: Dispatch<LoginAction>) {
    try {
      dispatch({ type: "login/loading" });
      const session = await AuthService.login(
        formData.email,
        formData.password
      );
      dispatch({ type: "login/data", payload: session });
    } catch (error) {
      dispatch({ type: "login/error", payload: error });
    }
  };
}
