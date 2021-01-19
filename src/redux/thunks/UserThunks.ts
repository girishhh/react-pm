import { Dispatch } from "react";
import {
  UserInterface,
  UserAction,
  UserListReqPayLoad,
} from "../../interfaces/UserInterface";
import UserService from "../../services/api/UserService";

export function fetchUserList(payload: UserListReqPayLoad) {
  return async function fetchUserListThunk(dispatch: Dispatch<UserAction>) {
    try {
      dispatch({ type: "users/list/loading" });
      const data = await UserService.fetchUserList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "users/list/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "users/list/error", payload: error });
    }
  };
}

export function createUser(formData: UserInterface) {
  return async function signUpThunk(dispatch: Dispatch<UserAction>) {
    try {
      dispatch({ type: "users/create/loading" });
      const data = await UserService.createUser(formData);
      if (data.status === 201)
        dispatch({
          type: "users/create/data",
          payload: {
            message:
              "User created successfully.An email will be sent to user to setup password.",
          },
        });
    } catch (error) {
      dispatch({ type: "users/create/error", payload: error });
    }
  };
}

export function reSendConfirmation(email: string) {
  return async function signUpThunk(dispatch: Dispatch<UserAction>) {
    try {
      dispatch({ type: "users/reSendConfirmation/loading" });
      const data = await UserService.reSendConfirmation(email);
      if (data.status === 202)
        dispatch({
          type: "users/reSendConfirmation/data",
          payload: {
            message:
              "Account Confirmation Instructions are re-sent. Please check your mail.",
          },
        });
    } catch (error) {
      dispatch({ type: "users/reSendConfirmation/error", payload: error });
    }
  };
}
