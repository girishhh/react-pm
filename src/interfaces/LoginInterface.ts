import { Session } from "./CommonInterface";
import { DefaultResponse } from "./StoreInterface";

export interface LoginStoreState {
  login: DefaultResponse;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginPayloadTypes = LoginPayload | Session;

export type LoginAction = {
  type: "login/data" | "login/loading" | "login/error";
  payload?: LoginPayloadTypes;
};
