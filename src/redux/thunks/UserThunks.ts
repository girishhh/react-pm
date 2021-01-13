import { Dispatch } from "react";
import { UserInterface, UserAction } from "../../interfaces/UserInterface";
import UserService from "../../services/api/UserService";

export function createUser(formData: UserInterface) {
  return async function signUpThunk(dispatch: Dispatch<UserAction>) {
    try {
      dispatch({ type: "createUser/loading" });
      const data = await UserService.createUser(formData);
      if (data.status === 201)
        dispatch({
          type: "createUser/data",
          payload: {
            message:
              "User created successfully.An email will be sent to user to setup password.",
          },
        });
    } catch (error) {
      dispatch({ type: "createUser/error", payload: error });
    }
  };
}

export function reSendConfirmation(email: string) {
  return async function signUpThunk(dispatch: Dispatch<UserAction>) {
    try {
      dispatch({ type: "reSendConfirmation/loading" });
      const data = await UserService.reSendConfirmation(email);
      if (data.status === 202)
        dispatch({
          type: "reSendConfirmation/data",
          payload: {
            message:
              "Account Confirmation Instructions are re-sent. Please check your mail.",
          },
        });
    } catch (error) {
      dispatch({ type: "reSendConfirmation/error", payload: error });
    }
  };
}
