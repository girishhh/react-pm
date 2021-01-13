import { Dispatch } from "react";
import {
  ActivateAccountAction,
  ActivateAccountPayload,
  ActivateAccountPayloadTypes,
} from "../../interfaces/ActivateAccountInterface";
import { LoginAction, LoginPayload } from "../../interfaces/LoginInterface";
import {
  SignUpAction,
  SignUpPayloadTypes,
} from "../../interfaces/SignUpInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import AuthService from "../../services/api/AuthService";
import { ActivateAccountSuccessMsgs } from "../../utils/constants/AuthConstants";

export function fetchSession(formData: LoginPayload) {
  return async function loginThunk(dispatch: Dispatch<LoginAction>) {
    try {
      dispatch({ type: "login/loading" });
      const session = await AuthService.login(
        formData.email,
        formData.password,
        formData.role
      );
      dispatch({ type: "login/data", payload: session });
    } catch (error) {
      dispatch({ type: "login/error", payload: error });
    }
  };
}

export function signUp(formData: UserInterface) {
  return async function signUpThunk(dispatch: Dispatch<SignUpAction>) {
    try {
      dispatch({ type: "signUp/loading" });
      const data = await AuthService.signUp(formData);
      if (data.status === 201)
        dispatch({
          type: "signUp/data",
          payload: {
            message:
              "Signed up successfully.Please follow the email instructions to actiavte account.",
          },
        });
    } catch (error) {
      dispatch({ type: "signUp/error", payload: error });
    }
  };
}

export function activateAccount(payload: ActivateAccountPayload, type: string) {
  return async function activateAccountThunk(
    dispatch: Dispatch<ActivateAccountAction>
  ) {
    try {
      dispatch({ type: "activateAccount/loading" });
      const data = await AuthService.activateAccount(payload);
      if (data.status === 200)
        dispatch({
          type: "activateAccount/data",
          payload: {
            message:
              ActivateAccountSuccessMsgs[
                type as keyof typeof ActivateAccountSuccessMsgs
              ],
          },
        });
    } catch (error) {
      dispatch({ type: "activateAccount/error", payload: error });
    }
  };
}
